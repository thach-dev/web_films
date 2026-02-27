import { getUserByUsername } from '../models/userModel';

export async function loginUser(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Thiếu tên đăng nhập hoặc mật khẩu' });
  }

  try {
    // Truyền cả username và password để kiểm tra
    const { data: user, error } = await getUserByUsername(username, password);
    console.log(`[LOGIN FAILED] username=${username} | reason=wrong_password`);
    
    if (error || !user) {
      return res.status(401).json({ error: 'Sai tài khoản hoặc mật khẩu' });
    }

    res.status(200).json({ message: 'Đăng nhập thành công', user });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server khi đăng nhập' });
  }
}
