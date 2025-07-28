const { supabase } = require('../../../lib/supabaseClient');

module.exports = async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Missing ID in query' });
  }

  try {
    switch (req.method) {
      case 'GET': {
        const { data, error } = await supabase
          .from('story')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        return res.status(200).json(data);
      }

      case 'PUT': {
        const { title, url, img } = req.body;

        if (!title || !url || !img) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        const { data, error } = await supabase
          .from('story')
          .update({ title, url, img })
          .eq('id', id);

        if (error) throw error;
        return res.status(200).json(data);
      }

      case 'DELETE': {
        const { error } = await supabase
          .from('story')
          .delete()
          .eq('id', id);

        if (error) throw error;
        return res.status(204).end();
      }

      default:
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Server Error' });
  }
};
