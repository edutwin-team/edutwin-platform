import { Link } from 'react-router-dom';

import { EduTwinLogo } from './EduTwinLogo';

interface NavbarBrandProps {
  version: string;
}

export function NavbarBrand({ version }: NavbarBrandProps) {
  return (
    <div className="tooltip tooltip-bottom" data-tip={`Version ${version}`}>
      <Link to="/" className="inline-flex items-center gap-3">
        <EduTwinLogo className="h-14 w-auto" />
      </Link>
    </div>
  );
}
