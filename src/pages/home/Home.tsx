import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';

interface QuizOption {
  id: string;
  label: string;
}

interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'focus',
    prompt: 'What do you want to validate first in your lesson?',
    options: [
      { id: 'attention', label: 'Maintain student attention' },
      { id: 'comprehension', label: 'Check concept understanding' },
      { id: 'inclusion', label: 'Ensure inclusive accessibility' },
    ],
  },
  {
    id: 'level',
    prompt: 'Which level are you preparing this class for?',
    options: [
      { id: 'middle', label: 'Middle school' },
      { id: 'high', label: 'High school' },
      { id: 'higher', label: 'Higher education' },
    ],
  },
  {
    id: 'format',
    prompt: 'Which format would you like to test first?',
    options: [
      { id: 'lesson', label: 'Lecture session' },
      { id: 'activity', label: 'Hands-on activity' },
      { id: 'quiz', label: 'QCM assessment' },
    ],
  },
];

const Home: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [motionDirection, setMotionDirection] = useState<'next' | 'back'>('next');
  const quizSectionRef = useRef<HTMLElement | null>(null);

  const currentQuestion = quizQuestions[step];
  const isLastQuestion = step === quizQuestions.length - 1;
  const isCompleted = step >= quizQuestions.length;
  const selectedOption = !isCompleted ? answers[currentQuestion.id] : undefined;
  const progress = Math.round((Math.min(step, quizQuestions.length) / quizQuestions.length) * 100);

  const recommendation = useMemo(() => {
    const focus = answers.focus;
    if (focus === 'attention') {
      return {
        title: 'Recommended path: attention simulation',
        description: 'Run a short scenario with engagement checkpoints every 10 minutes.',
        primaryCta: 'Start simulation',
        primaryPath: '/question',
      };
    }
    if (focus === 'inclusion') {
      return {
        title: 'Recommended path: inclusive validation',
        description:
          'Check accessibility first, then generate a QCM adapted to multiple learning profiles.',
        primaryCta: 'Generate inclusive QCM',
        primaryPath: '/quiz',
      };
    }
    return {
      title: 'Recommended path: comprehension diagnostic',
      description: 'Identify fragile concepts before class and improve your content immediately.',
      primaryCta: 'Open dashboard',
      primaryPath: '/dashboard',
    };
  }, [answers.focus]);

  const profileLabel = useMemo(() => {
    const focus = answers.focus;
    if (focus === 'attention') return 'Attention-sensitive class';
    if (focus === 'inclusion') return 'Inclusion-priority class';
    if (focus === 'comprehension') return 'Comprehension-focused class';
    return 'Profile in progress';
  }, [answers.focus]);

  const confidenceScore = useMemo(() => {
    const filled = Object.keys(answers).length;
    return Math.min(40 + filled * 20, 95);
  }, [answers]);

  useEffect(() => {
    if (
      isCompleted ||
      !quizSectionRef.current ||
      typeof quizSectionRef.current.scrollIntoView !== 'function'
    ) {
      return;
    }
    quizSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step, isCompleted]);

  const handleSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleBack = () => {
    if (step <= 0) return;
    setMotionDirection('back');
    setStep((prev) => prev - 1);
  };

  const handleNext = () => {
    if (isCompleted || !selectedOption) return;
    setMotionDirection('next');
    if (isLastQuestion) {
      setStep(quizQuestions.length);
      return;
    }
    setStep((prev) => prev + 1);
  };

  const restartQuiz = () => {
    setAnswers({});
    setStep(0);
    setMotionDirection('next');
  };

  const answerSummary = quizQuestions
    .map((question) => {
      const selected = question.options.find((option) => option.id === answers[question.id]);
      return selected ? selected.label : null;
    })
    .filter(Boolean) as string[];

  return (
    <div className="home-shell flex min-h-[calc(100vh-64px)] flex-col justify-between text-white">
      <main className="mx-auto mt-8 flex w-full max-w-6xl flex-col px-6 md:mt-10">
        <section ref={quizSectionRef} className="w-full border-t border-white/10 pt-8 md:pt-10">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-300">
              {isCompleted ? 'Quiz complete' : `Question ${step + 1} / ${quizQuestions.length}`}
            </p>
            <span className="text-xs font-medium text-slate-300">{progress}%</span>
          </div>
          <progress
            className="progress progress-primary mb-6 h-2 w-full"
            value={progress}
            max={100}
          ></progress>

          {!isCompleted ? (
            <div
              key={currentQuestion.id}
              className={`${motionDirection === 'next' ? 'wizard-step-next' : 'wizard-step-back'} mx-auto max-w-4xl`}
            >
              <h1 className="mx-auto max-w-4xl text-center text-4xl font-extrabold leading-tight text-white md:text-6xl">
                Test your lesson before class
                <span className="mt-1 block bg-gradient-to-r from-indigo-600 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                  and secure your teaching impact
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-center text-base text-slate-300 md:text-lg">
                {currentQuestion.prompt}
              </p>

              <div className="mx-auto mt-8 w-full max-w-3xl divide-y divide-white/15 border-y border-white/15">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelect(currentQuestion.id, option.id)}
                    className={`group flex w-full items-center gap-3 px-2 py-4 text-left font-medium transition ${
                      selectedOption === option.id
                        ? 'border-l-4 border-indigo-300 bg-indigo-500/25 pl-3 text-indigo-100 shadow-[0_0_0_1px_rgba(165,180,252,0.35)]'
                        : 'text-slate-200 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span
                      className={`grid h-8 w-8 place-content-center rounded-full text-sm font-bold ${
                        selectedOption === option.id
                          ? 'bg-indigo-500/30 text-indigo-100'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option.label}</span>
                    {selectedOption === option.id && (
                      <span className="ml-auto rounded-full bg-indigo-200/20 px-2 py-0.5 text-xs font-semibold text-indigo-100">
                        Selected
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="mx-auto mt-10 flex w-full max-w-3xl items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 0}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!selectedOption}
                  className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isLastQuestion ? 'See recommendation' : 'Next question'}
                </button>
              </div>
            </div>
          ) : (
            <div className="wizard-step-next mx-auto max-w-4xl text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-300">
                Personalized result
              </p>
              <h2 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight text-white md:text-5xl">
                {recommendation.title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
                {recommendation.description}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  to={recommendation.primaryPath}
                  className="rounded-lg bg-indigo-600 px-7 py-3 font-semibold text-white transition hover:bg-indigo-500"
                >
                  {recommendation.primaryCta}
                </Link>
                <button
                  type="button"
                  onClick={restartQuiz}
                  className="rounded-lg border border-white/15 bg-white/10 px-7 py-3 font-semibold text-white transition hover:bg-white/20"
                >
                  Retake QCM
                </button>
              </div>
            </div>
          )}
        </section>

        <>
          <section className="mt-12 border-t border-white/10 pt-10 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div className="p-1 md:p-2 lg:max-w-3xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-300">
                What you get in 60 seconds
              </p>
              <h3 className="text-2xl font-extrabold text-white md:text-3xl">
                From uncertainty to clear teaching action
              </h3>
              <div className="mt-6 border-l-2 border-indigo-300/40 pl-4">
                <div className="mb-5">
                  <p className="text-xs uppercase tracking-wide text-indigo-300">
                    1. Detected risk
                  </p>
                  <p className="mt-1 text-sm text-slate-200 md:text-base">
                    EduTwin identifies your most fragile point first (attention, comprehension, or
                    inclusion).
                  </p>
                </div>
                <div className="mb-5">
                  <p className="text-xs uppercase tracking-wide text-indigo-300">
                    2. Recommended action
                  </p>
                  <p className="mt-1 text-sm text-slate-200 md:text-base">
                    You receive a practical next step directly linked to your classroom objective.
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-indigo-300">
                    3. Ready-to-use output
                  </p>
                  <p className="mt-1 text-sm text-slate-200 md:text-base">
                    Launch simulation or generate a QCM immediately with one click.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link
                  to="/dashboard"
                  className="rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Explore dashboard
                </Link>
                <Link
                  to="/quiz"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
                >
                  Open QCM generator
                </Link>
              </div>
            </div>

            <div className="mt-8 p-1 md:p-2 lg:mt-0 lg:sticky lg:top-24">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-300">
                Progress notebook
              </p>
              <h3 className="text-lg font-bold text-white">Saved answers</h3>
              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs uppercase tracking-wide text-slate-300">Confidence</span>
                  <span className="text-sm font-semibold text-indigo-200">{confidenceScore}%</span>
                </div>
                <progress
                  className="progress progress-primary mt-2 h-1.5 w-full"
                  value={confidenceScore}
                  max={100}
                ></progress>
                <p className="mt-3 text-xs text-slate-300">
                  Profile: <span className="font-semibold text-indigo-200">{profileLabel}</span>
                </p>
              </div>
              {answerSummary.length > 0 ? (
                <div className="mt-4 space-y-2 border-l-2 border-indigo-300/40 pl-3">
                  {answerSummary.map((answer, index) => (
                    <p key={`${answer}-${index}`} className="px-1 py-1 text-sm text-slate-200">
                      {index + 1}. {answer}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-300">Start the QCM to see your path here.</p>
              )}
              <p className="mt-4 text-xs text-slate-300">
                Next best action:{' '}
                <span className="font-semibold text-slate-100">{recommendation.primaryCta}</span>
              </p>
            </div>
          </section>

          <section className="mb-12 mt-12 border-t border-white/10 pt-10 text-center">
            <h2 className="text-2xl font-extrabold text-white md:text-3xl">
              Ready to run your first simulation?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
              Move from diagnosis to action in just a few clicks.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to={recommendation.primaryPath}
                className="rounded-lg bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-500"
              >
                {recommendation.primaryCta}
              </Link>
              <Link
                to="/dashboard"
                className="rounded-lg border border-white/15 bg-white/10 px-8 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                View dashboard
              </Link>
            </div>
            <p className="mx-auto mt-4 max-w-2xl text-xs text-slate-400">
              Built for teachers who want to validate lessons before classroom delivery.
            </p>
          </section>
        </>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
