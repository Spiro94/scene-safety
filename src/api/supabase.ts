import type {
  FullTriggerReport,
  InsertTriggerReport,
  TriggerReport,
} from '../models/triggerReport';
import { supabaseClient } from '../utils/supabaseClient';

/// ***** User API *****

export async function signUp(email: string, password: string) {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
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

export async function getUserTriggerReports(): Promise<FullTriggerReport[]> {
  const userId = (await supabaseClient.auth.getUser()).data.user?.id;
  const { data, error } = await supabaseClient.rpc('get_full_trigger_reports', {
    p_user_id: userId,
  });

  console.warn(`Error ${error}`);

  if (error) throw error;

  return data ?? [];
}
