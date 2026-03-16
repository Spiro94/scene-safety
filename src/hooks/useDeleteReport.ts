import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTriggerReport } from '../api/supabase';

export function useDeleteReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTriggerReport,
    onSuccess: (_data, variables) => {
      const movieId = variables.movie_id;
      queryClient.invalidateQueries({ queryKey: ['userTriggerReports'] });
      queryClient.invalidateQueries({ queryKey: ['triggerReportCounts'] });
      queryClient.invalidateQueries({
        queryKey: ['triggerReport', String(movieId)],
      });
      console.log('Trigger report deleted successfully');
    },
    onError: (error) => {
      console.warn(`Error deleting trigger report: ${error}`);
    },
  });
}
