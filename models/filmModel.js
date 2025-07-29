// models/filmsModel.js
import { supabase } from '../lib/supabaseClient.js';

export async function getAllFilmsModel() {
  const { data, error } = await supabase.from('list_video').select('*');
  if (error) throw new Error(error.message);
  return data;
}

export async function getFilmByIdModel(id) {
  const { data, error } = await supabase
    .from('list_video')
    .select('*')
    .eq('id', id);
  if (error) throw new Error(error.message);
  return data;
}

export async function addFilmModel({ title, url, img }) {
  const { data, error } = await supabase
    .from('list_video')
    .insert([{ title, url, img }])
    .single();
  if (error) throw new Error(error.message);
  return data;
}
