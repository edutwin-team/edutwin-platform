import { useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { useUpdateMe } from '../../hooks/user/useUpdateMe';
import { User, Mail, School, BookOpen, Briefcase } from 'lucide-react';
import { RoleBadge } from '../../components/profile/RoleBadge';
import { Field, type EditableField, type EditState } from '../../components/profile/UserField';

//dont allow special caracters
const textRegex = /^[a-zA-ZÀ-ÿ0-9\s\-']*$/;

export default function EspaceUtilisateur() {
  const { user } = useAuth();
  const { mutate: updateUser } = useUpdateMe();

  const [edit, setEdit] = useState<EditState>({
    field: null,
    values: {},
  });

  if (!user) return <div className="p-6">Chargement...</div>;

  const startEdit = (field: EditableField, value: string | number) => {
    setEdit({
      field,
      values: { [field]: value },
      error: undefined,
    });
  };

  const handleChange = (field: EditableField, value: string) => {
    if (!textRegex.test(value)) {
      setEdit((p) => ({ ...p, error: 'Caractères non autorisés' }));
      return;
    }

    setEdit((p) => ({
      ...p,
      values: { ...p.values, [field]: value },
      error: undefined,
    }));
  };

  const cancel = () => {
    setEdit({ field: null, values: {} });
  };

  const save = () => {
    if (edit.error || !edit.field) return;

    const payload: Record<string, unknown> = {};

    for (const key in edit.values) {
      const value = edit.values[key as EditableField];

      if (key.includes('educational_profile.')) {
        const sub = key.split('.')[1];

        payload.educational_profile = {
          ...(payload.educational_profile as object),
          [sub]: value,
        };
      } else {
        payload[key] = value;
      }
    }

    updateUser(payload);
    cancel();
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto">
      {/* header */}
      <section className="rounded-3xl border border-base-300/60 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 p-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          {/* left */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
              Espace utilisateur
            </p>

            <h1 className="text-3xl font-bold">Gestion de votre profil utilisateur</h1>

            <p className="text-base-content/70 mt-2 max-w-2xl">
              Modifiez vos informations personnelles et votre parcours académique en toute
              simplicité.
            </p>
          </div>

          {/* right */}
          <div className="flex items-center gap-6 rounded-2xl bg-base-100 px-5 py-4 shadow-sm">
            <div>
              <p className="text-xs text-base-content/60">Rôle</p>
              <div className="mt-1">
                <RoleBadge role={user.role} />
              </div>
            </div>

            <div className="h-10 w-px bg-base-300" />

            <div>
              <p className="text-xs text-base-content/60">Statut</p>
              <p className="text-xl font-bold text-success">Actif</p>
            </div>
          </div>
        </div>
      </section>

      {/* main grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* personal info */}
        <Card title="Informations personnelles">
          <Field
            icon={<User size={16} className="text-base-content/60" />}
            label="Prénom"
            field="first_name"
            value={user.first_name}
            edit={edit}
            startEdit={startEdit}
            handleChange={handleChange}
          />

          <Field
            icon={<User size={16} className="text-base-content/60" />}
            label="Nom"
            field="last_name"
            value={user.last_name}
            edit={edit}
            startEdit={startEdit}
            handleChange={handleChange}
          />

          {/* email not allowed to modfiy*/}
          <div className="flex items-center justify-between gap-3 py-2">
            <div className="flex items-center gap-2 flex-1">
              <Mail size={16} className="text-base-content/60" />

              <div className="w-full">
                <p className="text-xs text-base-content/60">Email</p>

                <div className="flex items-center gap-2">
                  <span className="font-medium">{user.email}</span>
                  <span className="text-xs text-warning">(non modifiable)</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* education profile data */}
        <Card title="Profil éducatif">
          <Field
            icon={<School size={16} className="text-base-content/60" />}
            label="École"
            field="educational_profile.school"
            value={user.educational_profile?.school}
            edit={edit}
            startEdit={startEdit}
            handleChange={handleChange}
          />

          <Field
            icon={<BookOpen size={16} className="text-base-content/60" />}
            label="Diplôme"
            field="educational_profile.diploma"
            value={user.educational_profile?.diploma}
            edit={edit}
            startEdit={startEdit}
            handleChange={handleChange}
          />

          <Field
            icon={<Briefcase size={16} className="text-base-content/60" />}
            label="Expérience"
            field="educational_profile.experience_years"
            value={user.educational_profile?.experience_years ?? ''}
            edit={edit}
            startEdit={startEdit}
            handleChange={handleChange}
          />
        </Card>
      </div>

      {/* actions */}
      {edit.field && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-base-100 shadow-lg border border-base-300 rounded-2xl px-4 py-3 flex items-center gap-3">
          <button onClick={save} className="btn btn-primary btn-sm">
            Sauvegarder
          </button>

          <button onClick={cancel} className="btn btn-ghost btn-sm">
            Annuler
          </button>

          {edit.error && <span className="text-error text-sm ml-2">{edit.error}</span>}
        </div>
      )}
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-base-100 p-6 shadow-sm space-y-4">
      <h2 className="font-semibold text-primary">{title}</h2>
      {children}
    </div>
  );
}
