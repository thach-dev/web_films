import { supabase } from '../lib/supabaseClient.js';

export async function getAllStories() {
  const { data, error } = await supabase.from('story').select('*');
  if (error) throw new Error(error.message);
  return data;
}

export async function addStory({ title, url, img }) {
  const { data, error } = await supabase.from('story').insert([{ title, url, img }]);
  if (error) throw new Error(error.message);
  return data;
}
