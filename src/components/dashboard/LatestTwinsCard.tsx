import { Link } from 'react-router-dom';
import TwinAvatar from '../twin/TwinAvatar';

type Twin = {
  id: number;
  name: string;
  description: string | null;
  average_grade: number;
};

type Props = {
  twins: Twin[];
};

const LatestTwinsCard = ({ twins }: Props) => {
  return (
    <div
      className="
      p-6 rounded-3xl border
      bg-white border-gray-200 shadow-sm
      dark:bg-base-200 dark:border-base-300
    "
    >
      <h3 className="text-lg font-semibold mb-4 dark:text-white">Derniers jumeaux</h3>

      <div className="flex flex-col gap-4">
        {twins.map((twin) => (
          <div key={twin.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TwinAvatar seed={`twin-${twin.id}`} size={56} />

              <div>
                <p className="font-bold dark:text-white">{twin.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {twin.description || 'No description'}
                </p>
              </div>
            </div>

            <span
              className={`badge badge-sm ${
                twin.average_grade >= 15
                  ? 'badge-success'
                  : twin.average_grade >= 10
                    ? 'badge-warning'
                    : 'badge-error'
              }`}
            >
              {twin.average_grade}/20
            </span>
          </div>
        ))}
      </div>

      <Link
        to="/twins"
        className="block text-center mt-6 w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-base-300 dark:hover:bg-base-100 transition"
      >
        Gérer vos jumeaux →
      </Link>
    </div>
  );
};

export default LatestTwinsCard;
