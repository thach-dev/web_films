import runCors from "../../utils/cors.js";
import {
  getFilms,
  createFilm,
  editFilm,
  removeFilm,
} from "../../controllers/filmsHotController.js";

export const config = {
  api: { bodyParser: true },
};

export default async function handler(req, res) {
  const ended = runCors(req, res);
  if (ended) return;

  try {
    res.setHeader("Cache-Control", "no-store");

    switch (req.method) {
      case "GET":
        return await getFilms(req, res);
      case "POST":
        return await createFilm(req, res);
      case "PUT":
        return await editFilm(req, res);
      case "DELETE":
        return await removeFilm(req, res);
      default:
        return res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}