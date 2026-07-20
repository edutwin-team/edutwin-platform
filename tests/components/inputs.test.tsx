import { fireEvent, render, screen } from '@testing-library/react';
import { Mail, MessageSquare } from 'lucide-react';

import { Input, TextArea } from '../../src/components/ui/form/inputs';

describe('Input', () => {
  it('affiche la valeur et propage les changements', () => {
    const onChange = vi.fn();

    render(<Input icon={Mail} value="test@example.com" onChange={onChange} placeholder="Email" />);

    const input = screen.getByPlaceholderText('Email');
    expect(input).toHaveValue('test@example.com');

    fireEvent.change(input, { target: { value: 'nouveau@example.com' } });
    expect(onChange).toHaveBeenCalledWith('nouveau@example.com');
  });
});

describe('TextArea', () => {
  it('affiche la valeur et propage les changements', () => {
    const onChange = vi.fn();

    render(
      <TextArea icon={MessageSquare} value="Description initiale" onChange={onChange} placeholder="Description" />
    );

    const textarea = screen.getByPlaceholderText('Description');
    expect(textarea).toHaveValue('Description initiale');

    fireEvent.change(textarea, { target: { value: 'Nouvelle description' } });
    expect(onChange).toHaveBeenCalledWith('Nouvelle description');
  });
});
