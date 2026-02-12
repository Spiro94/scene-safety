export type TriggerReport = {
  id?: string;
  tmdb_movie_id: string;
  trigger_type: string;
  start_time: string;
  end_time: string;
  description: string | null;
  created_at?: Date;
};
