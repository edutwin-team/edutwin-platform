import StatCard from '../../components/dashboard/StatCard';
import {
  Users,
  FileText,
  Brain,
  TrendingUp,
} from 'lucide-react';

import SuccessRatesCard from '../../components/dashboard/SuccessRatesCard';
import ActiveTwinsCard from '../../components/dashboard/ActiveTwinsCard';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-full w-full overflow-x-hidden p-4 sm:p-5 lg:p-6">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 rounded-2xl border border-base-300/60 bg-base-100 p-5 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold sm:text-3xl">
              Teacher Dashboard
            </h1>

            <p className="mt-1 text-sm text-base-content/60 sm:text-base">
              Welcome back, Professor. Here&apos;s your simulation overview.
            </p>
          </div>

          <Link
            to="/content"
            className="btn btn-primary w-full rounded-xl shadow-md md:w-auto"
          >
            + Contenu pédagogique
          </Link>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
        </div>

        {/* Charts section */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="min-w-0 xl:col-span-2">
            <SuccessRatesCard />
          </div>

          <div className="min-w-0 xl:col-span-1">
            <ActiveTwinsCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;