import * as FilmModel from "../models/filmHotModel.js";

export async function getFilms(req, res) {
  const { id } = req.query;
  if (id) {
    const film = await FilmModel.getFilmById(id);
    return res.status(200).json(film);
  } else {
    const films = await FilmModel.getAllFilms();
    return res.status(200).json(films);
  }
}

export async function createFilm(req, res) {
  const { title, image_url, video_url } = req.body;
  if (!title) return res.status(400).json({ error: "Missing title" });
  const film = await FilmModel.addFilm({ title, image_url, video_url });
  return res.status(201).json(film);
}

export async function editFilm(req, res) {
  const { id } = req.query;
  const { title, image_url, video_url } = req.body;
  if (!id) return res.status(400).json({ error: "Missing id" });
  const film = await FilmModel.updateFilm(id, { title, image_url, video_url });
  return res.status(200).json(film);
}

export async function removeFilm(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "Missing id" });
  const result = await FilmModel.deleteFilm(id);
  return res.status(200).json(result);
}