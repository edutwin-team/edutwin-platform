interface AuthActionsProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export function AuthActions({ onLoginClick, onRegisterClick }: AuthActionsProps) {
  return (
    <>
      <button onClick={onLoginClick} className="btn btn-outline btn-sm rounded-2xl normal-case">
        Connexion
      </button>

      <button onClick={onRegisterClick} className="btn btn-success btn-sm rounded-2xl normal-case">
        S'inscrire
      </button>
    </>
  );
}
