import { supabase } from "../../lib/supabaseClient.js";

export default async function handler(req, res) {

  // GET: lấy comment theo video
  if (req.method === "GET") {
    const { videoId } = req.query;

    if (!videoId) {
      return res.status(400).json({ message: "Thiếu videoId" });
    }

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

    if (error) return res.status(500).json(error);

    return res.status(200).json(data);
  }

  // POST: thêm comment
  if (req.method === "POST") {
    const { video_id, user_id, content, parent_id } = req.body;

    if (!video_id || !user_id || !content) {
      return res.status(400).json({ message: "Thiếu dữ liệu" });
    }

    const { data, error } = await supabase
      .from("comments")
      .insert([{
        video_id,
        user_id,
        content,
        parent_id: parent_id || null
      }])
      .select();

    if (error) return res.status(500).json(error);

    return res.status(201).json(data);
  }

  // DELETE: soft delete
  if (req.method === "DELETE") {
    const { id } = req.query;

    const { data, error } = await supabase
      .from("comments")
      .update({ is_deleted: true })
      .eq("id", id)
      .select();

    if (error) return res.status(500).json(error);

    return res.status(200).json(data);
  }

  return res.status(405).json({ message: "Method not allowed" });
}