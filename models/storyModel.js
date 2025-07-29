import { supabase } from '../lib/supabaseClient.js';

export async function getAllStoriesModel() {
  const { data, error } = await supabase.from('story').select('*');
  if (error) throw new Error(error.message);
  return data;
}

export async function getStoryByIdModel(id) {
  const { data, error } = await supabase
    .from('story')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function addStoryModel({ title, url, img }) {
  const { data, error } = await supabase
    .from('story')
    .insert([{ title, url, img }])
    .single();
  if (error) throw new Error(error.message);
  return data;
}
