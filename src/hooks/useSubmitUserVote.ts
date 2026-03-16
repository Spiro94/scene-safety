import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitUserVote } from '../api/supabase';

export function useSubmitUserVote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitUserVote,
    onSuccess: (_data, variables) => {
      const movieId = variables.movie_id;
      queryClient.invalidateQueries({
        queryKey: ['triggerReport', String(movieId)],
      });
      queryClient.invalidateQueries({ queryKey: ['userTriggerReports'] });
    },
    onError: (error) => {
      console.warn(`Error submitting user vote: ${error}`);
    },
  });
}
