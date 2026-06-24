import { useEffect, useState, type ReactNode } from 'react';
import {
  Accessibility,
  BookOpen,
  CheckCircle2,
  Palette,
  RotateCcw,
  Save,
  Shield,
} from 'lucide-react';
import { ThemeSwitch } from '../../components/navbar/ThemeSwitch';
import { DEFAULT_SETTINGS } from '../../features/settings/defaults';
import { useSettings } from '../../features/settings/useSettings';
import type { UserSettings } from '../../features/settings/types';

const difficultyLabels: Record<UserSettings['difficulty'], string> = {
  debutant: 'Débutant',
  intermediaire: 'Intermédiaire',
  avance: 'Avancé',
  adaptatif: 'Adaptatif',
};

const feedbackLabels: Record<UserSettings['feedbackMode'], string> = {
  immediat: 'Immédiat',
  'fin-session': 'Fin de session',
  mixte: 'Mixte',
};

const fontScaleLabels: Record<UserSettings['fontScale'], string> = {
  compact: 'Compacte',
  normal: 'Normale',
  large: 'Grande',
};

function SettingToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="settings-toggle-row flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-base-300/70 bg-base-200/20 px-4 py-3">
      <div>
        <p className="text-sm font-medium">{title}</p>
        {description ? <p className="mt-1 text-xs text-base-content/65">{description}</p> : null}
      </div>
      <input
        type="checkbox"
        className="toggle toggle-primary toggle-sm"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
}

function SettingsSectionCard({
  icon,
  eyebrow,
  title,
  description,
  children,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <article className="settings-card rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="settings-section-icon shrink-0">{icon}</span>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            {eyebrow}
          </p>
          <h2 className="mt-1 text-xl font-bold">{title}</h2>
          <p className="mt-2 text-sm text-base-content/70">{description}</p>
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </article>
  );
}

