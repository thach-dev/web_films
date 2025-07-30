import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export async function getUserByUsername(username, password) {
  return await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .eq('password', password)
    .single();
}

