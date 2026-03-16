import type { Calification } from './calification';

export type TriggerReport = {
  id?: string;
  tmdb_movie_id: string;
  trigger_type: string;
  start_time: string;
  end_time: string;
  user_id: string;
  calification: Calification;
  description: string | null;
  created_at?: Date;
};

export type InsertTriggerReport = Omit<
  TriggerReport,
  'id' | 'created_at' | 'user_id'
>;

export type FullTriggerReport = TriggerReport & {
  helpful_votes: number;
  not_helpful_votes: number;
  accuracy_score: number;
};

export type FullTriggerReportWithUserVote = FullTriggerReport & {
  user_vote: number;
  has_voted: boolean;
};
