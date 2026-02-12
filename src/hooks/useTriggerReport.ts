import { useQuery } from '@tanstack/react-query';
import { getTriggerReport } from '../api/supabase';
import type { TriggerReport } from '../models/triggerReport';

export function useTriggerReport(movieId?: string) {
  return useQuery<TriggerReport[]>({
    queryKey: ['triggerReport', movieId],
    queryFn: () => getTriggerReport(movieId!),
    enabled: Boolean(movieId),
    staleTime: 60_000,
  });
}
