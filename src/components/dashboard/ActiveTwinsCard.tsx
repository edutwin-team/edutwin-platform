import { Link } from 'react-router-dom';

type Twin = {
  name: string;
  description: string;
  score: string;
  avatar: string;
};

const twins: Twin[] = [
  {
    name: 'Alex Johnson',
    description: 'Focused and analytical',
    score: '95% Att.',
    avatar: 'https://i.pravatar.cc/40?img=1',
  },
  {
    name: 'Sarah Smith',
    description: 'Creative but easily distracted',
    score: '70% Att.',
    avatar: 'https://i.pravatar.cc/40?img=2',
  },
  {
    name: 'Michael Chen',
    description: 'Highly motivated overachiever',
    score: '100% Att.',
    avatar: 'https://i.pravatar.cc/40?img=3',
  },
];

const ActiveTwinsCard = () => {
  return (
    <div
      className="
      p-6 rounded-3xl border
      bg-white border-gray-200 shadow-sm
      dark:bg-base-200 dark:border-base-300
    "
    >
      {/* Header */}
      <h3 className="text-lg font-semibold mb-4 dark:text-white">Active Twins</h3>

      {/* List */}
      <div className="flex flex-col gap-4">
        {twins.map((twin, index) => (
          <div key={index} className="flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-3">
              <img src={twin.avatar} alt={twin.name} className="w-10 h-10 rounded-full" />

              <div>
                <p className="font-bold dark:text-white">{twin.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{twin.description}</p>
              </div>
            </div>

            {/* Right */}
            <span className="text-sm font-semibold text-primary">{twin.score}</span>
          </div>
        ))}
      </div>

      {/* Footer Button */}
      <Link
        to="/twins"
        className="
    block text-center
    mt-6 w-full py-3 rounded-xl
    bg-gray-100 hover:bg-gray-200
    dark:bg-base-300 dark:hover:bg-base-100
    transition
  "
      >
        Manage All Twins →
      </Link>
    </div>
  );
};

export default ActiveTwinsCard;
