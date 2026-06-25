import { createAvatar } from '@dicebear/core';
import { shapes } from '@dicebear/collection';

interface Props {
  seed: string;
  size?: number;
}

const QuizAvatar: React.FC<Props> = ({ seed, size = 56 }) => {
  const avatar = createAvatar(shapes, {
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

export default QuizAvatar;
