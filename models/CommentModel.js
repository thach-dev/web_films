import { supabase } from "../lib/supabaseClient.js";

export const CommentModel = {

  // Lấy comment theo video
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

  // Thêm comment
  async create(comment) {
    const { data, error } = await supabase
      .from("comments")
      .insert([comment])
      .select();

    if (error) throw error;
    return data;
  },

  // Soft delete
  async softDelete(id) {
    const { data, error } = await supabase
      .from("comments")
      .update({ is_deleted: true })
      .eq("id", id)
      .select();

    if (error) throw error;
    return data;
  }

};