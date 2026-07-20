import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { QueryWrapper } from '../utils/testProviders';

vi.mock('../../src/api/dashboard/dashboard', () => ({ getDashboard: vi.fn() }));
vi.mock('../../src/api/twins/twin', () => ({
  getTwins: vi.fn(),
  getTwin: vi.fn(),
  createTwin: vi.fn(),
  updateTwin: vi.fn(),
  deleteTwin: vi.fn(),
}));
vi.mock('../../src/api/twins/context', () => ({
  getContexts: vi.fn(),
  getContext: vi.fn(),
  createContext: vi.fn(),
  updateContext: vi.fn(),
  deleteContext: vi.fn(),
}));
vi.mock('../../src/api/content/quiz/quiz', () => ({
  getQuizzes: vi.fn(),
  getQuiz: vi.fn(),
  createQuiz: vi.fn(),
  updateQuiz: vi.fn(),
  deleteQuiz: vi.fn(),
  exportQuiz: vi.fn(),
  importQuiz: vi.fn(),
  submitQuiz: vi.fn(),
}));
vi.mock('../../src/api/simulation/simulation', () => ({
  simulateQuiz: vi.fn(),
  getSimulationHistory: vi.fn(),
}));
vi.mock('../../src/api/user/auth', () => ({
  login: vi.fn(),
  logout: vi.fn(),
  register: vi.fn(),
  getMe: vi.fn(),
  updateMe: vi.fn(),
}));
vi.mock('../../src/api/initCSRF', () => ({ initCSRF: vi.fn() }));

import { getDashboard } from '../../src/api/dashboard/dashboard';
import { getTwins, getTwin, createTwin, updateTwin, deleteTwin } from '../../src/api/twins/twin';
import {
  getContexts,
  createContext,
  updateContext,
  deleteContext,
} from '../../src/api/twins/context';
import {
  getQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  exportQuiz,
  importQuiz,
  submitQuiz,
} from '../../src/api/content/quiz/quiz';
import { simulateQuiz, getSimulationHistory } from '../../src/api/simulation/simulation';
import { login, logout, register, updateMe } from '../../src/api/user/auth';
import { initCSRF } from '../../src/api/initCSRF';
import { useDashboard } from '../../src/hooks/dashboard/useDashboard';
import { useTwins } from '../../src/hooks/twins/useTwins';
import { useTwin } from '../../src/hooks/twins/useTwin';
import { useCreateTwin } from '../../src/hooks/twins/useCreateTwin';
import { useUpdateTwin } from '../../src/hooks/twins/useUpdateTwin';
import { useDeleteTwin } from '../../src/hooks/twins/useDeleteTwin';
import { useContexts } from '../../src/hooks/twins/useContexts';
import { useCreateContext } from '../../src/hooks/twins/useCreateContext';
import { useUpdateContext } from '../../src/hooks/twins/useUpdateContext';
import { useDeleteContext } from '../../src/hooks/twins/useDeleteContext';
import { useQuizzes } from '../../src/hooks/content/quiz/useQuizzes';
import { useQuiz } from '../../src/hooks/content/quiz/useQuiz';
import { useCreateQuiz } from '../../src/hooks/content/quiz/useCreateQuiz';
import { useUpdateQuiz } from '../../src/hooks/content/quiz/useUpdateQuiz';
import { useDeleteQuiz } from '../../src/hooks/content/quiz/useDeleteQuiz';
import { useExportQuiz } from '../../src/hooks/content/quiz/useExportQuiz';
import { useImportQuiz } from '../../src/hooks/content/quiz/useImportQuiz';
import { useSubmitQuiz } from '../../src/hooks/content/quiz/useSubmitQuiz';
import { useSimulateQuiz } from '../../src/hooks/simulation/useSimulateQuiz';
import { useSimulationHistory } from '../../src/hooks/simulation/useSimulationHistory';
import { useLogin } from '../../src/hooks/user/useLogin';
import { useRegister } from '../../src/hooks/user/useRegister';
import { useUpdateMe } from '../../src/hooks/user/useUpdateMe';
import { useCSRF } from '../../src/hooks/csrf/useCSRF';

