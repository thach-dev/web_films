import { CommentModel } from "../models/CommentModel.js";

export const CommentController = {

  async getComments(req, res) {
    try {
      const { videoId } = req.query; // sửa ở đây

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
      const { video_id, content, parent_id } = req.body;

      // nếu bạn lưu user trong session
      const user_id = req.session?.user?.id;

      if (!user_id) {
        return res.status(401).json({ message: "Chưa đăng nhập" });
      }

      const newComment = await CommentModel.create({
        video_id,
        user_id,
        parent_id: parent_id || null,
        content
      });

      res.status(201).json(newComment);
    } catch (error) {
      console.error(error);
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