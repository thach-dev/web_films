import jwt from "jsonwebtoken";
import { getUserByUsername } from "../models/userModel";

export async function loginUser(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Thiếu tên đăng nhập hoặc mật khẩu" });
  }

  try {
    const { data: user, error } = await getUserByUsername(username, password);

    if (error || !user) {
      return res.status(401).json({ error: "Sai tài khoản hoặc mật khẩu" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔥 Trả nhiều trường nhưng bỏ password
    const safeUser = {
      id: user.id,
      username: user.username,
      role: user.role,
      created_at: user.created_at,
      avatar_url: user.avatar_url
    };

    res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      user: safeUser
    });

  } catch (err) {
    res.status(500).json({ error: "Lỗi server khi đăng nhập" });
  }
}