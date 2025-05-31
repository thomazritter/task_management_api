import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default class AuthController {
  static login = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email === 'test@example.com' && password === 'password') {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({ error: 'An error occurred during login' });
    }
  };

  static logout = (req, res) => {
    res.status(200).json({ message: 'Successfully logged out' });
  };
}