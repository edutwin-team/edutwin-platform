import StatCard from '../../components/ui/stats/StatCard';
import { Layers, PlayCircle, ClipboardList, BookOpen } from 'lucide-react';
import SimulationsChart from '../../components/dashboard/SimulationsChart';
import LatestTwinsCard from '../../components/dashboard/LatestTwinsCard';
import { Link } from 'react-router-dom';
import { useDashboard } from '../../hooks/dashboard/useDashboard';
import { SimpleLoader } from '../../components/ui/loaders/SimpleLoader';

const Dashboard = () => {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return <SimpleLoader />;
  }

  const stats = data?.counts;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord enseignant</h1>

          <p className="text-gray-500">Bienvenue. Voici l’aperçu de vos simulations.</p>
        </div>

        <Link to="/contexts" className="btn btn-primary rounded-xl shadow-md">
          + Contextes pédagogiques
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Jumeaux numériques"
          value={stats?.twins ?? 0}
          icon={<Layers className="w-5 h-5 text-blue-600" />}
          bgColor="bg-blue-100"
        />

        <StatCard
          title="Simulations"
          value={stats?.simulations ?? 0}
          icon={<PlayCircle className="w-5 h-5 text-purple-600" />}
          bgColor="bg-purple-100"
        />

        <StatCard
          title="QCM créés"
          value={stats?.quizzes ?? 0}
          icon={<ClipboardList className="w-5 h-5 text-indigo-600" />}
          bgColor="bg-indigo-100"
        />

        <StatCard
          title="Contextes pédagogiques"
          value={stats?.contexts ?? 0}
          icon={<BookOpen className="w-5 h-5 text-green-600" />}
          bgColor="bg-green-100"
        />
      </div>

      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="col-span-2">
          <SimulationsChart data={data?.weekly_simulations ?? []} />
        </div>

        <div className="col-span-1">
          <LatestTwinsCard twins={data?.last_twins ?? []} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
