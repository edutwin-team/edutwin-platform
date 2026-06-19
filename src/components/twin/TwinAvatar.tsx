import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';

interface Props {
  seed: string;
  size?: number;
}
//todo use library for authenticated user logo

const TwinAvatar: React.FC<Props> = ({ seed, size = 56 }) => {
  const avatar = createAvatar(identicon, {
    seed,
    backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9'],
  }).toDataUri();

  return (
    <img
      src={avatar}
      alt={seed}
      width={size}
      height={size}
      className="rounded-xl border border-base-300 bg-base-100 shadow-sm"
    />
  );
};

export default TwinAvatar;
