import Database from '../connections/database.js';

export default class UsersController {
  static createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const result = await Database.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;',
        [name, email, password]
      );
      res.status(201).json({ data: result.rows[0] });
    } catch (error) {
      console.error('Error creating user:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  static getUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Database.query('SELECT * FROM users WHERE id = $1;', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ data: result.rows[0] });
    } catch (error) {
      console.error('Error fetching user:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  static updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const result = await Database.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *;',
        [name, email, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ data: result.rows[0] });
    } catch (error) {
      console.error('Error updating user:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  static deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Database.query(
        'UPDATE users SET deleted_at = NOW() WHERE id = $1 RETURNING *;',
        [id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully', data: result.rows[0] });
    } catch (error) {
      console.error('Error deleting user:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}