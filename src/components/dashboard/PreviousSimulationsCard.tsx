type Simulation = {
  title: string;
  date: string;
  score: number;
};

const simulations: Simulation[] = [
  {
    title: 'Math Final Exam',
    date: '2024-03-10',
    score: 82,
  },
  {
    title: 'Physics Quiz',
    date: '2024-03-08',
    score: 65,
  },
  {
    title: 'Chemistry Test',
    date: '2024-03-05',
    score: 91,
  },
];

const PreviousSimulationsCard = () => {
  return (
    <div
      className="
      p-6 rounded-3xl border
      bg-white border-gray-200 shadow-sm
      dark:bg-base-200 dark:border-base-300
    "
    >
      {/* Header */}
      <h3 className="text-lg font-semibold mb-4 dark:text-white">Previous Simulations</h3>

      {/* List */}
      <div className="flex flex-col gap-4">
        {simulations.map((sim, index) => {
          const isGood = sim.score >= 70;

          return (
            <div
              key={index}
              className="
                flex items-center justify-between
                p-3 rounded-xl
                hover:bg-gray-50
                dark:hover:bg-base-300
                transition
              "
            >
              {/* Left */}
              <div>
                <p className="font-medium dark:text-white">{sim.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{sim.date}</p>
              </div>

              {/* Right */}
              <div className="flex items-center gap-3">
                <span
                  className={`
                    text-sm font-semibold
                    ${isGood ? 'text-green-500' : 'text-red-500'}
                  `}
                >
                  {sim.score}%
                </span>

                <span
                  className={`
                    text-xs px-2 py-1 rounded-full
                    ${
                      isGood
                        ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
                    }
                  `}
                >
                  {isGood ? 'Success' : 'Fail'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <button
        className="
        mt-6 w-full py-3 rounded-xl
        bg-gray-100 hover:bg-gray-200
        dark:bg-base-300 dark:hover:bg-base-100
        transition
      "
      >
        View All Simulations →
      </button>
    </div>
  );
};

export default PreviousSimulationsCard;
