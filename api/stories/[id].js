import { getStoryById } from '../../controllers/storyController.js';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const story = await getStoryById(parseInt(id));
      return res.status(200).json(story);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
