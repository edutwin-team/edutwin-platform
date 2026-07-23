import React from 'react';
import Footer from '../../components/footer/Footer';

export default function Contact() {
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ nom: '', email: '', sujet: '', message: '' });

  const handleSubmit = () => {
    if (form.nom && form.email && form.message) setSent(true);
  };

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
          Nous contacter
        </div>
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 54px)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 18,
          }}
        >
          Parlons de votre <span style={{ color: '#818cf8' }}>projet</span>
        </h1>
        <p style={{ fontSize: 16, color: '#94a3b8', maxWidth: 480, margin: '0 auto' }}>
          Notre équipe est à votre écoute. Répondez à vos questions, demandes de démo ou
          partenariats.
        </p>
      </section>

      {/* Cartes info + formulaire */}
      <section style={{ padding: '72px 24px 96px', maxWidth: 1000, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.6fr',
            gap: 48,
            alignItems: 'start',
          }}
        >
          {/* Colonne gauche — infos */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Restons en contact</h2>
            <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.75, marginBottom: 8 }}>
              Que vous soyez enseignant, directeur d'établissement ou partenaire technologique, nous
              sommes là pour vous accompagner.
            </p>

            {[
              { icon: '📧', label: 'Email', value: 'contact@edutwin.fr' },
              { icon: '📞', label: 'Téléphone', value: '+33 1 23 45 67 89' },
              { icon: '📍', label: 'Adresse', value: "12 rue de l'Innovation, 75008 Paris" },
              { icon: '🕐', label: 'Horaires', value: 'Lun–Ven, 9h–18h' },
            ].map((info) => (
              <div
                key={info.label}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                  background: '#f9fafb',
                  borderRadius: 12,
                  padding: '16px 18px',
                  border: '1px solid #e5e7eb',
                }}
              >
                <span style={{ fontSize: 20 }}>{info.icon}</span>
                <div>
                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#9ca3af',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: 2,
                    }}
                  >
                    {info.label}
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{info.value}</p>
                </div>
              </div>
            ))}

            {/* Réseaux */}
            <div style={{ marginTop: 8 }}>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#9ca3af',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: 12,
                }}
              >
                Nous suivre
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                {[
                  { label: 'LinkedIn', color: '#2563eb', bg: '#dbeafe' },
                  { label: 'Twitter', color: '#0891b2', bg: '#e0f2fe' },
                  { label: 'Instagram', color: '#db2777', bg: '#fce7f3' },
                ].map((r) => (
                  <span
                    key={r.label}
                    style={{
                      background: r.bg,
                      color: r.color,
                      borderRadius: 8,
                      padding: '6px 14px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {r.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite — formulaire */}
          <div
            style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 20,
              padding: '36px 32px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}
          >
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#16a34a', marginBottom: 8 }}>
                  Message envoyé !
                </h3>
                <p style={{ fontSize: 14, color: '#6b7280' }}>
                  Nous vous répondrons sous 24h ouvrées.
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 24 }}>
                  Envoyer un message
                </h3>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 16,
                    marginBottom: 16,
                  }}
                >
                  {[
                    { key: 'nom', label: 'Nom complet', placeholder: 'Jean Dupont' },
                    { key: 'email', label: 'Adresse e-mail', placeholder: 'jean@exemple.fr' },
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
                        value={form[f.key as keyof typeof form]}
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
                <div style={{ marginBottom: 16 }}>
                  <label
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#374151',
                      display: 'block',
                      marginBottom: 6,
                    }}
                  >
                    Sujet
                  </label>
                  <input
                    placeholder="Ex : Demande de démo"
                    value={form.sujet}
                    onChange={(e) => setForm({ ...form, sujet: e.target.value })}
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
                <div style={{ marginBottom: 24 }}>
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
                    placeholder="Décrivez votre besoin..."
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
                  onClick={handleSubmit}
                  style={{
                    width: '100%',
                    background: '#4f46e5',
                    color: '#fff',
                    borderRadius: 10,
                    padding: '13px',
                    fontWeight: 700,
                    fontSize: 14,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Envoyer le message →
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
