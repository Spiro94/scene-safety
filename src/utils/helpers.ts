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

export function dateAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
}
