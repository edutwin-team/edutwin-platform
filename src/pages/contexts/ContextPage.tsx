import { useState } from 'react';
import { ContextForm } from '../../components/contexts/ContextForm';
import { ContextHeader } from '../../components/contexts/ContextHeader';
import { ContextList } from '../../components/contexts/ContextList';
import type { Context } from '../../types/types';

export const ContextPage = () => {
  const [selectedContext, setSelectedContext] = useState<Context | null>(null);
  return (
    <div className="p-6 space-y-6">
      <ContextHeader />

      <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-6">
        <div className="">
          <ContextList onEdit={setSelectedContext} />
        </div>

        <div>
          <ContextForm
            key={selectedContext?.id ?? 'new'}
            context={selectedContext}
            onCancelEdit={() => setSelectedContext(null)}
          />
        </div>
      </div>
    </div>
  );
};
