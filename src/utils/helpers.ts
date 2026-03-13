export function normalizeRuntime(runtime: number): string {
  const hours = Math.trunc(runtime / 60);
  const minutes = runtime - hours * 60;
  return `${hours}h ${minutes}m`;
}

export type TriggerBadgeLevel = 'none' | 'low' | 'medium' | 'high';

//TODO: Logic should change, currently is based on the number of reports, but it should be based on the calification of the reports
export function getTriggerBadgeLevel(triggerCount: number): TriggerBadgeLevel {
  if (triggerCount <= 0) return 'none';
  if (triggerCount <= 2) return 'low';
  if (triggerCount <= 5) return 'medium';
  return 'high';
}

export const capitalize = (value: string): string =>
  value.length ? value[0].toUpperCase() + value.slice(1) : value;

export const badgeStyles = {
  low: 'bg-accent-teal-muted text-accent-teal',
  medium: 'bg-accent-amber-muted text-accent-amber',
  high: 'bg-accent-red-muted text-accent-red',
} as const;

export const badgeLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
} as const;
