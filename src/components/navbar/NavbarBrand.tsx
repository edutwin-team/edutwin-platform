import { Link } from 'react-router-dom';

interface NavbarBrandProps {
  version: string;
}

export function NavbarBrand({ version }: NavbarBrandProps) {
  return (
    <div className="tooltip tooltip-bottom" data-tip={`Version ${version}`}>
      <Link to="/" className="inline-flex items-center gap-3">
        <img
          src="/logo_edutwin_brand.svg"
          alt="Logo EduTwin"
          className="h-14 w-auto object-contain"
        />
      </Link>
    </div>
  );
}
