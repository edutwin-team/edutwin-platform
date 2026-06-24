import { useContexts } from '../../hooks/twins/useContexts';
import { useUsageLimit } from '../../hooks/limits/useUsageLimit';
import { UsageLimitBadge, UsageLimitHint } from '../limits/UsageLimit';

export const ContextHeader = () => {
  const { data: contexts } = useContexts();
  const contextUsage = useUsageLimit('contexts', contexts?.length ?? 0);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold">Contextes Pédagogiques</h1>
        <p className="text-gray-500">Gérez les contextes pour vos simulations éducatives.</p>
        <div className="mt-2">
          <UsageLimitHint usage={contextUsage} />
        </div>
      </div>

      <UsageLimitBadge usage={contextUsage} />
    </div>
  );
};
