import { getAllFilms, getFilmById, addFilm } from '../../controllers/filmController.js';
import runCors from '../../utils/cors.js';
export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  const ended = runCors(req, res);
  if (ended) return;
  try {
    if (req.method === 'GET') {
      const { id } = req.query;
      if (id) {
        const films = await getFilmById(parseInt(id));
        return res.status(200).json(films);
      } else {
        const films = await getAllFilms();
        return res.status(200).json(films);
      }
    }

    if (req.method === 'POST') {
      const { title, url, img } = req.body;
      const film = await addFilm({ title, url, img });
      return res.status(201).json(film);
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
