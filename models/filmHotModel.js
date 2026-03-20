import { supabase } from "../lib/supabaseClient.js";

export async function getAllFilms() {
  const { data, error } = await supabase
    .from("films_hot")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getFilmById(id) {
  const { data, error } = await supabase
    .from("films_hot")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function addFilm({ title, image_url, video_url }) {
  const { data, error } = await supabase
    .from("films_hot")
    .insert([{ title, image_url, video_url }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateFilm(id, { title, image_url, video_url }) {
  const { data, error } = await supabase
    .from("films_hot")
    .update({ title, image_url, video_url })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteFilm(id) {
  const { error } = await supabase
    .from("films_hot")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return { message: "Deleted successfully" };
}