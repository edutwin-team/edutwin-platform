import { useState } from 'react';

const TOTAL_STEPS = 3;

export function useLoginFlow() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const canContinueStep1 = profile.length > 0;
  const canContinueStep2 = email.trim().length > 0 && password.trim().length > 0;
  const progress = Math.round((step / TOTAL_STEPS) * 100);

  const goToStep = (nextStep: number) => setStep(nextStep);
  const goNext = () => setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  const goBack = () => setStep((prev) => Math.max(prev - 1, 1));

  return {
    step,
    profile,
    email,
    password,
    canContinueStep1,
    canContinueStep2,
    progress,
    setProfile,
    setEmail,
    setPassword,
    goToStep,
    goNext,
    goBack,
  };
}
