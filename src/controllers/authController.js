import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default class AuthController {
  static login = async (req, res) => {
    const { email, password } = req.body;
    try {
      // Mock user validation (replace with actual DB query)
      if (email === 'test@example.com' && password === 'password') {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  static logout = (req, res) => {
    // Mock logout (actual implementation depends on token invalidation strategy)
    res.status(200).json({ message: 'Logged out successfully' });
  };
}