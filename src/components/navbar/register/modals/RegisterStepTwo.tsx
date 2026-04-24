type StepTwoProps = {
  degree: string;
  setDegree: (v: string) => void;
  university: string;
  setUniversity: (v: string) => void;
  setDocument: (file: File | null) => void;
};

export const RegisterStepTwo = ({
  degree,
  setDegree,
  university,
  setUniversity,
  setDocument,
}: StepTwoProps) => {
  return (
    <div className="space-y-5">
      <span className="auth-header-badge">Informations académiques</span>
      <h1 className="auth-title">Profil académique</h1>

      <input
        type="text"
        placeholder="Diplôme"
        value={degree}
        onChange={(e) => setDegree(e.target.value)}
        className="input input-bordered w-full"
      />

      <input
        type="text"
        placeholder="Université"
        value={university}
        onChange={(e) => setUniversity(e.target.value)}
        className="input input-bordered w-full"
      />

      <input
        type="file"
        onChange={(e) => setDocument(e.target.files ? e.target.files[0] : null)}
        className="file-input file-input-bordered w-full"
      />
    </div>
  );
};
