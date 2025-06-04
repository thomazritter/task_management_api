import UserService from '../services/userService.js';
import authenticateToken from '../utils/authMiddleware.js';

export default class UsersController {
  static createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = await UserService.createUser({ name, email, password });
      res.status(201).json({ data: user });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  };

  static getUserById = [
    authenticateToken,
    async (req, res) => {
      const { id } = req.params;
      try {
        const user = await UserService.getUserById(id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ data: user });
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
      }
    },
  ];

  static updateUser = [
    authenticateToken,
    async (req, res) => {
      const { id } = req.params;
      const { name, email } = req.body;
      try {
        const user = await UserService.updateUser(id, { name, email });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ data: user });
      } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
      }
    },
  ];

  static deleteUser = [
    authenticateToken,
    async (req, res) => {
      const { id } = req.params;
      try {
        const user = await UserService.deleteUser(id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', data: user });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
      }
    },
  ];
}