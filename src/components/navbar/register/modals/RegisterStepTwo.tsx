type StepTwoProps = {
  diploma: string;
  setDiploma: (v: string) => void;

  school: string;
  setSchool: (v: string) => void;

  institutionType: string;
  setInstitutionType: (v: string) => void;

  educationLevel: string;
  setEducationLevel: (v: string) => void;

  experienceYears: string;
  setExperienceYears: (v: string) => void;
};

export const RegisterStepTwo = ({
  diploma,
  setDiploma,
  school,
  setSchool,
  institutionType,
  setInstitutionType,

  educationLevel,
  setEducationLevel,
  experienceYears,
  setExperienceYears,
}: StepTwoProps) => {
  return (
    <div className="space-y-5">
      <span className="auth-header-badge">Profil enseignant</span>
      <h1 className="auth-title">Informations pédagogiques</h1>

      <input
        type="text"
        placeholder="Diplôme (ex: Master Informatique)"
        value={diploma}
        onChange={(e) => setDiploma(e.target.value)}
        className="input input-bordered w-full required:bg-amber-200"
      />

      <input
        type="text"
        placeholder="École / Université"
        value={school}
        onChange={(e) => setSchool(e.target.value)}
        className="input input-bordered w-full"
      />

      <select
        value={institutionType}
        onChange={(e) => setInstitutionType(e.target.value)}
        className="input input-bordered w-full"
      >
        <option value="">Type d'établissement</option>
        <option value="universite">Université</option>
        <option value="ecole">École</option>
        <option value="lycee">Lycée</option>
      </select>

      <input
        type="text"
        placeholder="Niveau d'études (ex: Bac+5)"
        value={educationLevel}
        onChange={(e) => setEducationLevel(e.target.value)}
        className="input input-bordered w-full"
      />

      <input
        type="number"
        placeholder="Années d'expérience"
        value={experienceYears}
        onChange={(e) => setExperienceYears(e.target.value)}
        className="input input-bordered w-full"
      />
    </div>
  );
};
