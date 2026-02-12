import { useQuery } from '@tanstack/react-query';
import { getTriggerReportCounts } from '../api/supabase';

export function useTriggerReportCounts(movieIds: string[]) {
  const ids = [...new Set(movieIds.filter(Boolean))].sort();

  return useQuery({
    queryKey: ['triggerReportCounts', ids],
    queryFn: () => getTriggerReportCounts(ids),
    enabled: ids.length > 0,
    staleTime: 60_000,
  });
}
