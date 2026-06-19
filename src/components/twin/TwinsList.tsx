import type { DigitalTwin } from '../../types/types';
import TwinCard from './TwinCard';

type TwinListProps = {
  twins: DigitalTwin[];
  onEdit: (twin: DigitalTwin) => void;
};

const TwinsList: React.FC<TwinListProps> = ({ twins, onEdit }) => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 items-start">
      {twins.map((twin) => (
        <TwinCard key={twin.id} twin={twin} onEdit={() => onEdit(twin)} />
      ))}
    </div>
  );
};

export default TwinsList;
