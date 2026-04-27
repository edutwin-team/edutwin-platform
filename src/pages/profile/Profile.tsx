import { profilePageData } from '../../features/profile/data/profileData';

export default function Profile() {
  return (
    <div className="p-4 md:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm">
          <h1 className="text-3xl font-bold">{profilePageData.heading}</h1>
          <p className="mt-2 text-sm text-base-content/70">{profilePageData.description}</p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm">
            <p className="text-sm font-semibold text-primary">Niveau académique</p>
            <h2 className="mt-3 text-2xl font-bold">{profilePageData.academic.level}</h2>
            <p className="mt-1 text-xs text-base-content/65">{profilePageData.academic.subtitle}</p>
            <div className="mt-4 space-y-2 text-sm text-base-content/75">
              {profilePageData.academic.scores.map((score) => (
                <p key={score.label}>
                  {score.label} : {score.value}
                </p>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm">
            <p className="text-sm font-semibold text-primary">Préférences d’apprentissage</p>
            <h2 className="mt-3 text-2xl font-bold">{profilePageData.preferences.profileLabel}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {profilePageData.preferences.tags.map((tag) => (
                <span key={tag.label} className="badge badge-outline">
                  {tag.label}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-base-content/75">
              {profilePageData.preferences.description}
            </p>
          </article>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm">
            <p className="text-sm font-semibold text-primary">Difficultés récurrentes</p>
            <div className="mt-4 space-y-3 text-sm">
              {profilePageData.recurringDifficulties.map((difficulty) => (
                <div
                  key={difficulty.title}
                  className={`rounded-xl p-3 ${
                    difficulty.tone === 'error'
                      ? 'border border-error/35 bg-error/10'
                      : 'border border-warning/35 bg-warning/10'
                  }`}
                >
                  <p className="font-semibold">{difficulty.title}</p>
                  <p className="mt-1 text-base-content/75">{difficulty.description}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm">
            <p className="text-sm font-semibold text-primary">Historique des évaluations</p>
            <div className="mt-4 overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Évaluation</th>
                    <th>Date</th>
                    <th>Score</th>
                    <th>Tendance</th>
                  </tr>
                </thead>
                <tbody>
                  {profilePageData.evaluationHistory.map((item) => (
                    <tr key={`${item.title}-${item.date}`}>
                      <td>{item.title}</td>
                      <td>{item.date}</td>
                      <td>{item.score}</td>
                      <td
                        className={item.trendTone === 'success' ? 'text-success' : 'text-warning'}
                      >
                        {item.trend}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
