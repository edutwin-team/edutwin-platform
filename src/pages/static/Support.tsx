import React from 'react';
import Footer from '../../components/footer/Footer';

const options = [
  {
    icon: '💬',
    title: 'Chat en direct',
    desc: 'Discutez avec notre équipe en temps réel. Disponible du lundi au vendredi, 9h–18h.',
    label: 'Démarrer le chat',
    color: '#4f46e5',
    bg: '#eef2ff',
    delay: '< 2 min',
  },
  {
    icon: '📧',
    title: 'Email',
    desc: 'Envoyez-nous votre demande et nous vous répondons sous 24h ouvrées.',
    label: 'support@edutwin.fr',
    color: '#0891b2',
    bg: '#e0f2fe',
    delay: '< 24h',
  },
  {
    icon: '📞',
    title: 'Téléphone',
    desc: 'Pour les établissements avec un contrat entreprise. Support prioritaire garanti.',
    label: '+33 1 23 45 67 89',
    color: '#16a34a',
    bg: '#dcfce7',
    delay: 'Immédiat',
  },
];

const resources = [
  {
    icon: '📘',
    title: 'Documentation',
    desc: 'Guides complets pour bien démarrer.',
    href: '/documentation',
  },
  { icon: '❓', title: 'FAQ', desc: 'Réponses aux questions fréquentes.', href: '/faq' },
  { icon: '✉️', title: 'Contact', desc: 'Envoyez-nous un message direct.', href: '/contact' },
];

export default function Support() {
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({
    nom: '',
    email: '',
    type: 'Problème technique',
    message: '',
  });

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: '#ffffff',
        color: '#111827',
        paddingTop: '64px',
      }}
    >
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
          Centre d'aide
        </div>
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 54px)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 18,
          }}
        >
          Comment pouvons-nous <span style={{ color: '#818cf8' }}>vous aider ?</span>
        </h1>
        <p style={{ fontSize: 16, color: '#94a3b8', maxWidth: 460, margin: '0 auto' }}>
          Choisissez le canal qui vous convient le mieux. Notre équipe est disponible pour vous.
        </p>
      </section>

      {/* Canaux de contact */}
      <section style={{ padding: '64px 24px 0', maxWidth: 960, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
            gap: 24,
          }}
        >
          {options.map((o) => (
            <div
              key={o.title}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: 20,
                padding: '32px 28px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  background: o.bg,
                  color: o.color,
                  borderRadius: 6,
                  padding: '3px 10px',
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                ⚡ {o.delay}
              </div>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: o.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  marginBottom: 18,
                }}
              >
                {o.icon}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{o.title}</h3>
              <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7, marginBottom: 20 }}>
                {o.desc}
              </p>
              <span
                style={{
                  display: 'inline-block',
                  background: o.bg,
                  color: o.color,
                  borderRadius: 8,
                  padding: '8px 16px',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {o.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Ressources rapides */}
      <section style={{ padding: '56px 24px 0', maxWidth: 960, margin: '0 auto' }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, textAlign: 'center' }}>
          Ressources utiles
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
            gap: 16,
          }}
        >
          {resources.map((r) => (
            <a
              key={r.title}
              href={r.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                border: '1px solid #e5e7eb',
                borderRadius: 14,
                padding: '18px 20px',
                textDecoration: 'none',
                color: '#111827',
                background: '#fff',
              }}
            >
              <span style={{ fontSize: 24 }}>{r.icon}</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{r.title}</p>
                <p style={{ fontSize: 12, color: '#9ca3af' }}>{r.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Formulaire */}
      <section style={{ padding: '64px 24px 96px', maxWidth: 640, margin: '0 auto' }}>
        <div
          style={{
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 20,
            padding: '40px 36px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}
        >
          {sent ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#16a34a', marginBottom: 8 }}>
                Ticket créé avec succès !
              </h3>
              <p style={{ fontSize: 14, color: '#6b7280' }}>
                Vous recevrez une confirmation par e-mail sous quelques minutes.
              </p>
            </div>
          ) : (
            <>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>Ouvrir un ticket</h3>
              <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 28 }}>
                Notre équipe vous répond sous 24h ouvrées.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[
                    { key: 'nom', label: 'Nom complet', placeholder: 'Jean Dupont' },
                    { key: 'email', label: 'E-mail', placeholder: 'jean@exemple.fr' },
                  ].map((f) => (
                    <div key={f.key}>
                      <label
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: '#374151',
                          display: 'block',
                          marginBottom: 6,
                        }}
                      >
                        {f.label}
                      </label>
                      <input
                        placeholder={f.placeholder}
                        value={(form as any)[f.key]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 13px',
                          borderRadius: 9,
                          border: '1px solid #d1d5db',
                          fontSize: 13,
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#374151',
                      display: 'block',
                      marginBottom: 6,
                    }}
                  >
                    Type de demande
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 13px',
                      borderRadius: 9,
                      border: '1px solid #d1d5db',
                      fontSize: 13,
                      outline: 'none',
                      background: '#fff',
                    }}
                  >
                    {[
                      'Problème technique',
                      'Question sur la facturation',
                      'Demande de démo',
                      'Demande de partenariat',
                      'Autre',
                    ].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#374151',
                      display: 'block',
                      marginBottom: 6,
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    placeholder="Décrivez votre problème ou votre demande..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    style={{
                      width: '100%',
                      padding: '10px 13px',
                      borderRadius: 9,
                      border: '1px solid #d1d5db',
                      fontSize: 13,
                      outline: 'none',
                      resize: 'vertical',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <button
                  onClick={() => {
                    if (form.nom && form.email && form.message) setSent(true);
                  }}
                  style={{
                    background: '#4f46e5',
                    color: '#fff',
                    borderRadius: 10,
                    padding: '13px',
                    fontWeight: 700,
                    fontSize: 14,
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: 4,
                  }}
                >
                  Envoyer le ticket →
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
