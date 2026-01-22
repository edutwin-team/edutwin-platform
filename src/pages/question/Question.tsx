export default function Question() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">Question en cours</h1>

      <p>
        Cette page affichera une question issue du QCM généré par IA.
      </p>

      <div className="card bg-base-200 p-4">
        <p className="font-semibold">
          Exemple : Qu’est-ce qu’un jumeau numérique ?
        </p>
      </div>
    </div>
  )
}
