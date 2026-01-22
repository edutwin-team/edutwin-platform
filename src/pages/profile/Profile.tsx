export default function Profile() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">Profil Élève</h1>

      <p>
        Cette page représente le jumeau numérique de l’élève.
        Les données affichées serviront à personnaliser les contenus générés par IA.
      </p>

      <ul className="list-disc pl-6">
        <li>Niveau académique</li>
        <li>Préférences d’apprentissage</li>
        <li>Difficultés récurrentes</li>
        <li>Historique des évaluations</li>
      </ul>
    </div>
  )
}
