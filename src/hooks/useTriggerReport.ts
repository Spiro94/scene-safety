import { useQuery } from '@tanstack/react-query';
import { getMovieTriggerReport } from '../api/supabase';
import type { FullTriggerReportWithUserVote } from '../models/triggerReport';

export function useTriggerReport(movieId?: string) {
  return useQuery<FullTriggerReportWithUserVote[]>({
    queryKey: ['triggerReport', movieId],
    queryFn: () => getMovieTriggerReport(movieId!),
    enabled: Boolean(movieId),
    staleTime: 60_000,
  });
}
