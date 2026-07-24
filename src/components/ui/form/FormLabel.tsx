type FormLabelProps = {
  children: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
  className?: string;
};

export const RequiredMark = () => (
  <>
    <span className="text-error ml-0.5" aria-hidden="true">
      *
    </span>
    <span className="sr-only"> (obligatoire)</span>
  </>
);

export const FormLabel = ({ children, required, htmlFor, className }: FormLabelProps) => (
  <label htmlFor={htmlFor} className={className}>
    {children}
    {required && <RequiredMark />}
  </label>
);
