import React from 'react';
import Footer from '../../components/footer/Footer';

const categories = [
  {
    label: 'Général',
    icon: '💡',
    faqs: [
      {
        q: "Qu'est-ce qu'un jumeau numérique d'élève ?",
        a: "C'est un profil IA dynamique qui modélise le comportement, les forces et les lacunes de chaque élève. Il se met à jour en temps réel à chaque interaction avec la plateforme.",
      },
      {
        q: 'Y a-t-il une version gratuite ?',
        a: "EduTwin propose une période d'essai gratuite de 30 jours sans carte bancaire. Des tarifs spéciaux sont disponibles pour les établissements scolaires publics.",
      },
      {
        q: 'Combien de temps faut-il pour configurer EduTwin ?',
        a: "La mise en place initiale prend moins de 30 minutes. L'import des listes d'élèves, la configuration des classes et le premier quiz adaptatif peuvent être lancés le jour même.",
      },
    ],
  },
  {
    label: 'Technique',
    icon: '⚙️',
    faqs: [
      {
        q: 'EduTwin est-il compatible avec notre LMS actuel ?',
        a: "Oui. EduTwin s'intègre avec Moodle, Canvas, Google Classroom et tout système compatible LTI 1.3. Une API REST est également disponible pour des intégrations sur mesure.",
      },
      {
        q: 'EduTwin fonctionne-t-il sur mobile ?',
        a: 'Oui, la plateforme est entièrement responsive. Une application mobile native (iOS et Android) est disponible pour les élèves.',
      },
    ],
  },
  {
    label: 'Sécurité & RGPD',
    icon: '🛡️',
    faqs: [
      {
        q: 'Les données des élèves sont-elles sécurisées ?',
        a: "Absolument. Toutes les données sont chiffrées (AES-256), hébergées en Europe et conformes au RGPD. Aucune donnée n'est partagée avec des tiers sans consentement explicite.",
      },
    ],
  },
  {
    label: 'Élèves & Enseignants',
    icon: '👩‍🏫',
    faqs: [
      {
        q: 'Les élèves ont-ils accès à leur propre jumeau numérique ?',
        a: "Oui, chaque élève dispose d'un espace personnel où il peut consulter ses progrès, ses recommandations et interagir avec son jumeau numérique pour obtenir des explications personnalisées.",
      },
      {
        q: 'Comment les enseignants sont-ils formés ?',
        a: "Nous proposons des webinaires d'onboarding, une documentation complète et un support dédié. Une formation en présentiel peut être organisée pour les établissements qui en font la demande.",
      },
    ],
  },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [open, setOpen] = React.useState<number | null>(null);

  const currentFaqs = categories[activeCategory].faqs;

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
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #ede9fe 100%)',
          padding: '90px 24px 72px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.8)',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: 999,
            padding: '6px 20px',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#4f46e5',
            marginBottom: 28,
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
          Questions fréquentes
        </div>
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 54px)',
            fontWeight: 800,
            color: '#0f172a',
            marginBottom: 18,
          }}
        >
          Vous avez des <span style={{ color: '#4f46e5' }}>questions ?</span>
        </h1>
        <p style={{ fontSize: 16, color: '#475569', maxWidth: 460, margin: '0 auto' }}>
          Retrouvez les réponses aux questions les plus fréquentes sur EduTwin, classées par thème.
        </p>
      </section>

      {/* Contenu */}
      <section style={{ padding: '72px 24px 96px', maxWidth: 860, margin: '0 auto' }}>
        {/* Onglets catégories */}
        <div
          style={{
            display: 'flex',
            gap: 10,
            flexWrap: 'wrap',
            marginBottom: 40,
            justifyContent: 'center',
          }}
        >
          {categories.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => {
                setActiveCategory(i);
                setOpen(null);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '9px 20px',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                border: activeCategory === i ? '2px solid #4f46e5' : '2px solid #e5e7eb',
                background: activeCategory === i ? '#eef2ff' : '#fff',
                color: activeCategory === i ? '#4f46e5' : '#6b7280',
                cursor: 'pointer',
                transition: 'all .15s',
              }}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 16, overflow: 'hidden' }}>
          {currentFaqs.map((faq, i) => (
            <div
              key={i}
              style={{ borderBottom: i < currentFaqs.length - 1 ? '1px solid #e5e7eb' : 'none' }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: open === i ? '#f9fafb' : '#fff',
                  border: 'none',
                  padding: '22px 28px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>{faq.q}</span>
                <span
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    flexShrink: 0,
                    background: open === i ? '#4f46e5' : '#f3f4f6',
                    color: open === i ? '#fff' : '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    fontWeight: 300,
                    transition: 'all .2s',
                  }}
                >
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i && (
                <div style={{ padding: '0 28px 22px', background: '#f9fafb' }}>
                  <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.8 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA bas */}
        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 16 }}>
            Vous n'avez pas trouvé votre réponse ?
          </p>
          <a
            href="/contact"
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
            Nous contacter →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
