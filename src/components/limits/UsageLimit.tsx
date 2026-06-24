import { getUsageLimitMessage, type UsageLimitState } from '../../features/limits/usageLimits';

type UsageLimitBadgeProps = {
  usage: UsageLimitState;
};

export function UsageLimitBadge({ usage }: UsageLimitBadgeProps) {
  return (
    <span className={`badge badge-sm ${usage.isLimitReached ? 'badge-warning' : 'badge-outline'}`}>
      {usage.current}/{usage.max} {usage.label}
    </span>
  );
}

type UsageLimitAlertProps = {
  usage: UsageLimitState;
};

export function UsageLimitAlert({ usage }: UsageLimitAlertProps) {
  if (!usage.isLimitReached) return null;

  return (
    <div className="alert alert-warning text-sm">
      <span>{getUsageLimitMessage(usage)}</span>
    </div>
  );
}

type UsageLimitHintProps = {
  usage: UsageLimitState;
};

export function UsageLimitHint({ usage }: UsageLimitHintProps) {
  if (usage.isLimitReached) return null;

  return <p className="text-xs text-base-content/60">{getUsageLimitMessage(usage)}</p>;
}
