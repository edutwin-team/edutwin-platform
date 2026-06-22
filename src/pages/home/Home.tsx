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
    prompt: 'What do you want to validate first in hello lesson?',
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

/* ── Neural network illustration (hero) ── */
const NeuralIllustration: React.FC = () => (
  <svg
    viewBox="0 0 460 280"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full"
    style={{ height: 280 }}
    aria-hidden="true"
  >
    <g stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" fill="none">
      <line x1="60" y1="60" x2="230" y2="140" />
      <line x1="80" y1="110" x2="230" y2="140" />
      <line x1="50" y1="160" x2="230" y2="140" />
      <line x1="90" y1="200" x2="230" y2="140" />
      <line x1="130" y1="60" x2="230" y2="140" />
      <line x1="150" y1="220" x2="230" y2="140" />
      <line x1="230" y1="140" x2="340" y2="80" />
      <line x1="230" y1="140" x2="370" y2="130" />
      <line x1="230" y1="140" x2="390" y2="190" />
      <line x1="230" y1="140" x2="310" y2="220" />
      <line x1="60" y1="60" x2="130" y2="60" />
      <line x1="80" y1="110" x2="50" y2="160" />
    </g>
    <g fill="rgba(255,255,255,0.55)" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5">
      <circle cx="60" cy="60" r="5" />
      <circle cx="130" cy="60" r="4" />
      <circle cx="80" cy="110" r="5" />
      <circle cx="50" cy="160" r="4" />
      <circle cx="90" cy="200" r="5" />
      <circle cx="150" cy="220" r="4" />
      <circle cx="340" cy="80" r="5" />
      <circle cx="370" cy="130" r="4" />
      <circle cx="390" cy="190" r="5" />
      <circle cx="310" cy="220" r="4" />
      <circle cx="170" cy="190" r="7" fill="#b57bee" stroke="#d8a8ff" />
    </g>
    <circle cx="230" cy="140" r="44" fill="rgba(74,108,247,0.15)" />
    <circle
      cx="230"
      cy="140"
      r="34"
      fill="rgba(74,108,247,0.25)"
      stroke="rgba(100,140,255,0.5)"
      strokeWidth="1.5"
    />
    <circle
      cx="230"
      cy="140"
      r="24"
      fill="rgba(74,108,247,0.5)"
      stroke="rgba(140,170,255,0.8)"
      strokeWidth="1.5"
    />
    <circle cx="230" cy="140" r="18" fill="#4a6cf7" />
    <circle cx="230" cy="133" r="4.5" fill="rgba(255,255,255,0.95)" />
    <path d="M221 151 Q221 144 230 144 Q239 144 239 151" fill="rgba(255,255,255,0.95)" />
    <text
      x="230"
      y="180"
      textAnchor="middle"
      fontFamily="Inter,sans-serif"
      fontSize="11"
      fill="rgba(255,255,255,0.9)"
      fontWeight="500"
    >
      Student
    </text>
    <path
      d="M355 138 Q392 108 414 78 Q432 58 442 68 Q452 80 432 102 Q412 122 402 152 Q392 182 372 204 Q352 228 334 218 Q318 208 330 188 Q342 170 355 138 Z"
      fill="none"
      stroke="rgba(180,200,255,0.3)"
      strokeWidth="1.5"
    />
    <path
      d="M393 83 Q413 73 427 79 Q437 85 422 101 Q407 112 397 106 Z"
      fill="rgba(180,200,255,0.1)"
      stroke="rgba(180,200,255,0.45)"
      strokeWidth="1"
    />
  </svg>
);

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
    if (focus === 'attention')
      return {
        title: 'Recommended path: attention simulation',
        description: 'Run a short scenario with engagement checkpoints every 10 minutes.',
        primaryCta: 'Start simulation',
        primaryPath: '/question',
      };
    if (focus === 'inclusion')
      return {
        title: 'Recommended path: inclusive validation',
        description:
          'Check accessibility first, then generate a QCM adapted to multiple learning profiles.',
        primaryCta: 'Generate inclusive QCM',
        primaryPath: '/quiz',
      };
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
    return Math.min(40 + Object.keys(answers).length * 20, 95);
  }, [answers]);

  useEffect(() => {
    if (isCompleted || !quizSectionRef.current) return;
    quizSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step, isCompleted]);

  const handleSelect = (qId: string, oId: string) =>
    setAnswers((prev) => ({ ...prev, [qId]: oId }));

  const handleBack = () => {
    if (step <= 0) return;
    setMotionDirection('back');
    setStep((p) => p - 1);
  };

  const handleNext = () => {
    if (isCompleted || !selectedOption) return;
    setMotionDirection('next');
    if (isLastQuestion) {
      setStep(quizQuestions.length);
      return;
    }
    setStep((p) => p + 1);
  };

  const restartQuiz = () => {
    setAnswers({});
    setStep(0);
    setMotionDirection('next');
  };

  const answerSummary = quizQuestions
    .map((q) => q.options.find((o) => o.id === answers[q.id])?.label ?? null)
    .filter(Boolean) as string[];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#ffffff', color: '#111827' }}>
      <section
        style={{
          background:
            'linear-gradient(150deg, #eef1ff 0%, #e0e7ff 25%, #c7d4fb 55%, #b8c6f5 80%, #a5b4fc 100%)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '72px 24px 96px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.65)',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: 999,
            padding: '6px 20px',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#4f46e5',
            marginBottom: 36,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#4f46e5',
              display: 'inline-block',
            }}
          />
          L'avenir de l'apprentissage
        </div>

        {/* H1 */}
        <h1
          style={{
            fontSize: 'clamp(38px, 6vw, 60px)',
            fontWeight: 800,
            lineHeight: 1.08,
            color: '#0f172a',
            maxWidth: 520,
            margin: '0 auto',
          }}
        >
          Jumeau numérique <span style={{ color: '#4f46e5', display: 'block' }}>d'élève</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 16,
            color: '#475569',
            maxWidth: 400,
            lineHeight: 1.75,
            margin: '20px auto 40px',
          }}
        >
          Donnez à chaque élève un compagnon IA personnalisé qui s'adapte à son style
          d'apprentissage, suit ses progrès et offre un soutien en temps réel.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: 64,
          }}
        >
          <Link
            to="/quiz"
            style={{
              background: '#0f172a',
              color: '#fff',
              borderRadius: 10,
              padding: '13px 28px',
              fontWeight: 600,
              fontSize: 14,
              textDecoration: 'none',
              transition: 'background .2s',
            }}
          >
            Essayer la démo
          </Link>
          <Link
            to="/dashboard"
            style={{
              background: 'transparent',
              color: '#0f172a',
              borderRadius: 10,
              padding: '13px 20px',
              fontWeight: 500,
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            Découvrir →
          </Link>
        </div>

        {/* Neural illustration card */}
        <div
          style={{
            width: '100%',
            maxWidth: 520,
            borderRadius: 20,
            background: 'linear-gradient(135deg, #0d1b5e 0%, #1e3a8a 40%, #0d0d3d 100%)',
            padding: '40px 32px',
            boxShadow: '0 32px 80px rgba(79,70,229,0.3)',
          }}
        >
          <NeuralIllustration />
        </div>
      </section>
      <section style={{ background: '#ffffff', padding: '88px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: '#111827', marginBottom: 10 }}>
            Pourquoi <span style={{ color: '#4f46e5' }}>EduTwin ?</span>
          </h2>
          <p
            style={{
              fontSize: 14.5,
              color: '#6b7280',
              maxWidth: 440,
              margin: '0 auto 56px',
              lineHeight: 1.75,
            }}
          >
            Libérez le potentiel d'une éducation personnalisée grâce à des informations basées sur
            l'IA et un soutien continu.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
              gap: 24,
            }}
          >
            {[
              {
                icon: '🧠',
                bg: '#ede9fe',
                iconBg: '#7c3aed',
                title: 'Apprentissage personnalisé',
                desc: "S'adapte au rythme et au style de chaque élève, garantissant la maîtrise des concepts avant de progresser.",
              },
              {
                icon: '📊',
                bg: '#dbeafe',
                iconBg: '#2563eb',
                title: 'Analyses en temps réel',
                desc: 'Les enseignants obtiennent des informations instantanées sur les performances de la classe, identifiant tôt les élèves en difficulté.',
              },
              {
                icon: '🛡️',
                bg: '#dcfce7',
                iconBg: '#16a34a',
                title: 'Sûr et sécurisé',
                desc: 'Une sécurité de niveau entreprise garantit que les données des élèves sont protégées et conformes aux lois sur la confidentialité.',
              },
            ].map((f) => (
              <div
                key={f.title}
                style={{
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 16,
                  padding: '28px 24px',
                  textAlign: 'left',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: f.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    marginBottom: 18,
                  }}
                >
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#111827', marginBottom: 10 }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: '#f9fafb', padding: '88px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: '#111827', marginBottom: 10 }}>
            Comment ça marche
          </h2>
          <p
            style={{
              fontSize: 14.5,
              color: '#6b7280',
              maxWidth: 440,
              margin: '0 auto 56px',
              lineHeight: 1.75,
            }}
          >
            Une intégration transparente dans votre flux de travail éducatif existant.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
              gap: 48,
            }}
          >
            {[
              {
                num: '1',
                icon: '📋',
                bg: '#dbeafe',
                title: 'Collecte de données',
                desc: "Agrège en temps réel l'historique académique, les préférences d'apprentissage et les données d'interaction.",
              },
              {
                num: '2',
                icon: '🤖',
                bg: '#ede9fe',
                title: 'Analyse IA',
                desc: 'Des algorithmes avancés construisent un jumeau numérique dynamique, prédisant les lacunes et les parcours optimaux.',
              },
              {
                num: '3',
                icon: '👤',
                bg: '#dcfce7',
                title: 'Soutien personnalisé',
                desc: "Fournit des exercices, des explications et des encouragements personnalisés exactement quand c'est nécessaire.",
              },
            ].map((s) => (
              <div
                key={s.title}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}
              >
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 16,
                      background: s.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 26,
                    }}
                  >
                    {s.icon}
                  </div>
                  <span
                    style={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: '#4f46e5',
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {s.num}
                  </span>
                </div>
                <h3 style={{ fontSize: 14.5, fontWeight: 700, color: '#111827' }}>{s.title}</h3>
                <p
                  style={{
                    fontSize: 13,
                    color: '#6b7280',
                    lineHeight: 1.7,
                    maxWidth: 210,
                    textAlign: 'center',
                  }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#ffffff', padding: '88px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: '#111827', marginBottom: 48 }}>
            Approuvé par les éducateurs
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
              gap: 24,
            }}
          >
            {[
              {
                quote:
                  "EduTwin a complètement transformé ma gestion de classe. Les analyses me permettent d'intervenir précisément quand un élève est en difficulté, plutôt que d'attendre le prochain examen.",
                author: 'Enseignant(e), Collège',
              },
              {
                quote:
                  "Avoir un jumeau numérique signifie que je ne me sens jamais perdu. Si je ne comprends pas un concept en cours, mon EduTwin me l'explique plus tard d'une manière qui me parle.",
                author: 'Élève, Lycée',
              },
            ].map((t) => (
              <div
                key={t.author}
                style={{
                  background: '#eef2ff',
                  borderRadius: 16,
                  padding: '28px 28px',
                  textAlign: 'left',
                }}
              >
                <p
                  style={{ fontSize: 14, color: '#374151', lineHeight: 1.75, fontStyle: 'italic' }}
                >
                  "{t.quote}"
                </p>
                <p style={{ marginTop: 18, fontSize: 13, fontWeight: 600, color: '#4f46e5' }}>
                  — {t.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
