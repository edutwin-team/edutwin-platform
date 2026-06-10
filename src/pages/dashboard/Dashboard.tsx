import { Link } from 'react-router-dom';
import { Brain, FileText, Sparkles, TrendingUp, Users, Wand2 } from 'lucide-react';
import StatCard from '../../components/dashboard/StatCard';
import SuccessRatesCard from '../../components/dashboard/SuccessRatesCard';
import ActiveTwinsCard from '../../components/dashboard/ActiveTwinsCard';

const Dashboard = () => {
  return (
    <main className="relative min-h-full w-full overflow-x-hidden p-4 sm:p-5 lg:p-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="dashboard-orb dashboard-orb-one" />
        <div className="dashboard-orb dashboard-orb-two" />
      </div>

      <div className="relative mx-auto flex w-full max-w-screen-2xl flex-col gap-6">
        <section className="dashboard-hero overflow-hidden rounded-[2rem] border border-white/10 p-5 shadow-2xl shadow-indigo-950/10 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/85 backdrop-blur-xl">
                <Sparkles className="h-3.5 w-3.5 text-cyan-200" />
                EduTwin AI Platform
              </div>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Teacher Dashboard
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
                Suivez les jumeaux numériques, analysez les performances et générez du contenu
                pédagogique intelligent depuis une interface moderne.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                to="/content"
                className="btn border-0 bg-white text-slate-950 shadow-xl hover:bg-white/90"
              >
                <Wand2 className="h-4 w-4" />
                Contenu pédagogique
              </Link>

              <Link
                to="/simulation"
                className="btn border-white/20 bg-white/10 text-white backdrop-blur-xl hover:bg-white/15"
              >
                Lancer une simulation
              </Link>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              ['+12%', 'Progression moyenne'],
              ['24', 'Simulations lancées'],
              ['3', 'Jumeaux actifs'],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/10 p-4 text-white backdrop-blur-xl"
              >
                <p className="text-2xl font-black">{value}</p>
                <p className="mt-1 text-xs text-white/60">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Digital Twins"
            value="3"
            icon={<Users className="h-5 w-5 text-blue-600" />}
            bgColor="bg-blue-100"
          />

          <StatCard
            title="Simulated Exams"
            value="24"
            icon={<FileText className="h-5 w-5 text-purple-600" />}
            bgColor="bg-purple-100"
          />

          <StatCard
            title="AI QCM Generated"
            value="1"
            icon={<Brain className="h-5 w-5 text-indigo-600" />}
            bgColor="bg-indigo-100"
          />

          <StatCard
            title="Avg Success Rate"
            value="72%"
            icon={<TrendingUp className="h-5 w-5 text-green-600" />}
            bgColor="bg-green-100"
          />
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="glass-panel min-w-0 xl:col-span-2">
            <SuccessRatesCard />
          </div>

          <div className="glass-panel min-w-0 xl:col-span-1">
            <ActiveTwinsCard />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
