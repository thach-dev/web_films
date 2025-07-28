const { getAllStories, addStory } = require('../../controllers/storyController');

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const stories = await getAllStories();
      return res.status(200).json(stories);
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
