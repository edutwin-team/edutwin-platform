export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      <h1 className="text-4xl font-bold">
        Jumeaux numériques pour l’éducation
      </h1>

      <p className="text-lg">
        Ce projet vise à utiliser l’intelligence artificielle pour améliorer
        la qualité des supports pédagogiques à travers des jumeaux numériques
        d’élèves.
      </p>

      <ul className="list-disc pl-6 space-y-1">
        <li>Analyse du profil et du comportement de l’élève</li>
        <li>Génération de quiz adaptatifs</li>
        <li>Amélioration continue des contenus pédagogiques</li>
      </ul>
    </div>
  )
}
