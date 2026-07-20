import { render, screen } from '@testing-library/react';

import { AuthProgressPanel } from '../../src/components/navbar/auth/AuthProgressPanel';
import { LOGIN_PROGRESS_STEPS } from '../../src/features/auth/config/steps';

describe('AuthProgressPanel', () => {
  it('affiche les étapes et la progression', () => {
    render(<AuthProgressPanel steps={LOGIN_PROGRESS_STEPS} currentStep={2} progressValue={66} />);

    expect(screen.getByText('Votre progression')).toBeInTheDocument();
    expect(screen.getByText('Choix de votre profil')).toBeInTheDocument();
    expect(screen.getByText('Identifiants')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('value', '66');
  });
});
