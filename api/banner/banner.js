import { getBanner } from '../../controllers/bannerController.js';
import runCors from '../../utils/cors.js';

export default async function handler(req, res) {
  const ended = runCors(req, res);
  if (ended) return;

  if (req.method === 'GET') {
    return getBanner(req, res);
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}