import '../mocks/api';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiMock, resetApiMock } from '../mocks/api';
import { ContentSourceType } from '../../src/types';

describe('auth api', () => {
  beforeEach(() => {
    resetApiMock();
  });

  it('register appelle le bon endpoint', async () => {
    apiMock.post.mockResolvedValue({ data: { id: 1 } });
    const { register } = await import('../../src/api/user/auth');
    const payload = { email: 'a@test.com', password: 'secret' };

    await register(payload);

    expect(apiMock.post).toHaveBeenCalledWith('auth/register/', payload);
  });

  it('login initialise le CSRF après connexion', async () => {
    apiMock.post.mockResolvedValue({ data: { ok: true } });
    apiMock.get.mockResolvedValue({ data: { csrfToken: 'token-123' } });
    const { login } = await import('../../src/api/user/auth');

    await login({ email: 'a@test.com', password: 'secret' });

    expect(apiMock.post).toHaveBeenCalledWith('auth/login/', {
      email: 'a@test.com',
      password: 'secret',
    });
    expect(apiMock.get).toHaveBeenCalledWith('/csrf/');
    expect(apiMock.defaults.headers.common['X-CSRFToken']).toBe('token-123');
  });

  it('logout réinitialise le CSRF', async () => {
    apiMock.post.mockResolvedValue({ data: { ok: true } });
    apiMock.get.mockResolvedValue({ data: { csrfToken: 'new-token' } });
    const { logout } = await import('../../src/api/user/auth');

    await logout();

    expect(apiMock.post).toHaveBeenCalledWith('auth/logout/');
    expect(apiMock.defaults.headers.common['X-CSRFToken']).toBe('new-token');
  });

  it('getMe et updateMe appellent les bons endpoints', async () => {
    apiMock.get.mockResolvedValue({ data: { id: 1 } });
    apiMock.put.mockResolvedValue({ data: { id: 1, first_name: 'Alice' } });
    const { getMe, updateMe } = await import('../../src/api/user/auth');

    await getMe();
    await updateMe({ first_name: 'Alice' });

    expect(apiMock.get).toHaveBeenCalledWith('auth/me/');
    expect(apiMock.put).toHaveBeenCalledWith('auth/me/', { first_name: 'Alice' });
  });
});

describe('initCSRF', () => {
  beforeEach(resetApiMock);

  it('récupère et injecte le token CSRF', async () => {
    apiMock.get.mockResolvedValue({ data: { csrfToken: 'csrf-abc' } });
    const { initCSRF } = await import('../../src/api/initCSRF');

    await initCSRF();

    expect(apiMock.get).toHaveBeenCalledWith('/csrf/');
    expect(apiMock.defaults.headers.common['X-CSRFToken']).toBe('csrf-abc');
  });
});

describe('dashboard api', () => {
  beforeEach(resetApiMock);

  it('récupère les données du tableau de bord', async () => {
    const dashboard = { counts: { twins: 2 } };
    apiMock.get.mockResolvedValue({ data: dashboard });
    const { getDashboard } = await import('../../src/api/dashboard/dashboard');

    await expect(getDashboard()).resolves.toEqual(dashboard);
    expect(apiMock.get).toHaveBeenCalledWith('/dashboard/');
  });
});

describe('twins api', () => {
  beforeEach(resetApiMock);

  it('expose les opérations CRUD sur les jumeaux', async () => {
    apiMock.get.mockResolvedValueOnce({ data: [{ id: 1 }] });
    apiMock.get.mockResolvedValueOnce({ data: { id: 1 } });
    apiMock.post.mockResolvedValue({ data: { id: 2 } });
    apiMock.put.mockResolvedValue({ data: { id: 1, name: 'Updated' } });
    apiMock.delete.mockResolvedValue({ data: null });

    const twinApi = await import('../../src/api/twins/twin');

    await twinApi.getTwins();
    await twinApi.getTwin(1);
    await twinApi.createTwin({ name: 'Twin' });
    await twinApi.updateTwin(1, { name: 'Updated' });
    await twinApi.deleteTwin(1);

    expect(apiMock.get).toHaveBeenCalledWith('twins/learners/');
    expect(apiMock.get).toHaveBeenCalledWith('twins/learners/1/');
    expect(apiMock.post).toHaveBeenCalledWith('twins/learners/', { name: 'Twin' });
    expect(apiMock.put).toHaveBeenCalledWith('twins/learners/1/', { name: 'Updated' });
    expect(apiMock.delete).toHaveBeenCalledWith('twins/learners/1/');
  });
});

