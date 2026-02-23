import { NewsController } from "../../controllers/newsController.js";
import runCors from '../../utils/cors.js';
export default async function handler(req, res) {
  const ended = runCors(req, res);
  if (ended) return;
  if (req.method === "GET") {
    return NewsController.getNews(req, res);
  }

  if (req.method === "POST") {
    return NewsController.createNews(req, res);
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}