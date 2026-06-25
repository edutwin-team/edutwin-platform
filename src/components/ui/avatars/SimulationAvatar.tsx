import { createAvatar } from '@dicebear/core';
import { botttsNeutral } from '@dicebear/collection';

interface Props {
  simulationId: number;
  size?: number;
}

const SimulationAvatar: React.FC<Props> = ({ simulationId, size = 56 }) => {
  const seed = `simulation-${simulationId}`;

  const avatar = createAvatar(botttsNeutral, {
    seed,
    backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc'],
  }).toDataUri();

  return (
    <img
      src={avatar}
      alt="simulation-avatar"
      width={size}
      height={size}
      className="rounded-xl border border-base-300 bg-base-100 shadow-sm"
    />
  );
};

export default SimulationAvatar;
