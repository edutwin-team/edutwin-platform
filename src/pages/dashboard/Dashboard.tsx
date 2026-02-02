export default function Dashboard() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">Dashboard Élève</h1>

      <p>
        Vue globale du parcours pédagogique de l’élève.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-200 p-4">
          <h2 className="font-semibold">Niveau estimé</h2>
          <p>Intermédiaire</p>
        </div>

        <div className="card bg-base-200 p-4">
          <h2 className="font-semibold">Quiz réalisés</h2>
          <p>3</p>
        </div>

        <div className="card bg-base-200 p-4">
          <h2 className="font-semibold">Axes de progrès</h2>
          <p>Logique, compréhension</p>
        </div>
      </div>
    </div>
  )
}