describe('hooks', () => {
  it('useDashboard charge les données', async () => {
    vi.mocked(getDashboard).mockResolvedValue({ counts: { twins: 1 } } as never);
    const { result } = renderHook(() => useDashboard(), { wrapper: QueryWrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.counts?.twins).toBe(1);
  });

  it('useTwins et useTwin', async () => {
    vi.mocked(getTwins).mockResolvedValue([{ id: 1 }] as never);
    vi.mocked(getTwin).mockResolvedValue({ id: 1 } as never);

    const twins = renderHook(() => useTwins(), { wrapper: QueryWrapper });
    const twin = renderHook(() => useTwin(1), { wrapper: QueryWrapper });

    await waitFor(() => expect(twins.result.current.isSuccess).toBe(true));
    await waitFor(() => expect(twin.result.current.isSuccess).toBe(true));
  });

  it('mutations twins', async () => {
    vi.mocked(createTwin).mockResolvedValue({ id: 2 } as never);
    vi.mocked(updateTwin).mockResolvedValue({ id: 1 } as never);
    vi.mocked(deleteTwin).mockResolvedValue(null as never);

    const create = renderHook(() => useCreateTwin(), { wrapper: QueryWrapper });
    const update = renderHook(() => useUpdateTwin(), { wrapper: QueryWrapper });
    const remove = renderHook(() => useDeleteTwin(), { wrapper: QueryWrapper });

    await create.result.current.mutateAsync({ name: 'Twin' } as never);
    await update.result.current.mutateAsync({ id: 1, data: { name: 'Updated' } } as never);
    await remove.result.current.mutateAsync(1);

    expect(createTwin).toHaveBeenCalled();
    expect(updateTwin).toHaveBeenCalled();
    expect(deleteTwin).toHaveBeenCalledWith(1);
  });

  it('useContexts et mutations context', async () => {
    vi.mocked(getContexts).mockResolvedValue([{ id: 1 }] as never);
    vi.mocked(createContext).mockResolvedValue({ id: 2 } as never);
    vi.mocked(updateContext).mockResolvedValue({ id: 1 } as never);
    vi.mocked(deleteContext).mockResolvedValue(null as never);

    const contexts = renderHook(() => useContexts(), { wrapper: QueryWrapper });
    const create = renderHook(() => useCreateContext(), { wrapper: QueryWrapper });
    const update = renderHook(() => useUpdateContext(), { wrapper: QueryWrapper });
    const remove = renderHook(() => useDeleteContext(), { wrapper: QueryWrapper });

    await waitFor(() => expect(contexts.result.current.isSuccess).toBe(true));
    await create.result.current.mutateAsync({ name: 'Ctx' } as never);
    await update.result.current.mutateAsync({ id: 1, data: { name: 'Ctx' } } as never);
    await remove.result.current.mutateAsync(1);
  });

  it('hooks quiz', async () => {
    vi.mocked(getQuizzes).mockResolvedValue([{ id: 1 }] as never);
    vi.mocked(getQuiz).mockResolvedValue({ id: 1 } as never);
    vi.mocked(createQuiz).mockResolvedValue({ id: 2 } as never);
    vi.mocked(updateQuiz).mockResolvedValue({ id: 1 } as never);
    vi.mocked(deleteQuiz).mockResolvedValue(null as never);
    vi.mocked(exportQuiz).mockResolvedValue(new Blob() as never);
    vi.mocked(importQuiz).mockResolvedValue({ id: 3 } as never);
    vi.mocked(submitQuiz).mockResolvedValue({ score: 10 } as never);

    const quizzes = renderHook(() => useQuizzes(), { wrapper: QueryWrapper });
    const quiz = renderHook(() => useQuiz(1), { wrapper: QueryWrapper });
    const create = renderHook(() => useCreateQuiz(), { wrapper: QueryWrapper });
    const update = renderHook(() => useUpdateQuiz(), { wrapper: QueryWrapper });
    const remove = renderHook(() => useDeleteQuiz(), { wrapper: QueryWrapper });
    const exportHook = renderHook(() => useExportQuiz(), { wrapper: QueryWrapper });
    const importHook = renderHook(() => useImportQuiz(), { wrapper: QueryWrapper });
    const submit = renderHook(() => useSubmitQuiz(), { wrapper: QueryWrapper });

    await waitFor(() => expect(quizzes.result.current.isSuccess).toBe(true));
    await waitFor(() => expect(quiz.result.current.isSuccess).toBe(true));
    await create.result.current.mutateAsync({ title: 'Q' } as never);
    await update.result.current.mutateAsync({ id: 1, data: { title: 'Q2' } } as never);
    await remove.result.current.mutateAsync(1);
    await exportHook.result.current.mutateAsync(1);
    await importHook.result.current.mutateAsync(new File(['a'], 'q.csv') as never);
    await submit.result.current.mutateAsync({ quizId: 1, answers: [] } as never);
  });

  it('hooks simulation', async () => {
    vi.mocked(simulateQuiz).mockResolvedValue({ score: 90 } as never);
    vi.mocked(getSimulationHistory).mockResolvedValue([{ id: 1 }] as never);

    const history = renderHook(() => useSimulationHistory(), { wrapper: QueryWrapper });
    const simulate = renderHook(() => useSimulateQuiz(), { wrapper: QueryWrapper });

    await waitFor(() => expect(history.result.current.isSuccess).toBe(true));
    await simulate.result.current.mutateAsync({ quiz_id: 1, twin_id: 2 } as never);
  });

  it('hooks auth', async () => {
    vi.mocked(login).mockResolvedValue({ data: {} } as never);
    vi.mocked(register).mockResolvedValue({ data: {} } as never);
    vi.mocked(updateMe).mockResolvedValue({ data: {} } as never);

    const loginHook = renderHook(() => useLogin(), { wrapper: QueryWrapper });
    const registerHook = renderHook(() => useRegister(), { wrapper: QueryWrapper });
    const updateHook = renderHook(() => useUpdateMe(), { wrapper: QueryWrapper });

    await loginHook.result.current.mutateAsync({ email: 'a@b.com', password: 'x' });
    await registerHook.result.current.mutateAsync({ email: 'a@b.com', password: 'x' });
    await updateHook.result.current.mutateAsync({ first_name: 'Alice' });
  });

  it('useCSRF initialise le token au montage', async () => {
    vi.mocked(initCSRF).mockResolvedValue(undefined);
    renderHook(() => useCSRF(), { wrapper: QueryWrapper });
    await waitFor(() => expect(initCSRF).toHaveBeenCalled());
  });
});