describe('context api', () => {
  beforeEach(resetApiMock);

  it('expose les opérations CRUD sur les contextes', async () => {
    apiMock.get.mockResolvedValueOnce({ data: [] });
    apiMock.get.mockResolvedValueOnce({ data: { id: 3 } });
    apiMock.post.mockResolvedValue({ data: { id: 4 } });
    apiMock.put.mockResolvedValue({ data: { id: 3, name: 'Ctx' } });
    apiMock.delete.mockResolvedValue({ data: null });

    const contextApi = await import('../../src/api/twins/context');

    await contextApi.getContexts();
    await contextApi.getContext(3);
    await contextApi.createContext({
      name: 'Ctx',
      description: 'Desc',
      school: 'Lycée',
      country: 'France',
      level: 'Lycée',
      subject: 'Maths',
      academic_year: '2025-2026',
      objectives: [],
    });
    await contextApi.updateContext(3, { name: 'Ctx' });
    await contextApi.deleteContext(3);

    expect(apiMock.get).toHaveBeenCalledWith('twins/contexts/');
    expect(apiMock.post).toHaveBeenCalled();
    expect(apiMock.put).toHaveBeenCalledWith('twins/contexts/3/', { name: 'Ctx' });
    expect(apiMock.delete).toHaveBeenCalledWith('twins/contexts/3/');
  });
});

describe('simulation api', () => {
  beforeEach(resetApiMock);

  it('lance une simulation et récupère l’historique', async () => {
    apiMock.post.mockResolvedValue({ data: { score: 80 } });
    apiMock.get.mockResolvedValue({ data: [{ id: 1 }] });
    const simulationApi = await import('../../src/api/simulation/simulation');

    await simulationApi.simulateQuiz({ quiz_id: 1, twin_id: 2 });
    await simulationApi.getSimulationHistory();

    expect(apiMock.post).toHaveBeenCalledWith('/simulation/quiz/', { quiz_id: 1, twin_id: 2 });
    expect(apiMock.get).toHaveBeenCalledWith('/simulation/history/');
  });
});

describe('quiz api', () => {
  beforeEach(resetApiMock);

  it('expose les opérations sur les quiz', async () => {
    const quiz = {
      title: 'Q1',
      description: null,
      difficulty: 'easy',
      source_type: ContentSourceType.MANUAL,
      course: null,
      questions: [],
    };
    apiMock.get.mockResolvedValueOnce({ data: [quiz] });
    apiMock.get.mockResolvedValueOnce({ data: quiz });
    apiMock.post.mockResolvedValue({ data: quiz });
    apiMock.put.mockResolvedValue({ data: quiz });
    apiMock.delete.mockResolvedValue({ data: null });
    apiMock.get.mockResolvedValueOnce({ data: new Blob(['csv']) });

    const quizApi = await import('../../src/api/content/quiz/quiz');
    const file = new File(['content'], 'quiz.csv', { type: 'text/csv' });
    apiMock.post.mockResolvedValueOnce({ data: quiz });

    await quizApi.getQuizzes();
    await quizApi.getQuiz(1);
    await quizApi.createQuiz(quiz as never);
    await quizApi.updateQuiz(1, quiz as never);
    await quizApi.deleteQuiz(1);
    await quizApi.exportQuiz(1);
    await quizApi.importQuiz(file);
    await quizApi.submitQuiz(1, { answers: [{ question_id: 1, answer_id: 2 }] });

    expect(apiMock.get).toHaveBeenCalledWith('content/quizzes/');
    expect(apiMock.post).toHaveBeenCalled();
    expect(apiMock.put).toHaveBeenCalledWith('content/quizzes/1/', quiz);
    expect(apiMock.delete).toHaveBeenCalledWith('content/quizzes/1/');
  });
});

describe('quizService', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('récupère la liste et le détail des quiz via fetch', async () => {
    const quizzes = [{ title: 'Quiz 1' }];
    const fetchMock = vi.mocked(fetch);
    fetchMock
      .mockResolvedValueOnce({ ok: true, json: async () => quizzes } as Response)
      .mockResolvedValueOnce({ ok: true, json: async () => quizzes[0] } as Response);

    const { quizService } = await import('../../src/api/quizService');

    await expect(quizService.getAll()).resolves.toEqual(quizzes);
    await expect(quizService.getById(1)).resolves.toEqual(quizzes[0]);
  });

  it('lève une erreur si la réponse fetch échoue', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({ ok: false } as Response);
    const { quizService } = await import('../../src/api/quizService');

    await expect(quizService.getAll()).rejects.toThrow('Erreur fetch quizzes');
  });
});
