import runCors from "../../utils/cors.js";
import { CommentController } from "../../controllers/commentController.js";
import { verifyToken } from "../../utils/verifyToken.js";

export default async function handler(req, res) {
  const ended = runCors(req, res);
  if (ended) return;

  if (req.method === "GET") {
    return CommentController.getComments(req, res);
  }

  if (req.method === "POST") {
    const user = verifyToken(req);

    if (!user) {
      return res.status(401).json({ message: "Chưa đăng nhập" });
    }

    req.user = user; 

    return CommentController.addComment(req, res);
  }

  if (req.method === "DELETE") {
    const user = verifyToken(req);

    if (!user) {
      return res.status(401).json({ message: "Chưa đăng nhập" });
    }

    req.user = user;

    return CommentController.deleteComment(req, res);
  }

  return res.status(405).json({ message: "Method not allowed" });
}