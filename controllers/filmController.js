import {
  getAllFilmsModel,
  getFilmByIdModel,
} from '../models/filmModel.js';

// export async function getAllFilms() {
//   return await getAllFilmsModel();
// }

export async function getFilmById(id) {
  return await getFilmByIdModel(id);
}

export async function addFilm({ title, url, img }) {
  return await addFilmModel({ title, url, img });
}
export async function getAllFilms() {
  try {
    const result = await pool.query('SELECT * FROM "list_video"');
    console.log("GET ALL FILMS RESULT:", result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error fetching films:", error);
    throw error;
  }
}
