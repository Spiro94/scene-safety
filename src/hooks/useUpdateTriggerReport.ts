import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTriggerReport } from '../api/supabase';

export function useUpdateTriggerReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reportId, report }: { reportId: string; report: Parameters<typeof updateTriggerReport>[1] }) =>
      updateTriggerReport(reportId, report),
    onSuccess: (_data, variables) => {
      const movieId = variables.report.tmdb_movie_id;
      queryClient.invalidateQueries({ queryKey: ['triggerReport', movieId] });
      queryClient.invalidateQueries({ queryKey: ['triggerReportCounts'] });
      queryClient.invalidateQueries({ queryKey: ['userTriggerReports'] });
    },
    onError: (error) => {
      console.error('Error updating trigger:', error);
    },
  });
}
