import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default class AuthController {
  static login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      res.status(200).json({ token });
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({ error: 'Failed to login' });
    }
  };

  static logout = (req, res) => {
    res.status(200).json({ message: 'Successfully logged out' });
  };
}
