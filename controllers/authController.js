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

    // 🔥 Tạo JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });

  } catch (err) {
    res.status(500).json({ error: "Lỗi server khi đăng nhập" });
  }
}