import { useState, useMemo } from 'react';
import {
  User,
  Calendar,
  FileText,
  GraduationCap,
  Star,
  MessageSquare,
  Eye,
  Heart,
  Flame,
  Zap,
  Brain,
  MessageCircle,
  Target,
  TrendingUp,
  Shield,
  Sparkles,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';

import { useContexts } from '../../hooks/twins/useContexts';
import { useCreateTwin } from '../../hooks/twins/useCreateTwin';
import { useUpdateTwin } from '../../hooks/twins/useUpdateTwin';

import type { Behavior, DigitalTwin } from '../../types/types';
import { Slider } from '../ui/stats/Slider';
import { Input, TextArea } from '../ui/form/inputs';
import { IoCloseSharp } from 'react-icons/io5';

//types
type TwinModalProps = {
  open: boolean;
  onClose: () => void;
  twin?: DigitalTwin | null;
};

type TwinForm = {
  name: string;
  age: number | undefined;
  average_grade: number | undefined;
  description: string;
  context: number | undefined;
  behavior: Behavior;
};

//default form

const defaultBehavior: Behavior = {
  attention_level: 50,
  motivation: 50,
  stress_level: 50,
  fatigue_level: 50,
  comprehension_level: 50,
  learning_speed: 50,
  memory_retention: 50,
  autonomy_level: 50,
  persistence_level: 50,
  curiosity_level: 50,
  error_rate: 50,
  learning_style: '',
  preferred_content_type: '',
  question_frequency: 0,
  comment: '',
};

const defaultForm: TwinForm = {
  name: '',
  age: undefined,
  average_grade: undefined,
  description: '',
  context: undefined,
  behavior: defaultBehavior,
};

export const TwinModal = ({ open, onClose, twin }: TwinModalProps) => {
  const behaviorFields = [
    { key: 'attention_level', label: 'Attention', icon: Eye },
    { key: 'motivation', label: 'Motivation', icon: Heart },
    { key: 'stress_level', label: 'Stress', icon: Flame },
    { key: 'fatigue_level', label: 'Fatigue', icon: Zap },
    { key: 'comprehension_level', label: 'Compréhension', icon: Brain },
    { key: 'learning_speed', label: 'Vitesse', icon: TrendingUp },
    { key: 'memory_retention', label: 'Mémoire', icon: Shield },
    { key: 'autonomy_level', label: 'Autonomie', icon: Target },
    { key: 'persistence_level', label: 'Persistance', icon: Sparkles },
    { key: 'curiosity_level', label: 'Curiosité', icon: MessageCircle },
    { key: 'error_rate', label: 'Erreur', icon: AlertTriangle },
    { key: 'question_frequency', label: 'Questions', icon: HelpCircle },
  ] as const;

  //react query mutation functions
  const { data: contexts } = useContexts();
  const { mutate: createTwin, isPending: isCreating } = useCreateTwin({
    onSuccess: () => handleClose(),
  });
  const { mutate: updateTwin, isPending: isUpdating } = useUpdateTwin({
    onSuccess: () => handleClose(),
  });

  const isPending = isCreating || isUpdating;

  const [step, setStep] = useState(1);
  //get twin data when modal is on edit
  const [form, setForm] = useState<TwinForm>(() =>
    twin
      ? {
          name: twin.name ?? '',
          age: twin.age ?? undefined,
          average_grade: twin.average_grade ?? undefined,
          description: twin.description ?? '',
          context: twin.context ?? undefined,
          behavior: twin.behavior ?? defaultBehavior,
        }
      : defaultForm
  );

  const canGoNext = useMemo(() => {
    if (step === 1) {
      return (
        form.name.trim() !== '' &&
        form.age !== undefined &&
        form.age >= 10 &&
        form.average_grade !== undefined &&
        form.average_grade >= 0 &&
        form.average_grade <= 20 &&
        form.description.trim() !== ''
      );
    }

    if (step === 2) {
      return form.context !== undefined;
    }

    return true;
  }, [step, form]);

  const canSave =
    form.behavior.learning_style !== '' && form.behavior.preferred_content_type !== '';

  const handleChange = <K extends keyof TwinForm>(key: K, value: TwinForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleBehaviorChange = <K extends keyof Behavior>(key: K, value: Behavior[K]) => {
    setForm((prev) => ({
      ...prev,
      behavior: { ...prev.behavior, [key]: value },
    }));
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      age: form.age ?? undefined,
      average_grade: form.average_grade ?? undefined,
      context: form.context ?? undefined,
    };

    if (twin && twin.id !== undefined) updateTwin({ id: twin.id, data: payload });
    else createTwin(payload);
  };

  const resetForm = (twin?: DigitalTwin | null) => {
    setForm(
      twin
        ? {
            name: twin.name ?? '',
            age: twin.age ?? undefined,
            average_grade: twin.average_grade ?? undefined,
            description: twin.description ?? '',
            context: twin.context ?? undefined,
            behavior: twin.behavior ?? defaultBehavior,
          }
        : defaultForm
    );

    setStep(1);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-3xl">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          {/* LEFT */}
          <div className="flex items-center gap-2">
            <User className="text-primary" size={20} />
            <h2 className="text-xl font-bold">
              {twin ? 'Modifier le twin' : 'Créer un jumeau numérique'}
            </h2>
          </div>

          {/* RIGHT - CLOSE BUTTON */}
          <button
            type="button"
            className="btn btn-ghost btn-sm absolute right-3 top-3 z-20 rounded-full bg-base-100/80 backdrop-blur hover:bg-base-100"
            onClick={handleClose}
          >
            <IoCloseSharp className="h-5 w-5" />
          </button>
        </div>

        {/* 4 STEPS */}
        <div className="flex gap-2 mb-5">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full ${step >= s ? 'bg-primary' : 'bg-base-300'}`}
            />
          ))}
        </div>

        <div key={step} className="animate-step">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              {/* NAME */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Nom du twin</span>
                </label>
                <Input
                  icon={User}
                  value={form.name}
                  onChange={(v) => handleChange('name', v)}
                  placeholder="Ex. : Mohamed, Emma, Lucas..."
                />
              </div>

              {/* AGE */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Âge</span>
                </label>
                <Input
                  icon={Calendar}
                  type="number"
                  value={form.age ?? ''}
                  onChange={(v) => handleChange('age', v === '' ? undefined : Number(v))}
                  placeholder="Ex. : 18"
                />
              </div>

              {/* AVERAGE GRADE */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Moyenne générale (/20)</span>
                </label>
                <Input
                  icon={Star}
                  type="number"
                  value={form.average_grade ?? ''}
                  onChange={(v) => handleChange('average_grade', v === '' ? undefined : Number(v))}
                  placeholder="Ex. : 14.5"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Description</span>
                </label>
                <TextArea
                  icon={FileText}
                  value={form.description}
                  onChange={(v) => handleChange('description', v)}
                  placeholder="Ex. : Élève motivé..."
                />
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-2">
              <label className="text-sm flex items-center gap-2">
                <GraduationCap size={14} className="text-primary" />
                Contexte pédagogique
              </label>

              <select
                className="select select-bordered bg-base-200 w-full"
                value={form.context ?? ''}
                onChange={(e) =>
                  handleChange(
                    'context',
                    e.target.value === '' ? undefined : Number(e.target.value)
                  )
                }
              >
                <option value="">Sélectionner un contexte</option>
                {contexts?.map((c: { id: number; name: string }) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="grid grid-cols-2 gap-3">
              {behaviorFields.map((field) => (
                <Slider
                  key={field.key}
                  label={field.label}
                  icon={field.icon}
                  value={Number(form.behavior[field.key as keyof Behavior] ?? 0)}
                  onChange={(v: number) => handleBehaviorChange(field.key as keyof Behavior, v)}
                />
              ))}
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="space-y-4">
              {/* LEARNING STYLE options */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Style d’apprentissage</span>
                </label>

                <select
                  className="select select-bordered bg-base-200 w-full"
                  value={form.behavior.learning_style}
                  onChange={(e) => handleBehaviorChange('learning_style', e.target.value)}
                >
                  <option value="">Sélectionner le style d’apprentissage</option>
                  <option value="visual">Visuel</option>
                  <option value="practical">Pratique</option>
                  <option value="theoretical">Théorique</option>
                  <option value="mixed">Mixte</option>
                </select>
              </div>

              {/* CONTENT TYPE options */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Contenu préféré</span>
                </label>

                <select
                  className="select select-bordered bg-base-200 w-full"
                  value={form.behavior.preferred_content_type}
                  onChange={(e) => handleBehaviorChange('preferred_content_type', e.target.value)}
                >
                  <option value="">Sélectionner le contenu préféré</option>
                  <option value="quiz">Quiz</option>
                  <option value="video">Vidéo</option>
                  <option value="text">Texte</option>
                  <option value="mixed">Mixte</option>
                </select>
              </div>

              {/* comment not required */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Commentaire IA</span>
                </label>

                <TextArea
                  icon={MessageSquare}
                  value={form.behavior.comment || ''}
                  onChange={(v) => handleBehaviorChange('comment', v)}
                  placeholder="Commentaire IA"
                />
              </div>
            </div>
          )}
        </div>

        {/* action btns */}
        <div className="modal-action">
          {step > 1 && (
            <button className="btn" onClick={() => setStep(step - 1)}>
              Retour
            </button>
          )}

          {step < 4 ? (
            <button
              className="btn btn-primary"
              disabled={!canGoNext}
              onClick={() => setStep(step + 1)}
            >
              Suivant
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={handleSubmit}
              disabled={!canSave || isPending}
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-sm"></span>
                  Sauvegarde...
                </span>
              ) : (
                'Sauvegarder'
              )}
            </button>
          )}

          <button className="btn" onClick={handleClose}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};
