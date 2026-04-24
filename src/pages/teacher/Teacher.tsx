import { RecommendationPanel } from "../../components/recommendations/RecommendationPanel";
import { teacherPageData } from "../../features/teacher/data/teacherData";

export default function Teacher() {
  return (
    <div className="p-4 md:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm">
          <h1 className="text-3xl font-bold">{teacherPageData.heading}</h1>
          <p className="mt-2 text-sm text-base-content/70">{teacherPageData.description}</p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="teacher-kpi-card rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm">
            <p className="text-sm font-semibold text-primary">{teacherPageData.kpis.studentPerformance.title}</p>
            <h2 className="teacher-kpi-value mt-3 text-2xl font-bold">{teacherPageData.kpis.studentPerformance.value}</h2>
            <p className="mt-1 text-xs text-base-content/65">{teacherPageData.kpis.studentPerformance.subtitle}</p>
            <div className="mt-4">
              <progress className="progress progress-primary w-full" value={teacherPageData.kpis.studentPerformance.progress} max={100} />
            </div>
            <p className="mt-4 text-sm text-base-content/75">{teacherPageData.kpis.studentPerformance.description}</p>
          </article>

          <article className="teacher-kpi-card teacher-kpi-card-delay-2 rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm">
            <p className="text-sm font-semibold text-primary">{teacherPageData.kpis.questionQuality.title}</p>
            <h2 className="teacher-kpi-value mt-3 text-2xl font-bold">{teacherPageData.kpis.questionQuality.value}</h2>
            <p className="mt-1 text-xs text-base-content/65">{teacherPageData.kpis.questionQuality.subtitle}</p>
            <div className="mt-4 flex items-center gap-1 text-2xl leading-none">
              <span className="text-warning">{"★".repeat(teacherPageData.kpis.questionQuality.stars ?? 0)}</span>
              <span className="text-warning/40">★</span>
              <span className="ml-2 text-xs font-medium text-base-content/70">Très bon niveau global</span>
            </div>
            <p className="mt-4 text-sm text-base-content/75">{teacherPageData.kpis.questionQuality.description}</p>
          </article>

          <article className="teacher-kpi-card teacher-kpi-card-delay-3 rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm">
            <p className="text-sm font-semibold text-primary">{teacherPageData.kpis.contentAdjustment.title}</p>
            <h2 className="teacher-kpi-value mt-3 text-2xl font-bold">{teacherPageData.kpis.contentAdjustment.value}</h2>
            <p className="mt-1 text-xs text-base-content/65">{teacherPageData.kpis.contentAdjustment.subtitle}</p>
            <p className="mt-4 text-sm text-base-content/75">{teacherPageData.kpis.contentAdjustment.description}</p>
            <RecommendationPanel groups={teacherPageData.recommendations} className="mt-4" />
          </article>
        </section>

        <section className="rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm">
          <h3 className="text-xl font-semibold">Plan d’action enseignant</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {teacherPageData.actionSteps.map((step) => (
              <div key={step.title} className="rounded-xl border border-base-300/70 bg-base-200/20 p-4">
                <p className="text-sm font-semibold">{step.title}</p>
                <p className="mt-2 text-sm text-base-content/75">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
