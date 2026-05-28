import { ContextForm } from '../../components/contexts/ContextForm';
import { ContextHeader } from '../../components/contexts/ContextHeader';
import { ContextList } from '../../components/contexts/ContextList';

export const ContextPage = () => {
  return (
    <div className="p-6 space-y-6">
      <ContextHeader />

      <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-6">
        <div className="">
          <ContextList />
        </div>

        <div>
          <ContextForm />
        </div>
      </div>
    </div>
  );
};
