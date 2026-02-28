import { supabase } from "../lib/supabaseClient.js";

export const CommentModel = {

  async getByVideo(videoId) {
    const { data, error } = await supabase
      .from("comments")
      .select(`
        *,
        users (
          username,
          avatar_url
        )
      `)
      .eq("video_id", videoId)
      .eq("is_deleted", false)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data;
  },

  async create(comment) {
    const { data, error } = await supabase
      .from("comments")
      .insert([comment])
      .select()
      .single(); // 🔥 nên thêm single luôn

    if (error) throw error;
    return data;
  },

  async findById(id) {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async softDelete(id) {
    const { data, error } = await supabase
      .from("comments")
      .update({ is_deleted: true })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};