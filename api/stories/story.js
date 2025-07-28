const { getAllStories, getStoryById, addStory } = require('../../controllers/storyController');

module.exports = async function handler(req, res) {
  try {
    const parts = req.url.split('/');
    const id = parts.length > 3 ? parts[3] : null;

    if (req.method === 'GET') {
      if (id) {
        const story = await getStoryById(id);
        if (!story) return res.status(404).json({ error: 'Not found' });
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
};
