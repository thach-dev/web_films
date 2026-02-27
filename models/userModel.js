import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export async function getUserByUsername(username, password) {
  const tempt = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();
  
    return tempt;
}

