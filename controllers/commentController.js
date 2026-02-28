import { CommentModel } from "../models/CommentModel.js";

export const CommentController = {

  // =========================
  // GET COMMENTS
  // =========================
  async getComments(req, res) {
    try {
      const { videoId } = req.query;

      if (!videoId) {
        return res.status(400).json({ message: "Thiếu videoId" });
      }

      const comments = await CommentModel.getByVideo(videoId);

      return res.status(200).json(comments);

    } catch (error) {
      console.error("GET COMMENTS ERROR:", error);
      return res.status(500).json({ message: error.message });
    }
  },

  // =========================
  // ADD COMMENT
  // =========================
  async addComment(req, res) {
    try {
      const { video_id, content, parent_id, user_id } = req.body;

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

      return res.status(201).json(newComment);

    } catch (error) {
      console.error("ADD COMMENT ERROR:", error);
      return res.status(500).json({ message: error.message });
    }
  },

  // =========================
  // DELETE COMMENT (FIXED)
  // =========================
  async deleteComment(req, res) {
    try {
      const { id, user_id } = req.query;

      if (!id) {
        return res.status(400).json({ message: "Thiếu id" });
      }

      if (!user_id) {
        return res.status(401).json({ message: "Chưa đăng nhập" });
      }

      const comment = await CommentModel.findById(id);

      if (!comment) {
        return res.status(404).json({ message: "Comment không tồn tại" });
      }

      if (comment.user_id !== Number(user_id)) {
        return res.status(403).json({ message: "Không có quyền xoá" });
      }

      const result = await CommentModel.softDelete(id);

      return res.status(200).json({
        message: "Xoá thành công",
        data: result
      });

    } catch (error) {
      console.error("DELETE COMMENT ERROR:", error);
      return res.status(500).json({ message: error.message });
    }
  }
};