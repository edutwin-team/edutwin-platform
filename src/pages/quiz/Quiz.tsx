export default function Quiz() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">Quiz adaptatif</h1>

      <p>
        Le quiz est généré dynamiquement en fonction du profil
        du jumeau numérique de l’élève.
      </p>

      <p>
        L’IA ajuste :
      </p>

      <ul className="list-disc pl-6">
        <li>La difficulté des questions</li>
        <li>Les thématiques abordées</li>
        <li>Le niveau de feedback</li>
      </ul>
    </div>
  )
}
