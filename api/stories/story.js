import { getAllStories, getStoryById, addStory } from '../../controllers/storyController.js';
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
    res.setHeader('Cache-Control', 'no-store');
    if (req.method === 'GET') {
      const { id } = req.query;
      if (id) {
        const story = await getStoryById(parseInt(id));
        return res.status(200).json(story);
      } else {
        const stories = await getAllStories();
        return res.status(200).json(stories);
      }
    }

    if (req.method === 'POST') {
      const { title, url, img } = req.body;
      const story = await addStory({ title, url, img });
      return res.status(201).json(story);
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
