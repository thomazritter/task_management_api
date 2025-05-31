import User from '../models/user.js';

export default class UsersController {
  static createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = await User.create({ name, email, password });
      res.status(201).json({ data: user });
    } catch (error) {
      console.error('User creation error:', error.message);
      res.status(500).json({ error: 'Failed to create user' });
    }
  };

  static getUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ data: user });
    } catch (error) {
      console.error('Fetching user error:', error.message);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  };

  static updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      await user.update({ name, email });
      res.status(200).json({ data: user });
    } catch (error) {
      console.error('Updating user error:', error.message);
      res.status(500).json({ error: 'Failed to update user' });
    }
  };

  static deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      await user.destroy();
      res.status(200).json({ message: 'User deleted successfully', data: user });
    } catch (error) {
      console.error('Deleting user error:', error.message);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  };
}