import {
  getAllFilmsModel,
  getFilmByIdModel,
} from '../models/filmModel.js';

export async function getAllFilms() {
  return await getAllFilmsModel();
}

export async function getFilmById(id) {
  return await getFilmByIdModel(id);
}

