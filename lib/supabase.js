import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export async function signInWithEmail(email, password) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUpWithEmail(email, password, fullName) {
  const { data, error } = await supabase.auth.signUp({
    email, password,
    options: { data: { full_name: fullName } },
  });
  return { data, error };
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// Progress helpers
export async function getSolvedProblems(userId) {
  if (!userId) return [];
  const { data } = await supabase
    .from('progress')
    .select('problem_slug, status, solved_at')
    .eq('user_id', userId)
    .eq('status', 'solved');
  return data || [];
}

export async function markProblemSolved(userId, problemSlug) {
  if (!userId) return;
  return supabase.from('progress').upsert({
    user_id: userId,
    problem_slug: problemSlug,
    status: 'solved',
    solved_at: new Date().toISOString(),
  }, { onConflict: 'user_id,problem_slug' });
}

export async function unmarkProblemSolved(userId, problemSlug) {
  if (!userId) return;
  return supabase.from('progress')
    .delete()
    .eq('user_id', userId)
    .eq('problem_slug', problemSlug);
}

export async function saveUserCode(userId, problemSlug, code, language) {
  if (!userId) return;
  return supabase.from('user_code').upsert({
    user_id: userId,
    problem_slug: problemSlug,
    code,
    language,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id,problem_slug' });
}

export async function getUserCode(userId, problemSlug) {
  if (!userId) return null;
  const { data } = await supabase
    .from('user_code')
    .select('code, language')
    .eq('user_id', userId)
    .eq('problem_slug', problemSlug)
    .single();
  return data;
}
