import { RecommendationPanel } from '../../components/recommendations/RecommendationPanel';
import { resultsPageData } from '../../features/results/data/resultsData';

export default function Results() {
  return (
    <div className="p-4 md:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm">
          <h1 className="text-3xl font-bold">{resultsPageData.heading}</h1>
          <p className="mt-2 text-sm text-base-content/70">{resultsPageData.description}</p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm">
            <p className="text-sm font-semibold text-primary">
              {resultsPageData.kpis.successRate.title}
            </p>
            <h2 className="mt-3 text-2xl font-bold">{resultsPageData.kpis.successRate.value}</h2>
            <p className="mt-1 text-xs text-base-content/65">
              {resultsPageData.kpis.successRate.subtitle}
            </p>
            <div className="mt-4">
              <progress
                className="progress progress-primary w-full"
                value={resultsPageData.kpis.successRate.progress}
                max={100}
              />
            </div>
            <p className="mt-4 text-sm text-base-content/75">
              {resultsPageData.kpis.successRate.description}
            </p>
          </article>

          <article className="rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm">
            <p className="text-sm font-semibold text-primary">
              {resultsPageData.kpis.acquiredSkills.title}
            </p>
            <h2 className="mt-3 text-2xl font-bold">{resultsPageData.kpis.acquiredSkills.value}</h2>
            <p className="mt-1 text-xs text-base-content/65">
              {resultsPageData.kpis.acquiredSkills.subtitle}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {resultsPageData.kpis.acquiredSkills.tags?.map((tag) => (
                <span key={tag} className="badge badge-success badge-outline">
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-base-content/75">
              {resultsPageData.kpis.acquiredSkills.description}
            </p>
          </article>

          <article className="rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm">
            <p className="text-sm font-semibold text-primary">
              {resultsPageData.kpis.improvementTracks.title}
            </p>
            <h2 className="mt-3 text-2xl font-bold">
              {resultsPageData.kpis.improvementTracks.value}
            </h2>
            <p className="mt-1 text-xs text-base-content/65">
              {resultsPageData.kpis.improvementTracks.subtitle}
            </p>
            <p className="mt-4 text-sm text-base-content/75">
              {resultsPageData.kpis.improvementTracks.description}
            </p>
            <RecommendationPanel groups={resultsPageData.recommendations} />
          </article>
        </section>

        <section className="rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm">
          <h3 className="text-xl font-semibold">Feedback pédagogique</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {resultsPageData.feedbackBlocks.map((block) => (
              <div
                key={block.title}
                className="rounded-xl border border-base-300/70 bg-base-200/20 p-4"
              >
                <p className="text-sm font-semibold">{block.title}</p>
                <p className="mt-2 text-sm text-base-content/75">{block.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
