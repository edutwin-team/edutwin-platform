import { LOGIN_PROGRESS_STEPS, REGISTER_PROGRESS_STEPS } from '../../../src/features/auth/config/steps';

describe('LOGIN_PROGRESS_STEPS', () => {
  it('définit 3 étapes de connexion', () => {
    expect(LOGIN_PROGRESS_STEPS).toHaveLength(3);
    expect(LOGIN_PROGRESS_STEPS[0]).toBe('Choix de votre profil');
    expect(LOGIN_PROGRESS_STEPS[2]).toBe('Validation finale');
  });
});

describe('REGISTER_PROGRESS_STEPS', () => {
  it('définit 3 étapes d’inscription', () => {
    expect(REGISTER_PROGRESS_STEPS).toHaveLength(3);
    expect(REGISTER_PROGRESS_STEPS[1]).toBe('Profil enseignant');
    expect(REGISTER_PROGRESS_STEPS[2]).toBe('Validation');
  });
});
