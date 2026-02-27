import runCors from "../../utils/cors.js";
import { CommentController } from "../../controllers/commentController.js";

export default async function handler(req, res) {
  const ended = runCors(req, res);
  if (ended) return;

  if (req.method === "GET") {
    return CommentController.getComments(req, res);
  }

  if (req.method === "POST") {
    return CommentController.addComment(req, res);
  }

  if (req.method === "DELETE") {
    return CommentController.deleteComment(req, res);
  }

  return res.status(405).json({ message: "Method not allowed" });
}