export default function Settings() {
  const { settings, saveSettings, resetSettings } = useSettings();
  const [draft, setDraft] = useState<UserSettings>(settings);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    setDraft(settings);
  }, [settings]);

  const patchDraft = (patch: Partial<UserSettings>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
    setSaveMessage(null);
  };

  const handleSave = () => {
    saveSettings(draft);
    setSaveMessage('Préférences enregistrées et appliquées.');
  };

  const handleReset = () => {
    resetSettings();
    setDraft(DEFAULT_SETTINGS);
    setSaveMessage('Préférences réinitialisées.');
  };

  const activeAccessibilityCount = [
    draft.reduceMotion,
    draft.highContrast,
    draft.fontScale !== 'normal',
  ].filter(Boolean).length;

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 md:p-6">
      <section className="settings-hero relative overflow-hidden rounded-3xl border border-base-300/70 p-6 shadow-sm md:p-7">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-400/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 left-8 h-36 w-36 rounded-full bg-sky-400/10 blur-2xl" />

        <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Personnalisation
            </p>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Paramètres</h1>
            <p className="mt-2 max-w-2xl text-sm text-base-content/70 md:text-base">
              Ajustez l’apparence, l’accessibilité et vos préférences pédagogiques. Vos choix sont
              conservés et réappliqués automatiquement à chaque visite.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="badge badge-outline badge-sm">
                {draft.theme === 'dark' ? 'Thème sombre' : 'Thème clair'}
              </span>
              <span className="badge badge-outline badge-sm">
                Texte {fontScaleLabels[draft.fontScale].toLowerCase()}
              </span>
              <span className="badge badge-outline badge-sm">
                {difficultyLabels[draft.difficulty]}
              </span>
              <span className="badge badge-outline badge-sm">{draft.sessionDuration} min</span>
            </div>
          </div>

          <div className="stats stats-vertical w-full border border-base-300/70 bg-base-100/90 shadow-sm backdrop-blur-sm md:w-auto md:stats-horizontal">
            <div className="stat px-5 py-3">
              <div className="stat-title text-xs">Thème actif</div>
              <div className="stat-value text-2xl">
                {draft.theme === 'dark' ? 'Sombre' : 'Clair'}
              </div>
            </div>
            <div className="stat px-5 py-3">
              <div className="stat-title text-xs">Accessibilité</div>
              <div className="stat-value text-2xl">{activeAccessibilityCount}</div>
              <div className="stat-desc text-xs">réglage(s) actif(s)</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <SettingsSectionCard
          icon={<Palette className="h-5 w-5" />}
          eyebrow="Apparence"
          title="Thème et affichage"
          description="Choisissez le mode clair ou sombre et la taille du texte pour toute la plateforme."
        >
          <div className="space-y-4">
            <div className="settings-toggle-row flex items-center justify-between rounded-xl border border-base-300/70 bg-base-200/20 px-4 py-3">
              <div>
                <p className="text-sm font-medium">Mode sombre</p>
                <p className="mt-1 text-xs text-base-content/65">
                  Identique au commutateur de la barre de navigation.
                </p>
              </div>
              <ThemeSwitch
                isDark={draft.theme === 'dark'}
                onToggle={() => patchDraft({ theme: draft.theme === 'light' ? 'dark' : 'light' })}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Taille du texte</label>
              <div className="grid grid-cols-3 gap-2">
                {(['compact', 'normal', 'large'] as const).map((scale) => (
                  <button
                    key={scale}
                    type="button"
                    className={`settings-scale-btn ${
                      draft.fontScale === scale ? 'settings-scale-btn-active' : ''
                    }`}
                    onClick={() => patchDraft({ fontScale: scale })}
                  >
                    {fontScaleLabels[scale]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SettingsSectionCard>

        <SettingsSectionCard
          icon={<Accessibility className="h-5 w-5" />}
          eyebrow="Accessibilité"
          title="Confort de lecture"
          description="Réduisez les animations et renforcez les contrastes pour une lecture plus confortable."
        >
          <div className="space-y-3">
            <SettingToggleRow
              title="Réduire les animations"
              description="Limite les transitions et animations visuelles."
              checked={draft.reduceMotion}
              onChange={(checked) => patchDraft({ reduceMotion: checked })}
            />
            <SettingToggleRow
              title="Mode contraste élevé"
              description="Renforce les bordures et la lisibilité du texte."
              checked={draft.highContrast}
              onChange={(checked) => patchDraft({ highContrast: checked })}
            />
          </div>
        </SettingsSectionCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <SettingsSectionCard
          icon={<BookOpen className="h-5 w-5" />}
          eyebrow="Préférences pédagogiques"
          title="Rythme et niveau"
          description="Définissez le niveau et le rythme adaptés à vos pratiques d’enseignement."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Niveau de difficulté</label>
              <select
                className="select select-bordered w-full"
                value={draft.difficulty}
                onChange={(e) =>
                  patchDraft({ difficulty: e.target.value as UserSettings['difficulty'] })
                }
              >
                {Object.entries(difficultyLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Type de feedback</label>
              <select
                className="select select-bordered w-full"
                value={draft.feedbackMode}
                onChange={(e) =>
                  patchDraft({ feedbackMode: e.target.value as UserSettings['feedbackMode'] })
                }
              >
                {Object.entries(feedbackLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium">Durée d’une session (min)</label>
              <select
                className="select select-bordered w-full sm:max-w-xs"
                value={draft.sessionDuration}
                onChange={(e) =>
                  patchDraft({
                    sessionDuration: e.target.value as UserSettings['sessionDuration'],
                  })
                }
              >
                <option value="30">30</option>
                <option value="45">45</option>
                <option value="60">60</option>
                <option value="90">90</option>
              </select>
            </div>
          </div>
        </SettingsSectionCard>

        <SettingsSectionCard
          icon={<Shield className="h-5 w-5" />}
          eyebrow="Confidentialité"
          title="Données et partage"
          description="Contrôlez l’usage de vos données et le partage des informations."
        >
          <div className="space-y-3">
            <SettingToggleRow
              title="Consentement analytics"
              description="Autoriser les statistiques d’usage anonymes."
              checked={draft.analyticsConsent}
              onChange={(checked) => patchDraft({ analyticsConsent: checked })}
            />
            <SettingToggleRow
              title="Partager la progression"
              description="Visible pour les enseignants référents."
              checked={draft.shareProgress}
              onChange={(checked) => patchDraft({ shareProgress: checked })}
            />
            <SettingToggleRow
              title="Anonymiser les exports"
              description="Retirer les données nominatives des rapports."
              checked={draft.anonymizeData}
              onChange={(checked) => patchDraft({ anonymizeData: checked })}
            />
          </div>
        </SettingsSectionCard>
      </section>

      <section className="settings-action-bar rounded-2xl p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-sm text-base-content/70">
            <p>
              <span className="font-medium text-base-content">Résumé :</span>{' '}
              {draft.theme === 'dark' ? 'thème sombre' : 'thème clair'}, texte{' '}
              {fontScaleLabels[draft.fontScale].toLowerCase()}, difficulté{' '}
              {difficultyLabels[draft.difficulty].toLowerCase()}, feedback{' '}
              {feedbackLabels[draft.feedbackMode].toLowerCase()}.
            </p>
            {saveMessage ? (
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-success">
                <CheckCircle2 className="h-4 w-4" />
                {saveMessage}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              className="btn btn-ghost auth-btn-rounded gap-2"
              onClick={handleReset}
            >
              <RotateCcw className="h-4 w-4" />
              Réinitialiser
            </button>
            <button
              type="button"
              className="btn btn-primary auth-btn-rounded gap-2 shadow-md"
              onClick={handleSave}
            >
              <Save className="h-4 w-4" />
              Enregistrer les préférences
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
