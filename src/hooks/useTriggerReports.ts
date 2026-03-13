import { useQuery } from '@tanstack/react-query';

export function useTriggerReports() {
  return useQuery({
    queryKey: ['triggerReports'],
    queryFn: () => fetch('/api/trigger-reports').then((res) => res.json()),
  });
}
