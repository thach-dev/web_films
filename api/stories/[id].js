export default async function handler(req, res) {
  const {
    query: { id },
    url,
  } = req;

  console.log('Query:', req.query);
  console.log('URL:', url);
  console.log('Raw ID:', id);

  if (req.method === 'GET') {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return res.status(400).json({ error: `Invalid ID format: ${id}` });
    }

    try {
      const story = await getStoryById(parsedId);
      return res.status(200).json(story);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
