import type {
  FullTriggerReport,
  FullTriggerReportWithUserVote,
  InsertTriggerReport,
  TriggerReport,
} from '../models/triggerReport';
import type { UserProfile } from '../models/userProfile';
import type { UserVote } from '../models/userVote';
import { supabaseClient } from '../utils/supabaseClient';

/// ***** User API *****

export async function signUp(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
) {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    console.error(error);
    throw error;
  }
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw error;
  }
  return data;
}

export async function signOut() {
  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    console.error(error);
    throw error;
  }
}

export async function getCurrentSession() {
  const { data, error } = await supabaseClient.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
}

export async function getUserProfile(): Promise<UserProfile> {
  const user = await supabaseClient.auth.getUser();
  if (!user.data.user) {
    throw new Error('No user logged in');
  }

  const { data, error } = await supabaseClient
    .from('user_profiles')
    .select('*')
    .eq('id', user.data.user.id)
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function getSpecificUserProfile(
  userId: string,
): Promise<UserProfile> {
  const { data, error } = await supabaseClient
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export function onAuthStateChange(
  callback: Parameters<typeof supabaseClient.auth.onAuthStateChange>[0],
) {
  return supabaseClient.auth.onAuthStateChange(callback);
}

/// ***** Trigger Report API *****

export async function submitTriggerReport(report: InsertTriggerReport) {
  const userId = await supabaseClient.auth.getUser();
  const { data, error } = await supabaseClient
    .from('trigger_reports')
    .insert({ ...report, user_id: userId.data.user?.id });

  if (error) {
    console.error(error);
    throw error;
  }
  return data;
}

export async function getTriggerReportCounts(movieIds: string[]) {
  if (movieIds.length === 0) return {} as Record<string, number>;

  const { data, error } = await supabaseClient
    .from('trigger_reports')
    .select('tmdb_movie_id')
    .in('tmdb_movie_id', movieIds);

  if (error) throw error;

  return (data ?? []).reduce<Record<string, number>>((acc, row) => {
    const id = row.tmdb_movie_id as string;
    acc[id] = (acc[id] ?? 0) + 1;
    return acc;
  }, {});
}

export async function getTriggerReport(
  movieId: string,
): Promise<TriggerReport[]> {
  const { data, error } = await supabaseClient
    .from('trigger_reports')
    .select('*')
    .eq('tmdb_movie_id', movieId);

  if (error) throw error;

  return data ?? [];
}

export async function getMovieTriggerReport(
  movieId: string,
): Promise<FullTriggerReportWithUserVote[]> {
  const userId = (await supabaseClient.auth.getUser()).data.user?.id;
  const { data, error } = await supabaseClient.rpc(
    'get_trigger_reports_by_movie',
    {
      p_tmdb_movie_id: movieId,
      p_user_id: userId,
    },
  );

  if (error) throw error;

  return data ?? [];
}

export async function getUserTriggerReports(): Promise<FullTriggerReport[]> {
  const userId = (await supabaseClient.auth.getUser()).data.user?.id;
  if (!userId) return [];

  const { data, error } = await supabaseClient.rpc('get_full_trigger_reports', {
    p_user_id: userId,
  });

  if (error) throw error;

  return data ?? [];
}

export async function submitUserVote(userVote: UserVote) {
  const userId = (await supabaseClient.auth.getUser()).data.user?.id;
  const { data, error } = await supabaseClient
    .from('trigger_report_votes')
    .upsert(
      {
        trigger_report_id: userVote.report_id,
        user_id: userId,
        vote: userVote.vote,
      },
      {
        onConflict: 'trigger_report_id,user_id',
      },
    );

  if (error) throw error;

  return data;
}
