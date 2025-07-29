import { getUserByUsername } from '../models/userModel';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export async function loginUser(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Thiếu tên đăng nhập hoặc mật khẩu' });
  }

  try {
    // 1. Lấy user theo username
    const { data: user, error: userError } = await getUserByUsername(username);

    if (userError || !user) {
      return res.status(401).json({ error: 'Tài khoản không tồn tại' });
    }

    // 2. Dùng email để đăng nhập
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: 'Sai tài khoản hoặc mật khẩu' });
    }

    res.status(200).json({ message: 'Đăng nhập thành công', user: data.user });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server khi đăng nhập' });
  }
}
