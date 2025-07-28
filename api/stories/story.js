import { getAllStories, getStoryById, addStory } from '../../controllers/storyController.js';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { id } = req.query;

      if (id) {
        const story = await getStoryById(parseInt(id));
        if (!story) return res.status(404).json({ error: 'Story not found' });
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
