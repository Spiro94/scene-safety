import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitTriggerReport } from '../api/supabase';

export function useSubmitTriggerReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitTriggerReport,
    onSuccess: (_data, variables) => {
      const movieId = variables.tmdb_movie_id;
      queryClient.invalidateQueries({ queryKey: ['triggerReport', movieId] });
      queryClient.invalidateQueries({ queryKey: ['triggerReportCounts'] });
    },
    onError: (error) => {
      console.error('Error submitting trigger:', error);
    },
  });
}
