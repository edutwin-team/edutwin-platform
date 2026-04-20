import { useState } from "react";

const TOTAL_STEPS = 3;

export function useRegisterFlow() {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const progress = Math.round((step / TOTAL_STEPS) * 100);

  const goToStep = (nextStep: number) => setStep(nextStep);
  const goNext = () => setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  const goBack = () => setStep((prev) => Math.max(prev - 1, 1));
  const reset = () => {
    setStep(1);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return {
    step,
    firstName,
    lastName,
    email,
    password,
    progress,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    goToStep,
    goNext,
    goBack,
    reset,
  };
}
