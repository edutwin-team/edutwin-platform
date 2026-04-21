import { useState } from "react";

export default function Settings() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState("normal");

  const [difficulty, setDifficulty] = useState("adaptatif");
  const [feedbackMode, setFeedbackMode] = useState("immediat");
  const [sessionDuration, setSessionDuration] = useState("45");

  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [shareProgress, setShareProgress] = useState(false);
  const [anonymizeData, setAnonymizeData] = useState(true);

  return (
    <div className="p-4 md:p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm">
          <h1 className="text-3xl font-bold">Paramètres</h1>
          <p className="mt-2 text-sm text-base-content/70">
            Personnalisez votre expérience selon vos besoins pédagogiques, d’accessibilité et de confidentialité.
          </p>
        </header>

        <section className="rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Accessibilité</h2>
            <p className="text-sm text-base-content/65">
              Ajustez l’affichage et l’animation pour une lecture plus confortable.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex items-center justify-between rounded-xl border border-base-300/70 bg-base-200/20 px-4 py-3">
              <span className="text-sm font-medium">Réduire les animations</span>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                checked={reduceMotion}
                onChange={(e) => setReduceMotion(e.target.checked)}
              />
            </label>

            <label className="flex items-center justify-between rounded-xl border border-base-300/70 bg-base-200/20 px-4 py-3">
              <span className="text-sm font-medium">Mode contraste élevé</span>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
              />
            </label>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium">Taille du texte</label>
            <select
              className="select select-bordered w-full md:max-w-xs"
              value={fontScale}
              onChange={(e) => setFontScale(e.target.value)}
            >
              <option value="compact">Compacte</option>
              <option value="normal">Normale</option>
              <option value="large">Grande</option>
            </select>
          </div>
        </section>

        <section className="rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Préférences pédagogiques</h2>
            <p className="text-sm text-base-content/65">
              Définissez le niveau et le rythme adaptés à vos pratiques.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">Niveau de difficulté</label>
              <select
                className="select select-bordered w-full"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="debutant">Débutant</option>
                <option value="intermediaire">Intermédiaire</option>
                <option value="avance">Avancé</option>
                <option value="adaptatif">Adaptatif</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Type de feedback</label>
              <select
                className="select select-bordered w-full"
                value={feedbackMode}
                onChange={(e) => setFeedbackMode(e.target.value)}
              >
                <option value="immediat">Immédiat</option>
                <option value="fin-session">Fin de session</option>
                <option value="mixte">Mixte</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Durée d’une session (min)</label>
              <select
                className="select select-bordered w-full"
                value={sessionDuration}
                onChange={(e) => setSessionDuration(e.target.value)}
              >
                <option value="30">30</option>
                <option value="45">45</option>
                <option value="60">60</option>
                <option value="90">90</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Confidentialité des données</h2>
            <p className="text-sm text-base-content/65">
              Contrôlez l’usage de vos données et le partage des informations.
            </p>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between rounded-xl border border-base-300/70 bg-base-200/20 px-4 py-3">
              <div>
                <p className="text-sm font-medium">Consentement analytics</p>
                <p className="text-xs text-base-content/65">Autoriser les statistiques d’usage anonymes.</p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                checked={analyticsConsent}
                onChange={(e) => setAnalyticsConsent(e.target.checked)}
              />
            </label>

            <label className="flex items-center justify-between rounded-xl border border-base-300/70 bg-base-200/20 px-4 py-3">
              <div>
                <p className="text-sm font-medium">Partager la progression</p>
                <p className="text-xs text-base-content/65">Visible pour les enseignants référents.</p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                checked={shareProgress}
                onChange={(e) => setShareProgress(e.target.checked)}
              />
            </label>

            <label className="flex items-center justify-between rounded-xl border border-base-300/70 bg-base-200/20 px-4 py-3">
              <div>
                <p className="text-sm font-medium">Anonymiser les exports</p>
                <p className="text-xs text-base-content/65">Retirer les données nominatives des rapports.</p>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                checked={anonymizeData}
                onChange={(e) => setAnonymizeData(e.target.checked)}
              />
            </label>
          </div>
        </section>

        <div className="flex justify-end gap-3">
          <button type="button" className="btn btn-ghost auth-btn-rounded">
            Réinitialiser
          </button>
          <button type="button" className="btn btn-primary auth-btn-rounded">
            Enregistrer les préférences
          </button>
        </div>
      </div>
    </div>
  );
}
