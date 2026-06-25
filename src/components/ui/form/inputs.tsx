import type { LucideIcon } from 'lucide-react';
type InputProps = {
  icon: LucideIcon;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
};
type TextAreaProps = {
  icon: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const Input = ({ icon: Icon, value, onChange, placeholder, type = 'text' }: InputProps) => (
  <div className="flex items-center gap-2 input input-bordered bg-base-200 w-full">
    <Icon size={16} className="text-primary" />
    <input
      type={type}
      className="w-full bg-transparent outline-none"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export const TextArea = ({ icon: Icon, value, onChange, placeholder }: TextAreaProps) => (
  <div className="textarea textarea-bordered bg-base-200 flex gap-2 w-full">
    <Icon size={16} className="text-primary mt-1" />
    <textarea
      className="w-full bg-transparent outline-none"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);
