export function normalizeRuntime(runtime: number): string {
  const hours = Math.trunc(runtime / 60);
  const minutes = runtime - hours * 60;
  return `${hours}h ${minutes}m`;
}

export type TriggerBadgeLevel = 'none' | 'low' | 'medium' | 'high';

export function getTriggerBadgeLevel(triggerCount: number): TriggerBadgeLevel {
  if (triggerCount <= 0) return 'none';
  if (triggerCount <= 2) return 'low';
  if (triggerCount <= 5) return 'medium';
  return 'high';
}

export const capitalize = (value: string): string =>
  value.length ? value[0].toUpperCase() + value.slice(1) : value;
