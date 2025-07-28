export async function getStoryById(id) {
  const { data, error } = await supabase.from('story').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
}
