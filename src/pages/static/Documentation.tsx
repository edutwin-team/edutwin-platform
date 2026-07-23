import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';

const sections = [
  {
    icon: '🚀',
    tag: 'Premiers pas',
    title: 'Démarrage rapide',
    content:
      'Créez votre compte EduTwin, configurez votre première classe et commencez à générer des jumeaux numériques en moins de 10 minutes.',
    steps: [
      'Créer un compte',
      'Ajouter vos élèves',
      'Lancer le premier quiz adaptatif',
      'Consulter les analyses',
    ],
    color: '#4f46e5',
    bg: '#eef2ff',
  },
  {
    icon: '🧠',
    tag: 'Cœur du produit',
    title: 'Jumeau numérique',
    content:
      "Le jumeau numérique est un profil IA dynamique de chaque élève. Il se met à jour en temps réel selon les interactions, les résultats et le style d'apprentissage détecté.",
    steps: [
      'Collecte automatique des données',
      'Modélisation du profil cognitif',
      'Prédiction des lacunes',
      'Recommandations personnalisées',
    ],
    color: '#7c3aed',
    bg: '#ede9fe',
  },
  {
    icon: '📊',
    tag: 'Enseignants',
    title: 'Tableau de bord',
    content:
      "Visualisez en un coup d'œil l'état de toute votre classe : taux de compréhension, élèves en difficulté, progrès hebdomadaires et alertes en temps réel.",
    steps: [
      'Vue globale de la classe',
      'Fiches individuelles',
      'Export PDF des rapports',
      'Alertes automatiques',
    ],
    color: '#2563eb',
    bg: '#dbeafe',
  },
  {
    icon: '🔌',
    tag: 'Technique',
    title: 'Intégrations',
    content:
      "EduTwin s'intègre avec les principaux LMS (Moodle, Canvas, Google Classroom) et peut être connecté via notre API REST.",
    steps: [
      'Connexion LMS en 1 clic',
      'Import CSV élèves',
      'Webhooks personnalisables',
      'SSO / OAuth2',
    ],
    color: '#059669',
    bg: '#d1fae5',
  },
];

export default function Documentation() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#ffffff', color: '#111827' }}>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #312e81 100%)',
          padding: '90px 24px 72px',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 999,
            padding: '6px 20px',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#a5b4fc',
            marginBottom: 28,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#a5b4fc',
              display: 'inline-block',
            }}
          />
          Documentation officielle
        </div>
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 54px)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 18,
          }}
        >
          Guide complet <span style={{ color: '#818cf8' }}>EduTwin</span>
        </h1>
        <p style={{ fontSize: 16, color: '#94a3b8', maxWidth: 500, margin: '0 auto 40px' }}>
          Tout ce dont vous avez besoin pour déployer, configurer et tirer le meilleur parti de la
          plateforme.
        </p>
        {/* Search bar déco */}x
      </section>

      {/* Sections */}
      <section style={{ padding: '72px 24px 96px', maxWidth: 940, margin: '0 auto' }}>
        <div style={{ display: 'grid', gap: 28 }}>
          {sections.map((s) => (
            <div
              key={s.title}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: 20,
                padding: '36px 32px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 32,
                alignItems: 'start',
              }}
            >
              <div>
                <span
                  style={{
                    background: s.bg,
                    color: s.color,
                    borderRadius: 6,
                    padding: '4px 12px',
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {s.tag}
                </span>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0 12px' }}
                >
                  <span style={{ fontSize: 28 }}>{s.icon}</span>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827' }}>{s.title}</h2>
                </div>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.75 }}>{s.content}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {s.steps.map((step, i) => (
                  <div
                    key={step}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      background: '#f9fafb',
                      borderRadius: 10,
                      padding: '12px 16px',
                      border: '1px solid #f3f4f6',
                    }}
                  >
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: s.color,
                        color: '#fff',
                        fontSize: 11,
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 64,
            background: 'linear-gradient(135deg, #eef2ff, #ede9fe)',
            borderRadius: 20,
            padding: '40px 32px',
            textAlign: 'center',
            border: '1px solid #e0e7ff',
          }}
        >
          <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
            Une question non couverte ici ?
          </h3>
          <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 24 }}>
            Notre équipe support répond sous 24h ouvrées.
          </p>
          <Link
            to="/support"
            style={{
              background: '#4f46e5',
              color: '#fff',
              borderRadius: 10,
              padding: '13px 32px',
              fontWeight: 700,
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            Contacter le support →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
