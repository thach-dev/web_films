import { getUserByUsername } from '../models/userModel.js';
export async function loginUser(req, res) {
  const { username, password } = req.body;
  console.log("Input username:", username);
console.log("Input password:", password);

  if (!username || !password) {
    return res.status(400).json({ error: 'Thiếu tên đăng nhập hoặc mật khẩu' });
  }

  try {
    const { data: user, error } = await getUserByUsername(username, password);

    if (error || !user) {
      console.log(`[LOGIN FAILED] username=${username}`);
      return res.status(401).json({ error: 'Sai tài khoản hoặc mật khẩu' });
    }

    console.log(`[LOGIN SUCCESS] username=${username}`);
    return res.status(200).json({ message: 'Đăng nhập thành công', user });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: 'Lỗi server khi đăng nhập' });
  }
}