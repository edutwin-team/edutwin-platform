export type EditableField =
  | 'first_name'
  | 'last_name'
  | 'educational_profile.school'
  | 'educational_profile.diploma'
  | 'educational_profile.experience_years';

export type EditState = {
  field: EditableField | null;
  values: Partial<Record<EditableField, string | number>>;
  error?: string;
};

export function Field({
  icon,
  label,
  value,
  field,
  edit,
  startEdit,
  handleChange,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number | undefined;
  field: EditableField;
  edit: EditState;
  startEdit: (field: EditableField, value: string | number) => void;
  handleChange: (field: EditableField, value: string) => void;
}) {
  const isEditing = edit.field === field;

  return (
    <div className="flex items-start justify-between py-3 gap-4">
      {/* LEFT */}
      <div className="flex items-start gap-3 flex-1">
        <div className="mt-1 text-base-content/60">{icon}</div>

        <div className="w-full">
          <p className="text-xs text-base-content/60">{label}</p>

          {!isEditing ? (
            <p className="font-medium leading-tight mt-0.5">{value || '-'}</p>
          ) : (
            <input
              className="input input-sm input-bordered w-full mt-1"
              value={edit.values[field] ?? value ?? ''}
              onChange={(e) => handleChange(field, e.target.value)}
            />
          )}
        </div>
      </div>

      {/* RIGHT ACTION (ALWAYS VISIBLE) */}
      {!isEditing && (
        <button onClick={() => startEdit(field, value ?? '')} className="btn btn-ghost btn-xs">
          Modifier
        </button>
      )}
    </div>
  );
}
