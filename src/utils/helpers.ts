export function normalizeRuntime(runtime: number): string {
  let hours = Math.trunc(runtime / 60);
  let minutes = runtime - hours * 60;
  return `${hours}h ${minutes}m`;
}
