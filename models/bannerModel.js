import { supabase } from '../utils/cors.js';
export async function getBannerModel() {
  const { data, error } = await supabase.from('banner').select('*').order('id', { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}