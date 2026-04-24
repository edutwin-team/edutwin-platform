import StatCard from '../../components/dashboard/StatCard';
import { Users, FileText, Brain, TrendingUp } from 'lucide-react';
import SuccessRatesCard from '../../components/dashboard/SuccessRatesCard';
import ActiveTwinsCard from '../../components/dashboard/ActiveTwinsCard';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
          <p className="text-gray-500">Welcome back, Professor. Here's your simulation overview.</p>
        </div>

        <Link to={'/quiz'} className="btn btn-primary rounded-xl shadow-md">
          + Generate QCM
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Digital Twins"
          value="3"
          icon={<Users className="w-5 h-5 text-blue-600" />}
          bgColor="bg-blue-100"
        />

        <StatCard
          title="Simulated Exams"
          value="24"
          icon={<FileText className="w-5 h-5 text-purple-600" />}
          bgColor="bg-purple-100"
        />

        <StatCard
          title="AI QCM Generated"
          value="1"
          icon={<Brain className="w-5 h-5 text-indigo-600" />}
          bgColor="bg-indigo-100"
        />

        <StatCard
          title="Avg Success Rate"
          value="72%"
          icon={<TrendingUp className="w-5 h-5 text-green-600" />}
          bgColor="bg-green-100"
        />
      </div>
      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="col-span-2">
          <SuccessRatesCard />
        </div>

        <div className="col-span-1">
          <ActiveTwinsCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
