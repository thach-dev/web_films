// pages/api/auth/login.js hoặc tương đương
import { loginUser } from '../../controllers/authController';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await loginUser(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
