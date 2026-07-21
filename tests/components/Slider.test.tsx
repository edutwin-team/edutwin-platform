import { fireEvent, render, screen } from '@testing-library/react';
import { Gauge } from 'lucide-react';

import { Slider } from '../../src/components/ui/stats/Slider';

describe('Slider', () => {
  it('affiche le libellé et la valeur', () => {
    render(<Slider label="Progression" value={75} onChange={vi.fn()} icon={Gauge} />);

    expect(screen.getByText('Progression')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('appelle onChange lors du déplacement', () => {
    const onChange = vi.fn();
    render(<Slider label="Score" value={40} onChange={onChange} />);

    fireEvent.change(screen.getByRole('slider'), { target: { value: '55' } });

    expect(onChange).toHaveBeenCalledWith(55);
  });

  it.each([
    [85, 'success'],
    [50, 'warning'],
    [20, 'error'],
  ] as const)('applique le style %s pour la valeur %s', (value, expectedClass) => {
    render(<Slider label="Niveau" value={value} onChange={vi.fn()} />);
    expect(screen.getByText(`${value}%`)).toHaveClass(`text-${expectedClass}`);
  });
});
