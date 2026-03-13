import { useQuery } from '@tanstack/react-query';
import { getUserTriggerReports } from '../api/supabase';

export function useUserTriggerReports() {
  return useQuery({
    queryKey: ['userTriggerReports'],
    queryFn: getUserTriggerReports,
    staleTime: 60_000,
  });
}
