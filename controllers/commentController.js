import { CommentModel } from "../models/CommentModel.js";

export const CommentController = {

  async getComments(req, res) {
    try {
      const { videoId } = req.query;

      if (!videoId) {
        return res.status(400).json({ message: "Thiếu videoId" });
      }

      const comments = await CommentModel.getByVideo(videoId);
      res.json(comments);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server" });
    }
  },

  async addComment(req, res) {
    try {

      const { video_id, content, parent_id, user_id } = req.body;

      // 🔥 kiểm tra user_id từ frontend
      if (!user_id) {
        return res.status(401).json({ message: "Chưa đăng nhập" });
      }

      if (!video_id || !content) {
        return res.status(400).json({ message: "Thiếu dữ liệu" });
      }

      const newComment = await CommentModel.create({
        video_id,
        user_id,
        parent_id: parent_id || null,
        content
      });

      res.status(201).json(newComment);

    } catch (error) {
      console.error("🔥 Server error:", error);
      res.status(500).json({ message: "Lỗi server" });
    }
  },

  async deleteComment(req, res) {
    try {
      const { id } = req.params;

      const result = await CommentModel.softDelete(id);

      res.json(result);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }

};