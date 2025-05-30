import Database from '../connections/database.js';

export default class TasksController {
  static createTask = async (req, res) => {
    const { title, description, assignedTo, status } = req.body;
    try {
      const result = await Database.query(
        'INSERT INTO tasks (title, description, assigned_to, status) VALUES ($1, $2, $3, $4) RETURNING *;',
        [title, description, assignedTo, status]
      );
      res.status(201).json({ data: result.rows[0] });
    } catch (error) {
      console.error('Error creating task:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  static getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Database.query('SELECT * FROM tasks WHERE id = $1;', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json({ data: result.rows[0] });
    } catch (error) {
      console.error('Error fetching task:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  static getTasksByUser = async (req, res) => {
    const { assignedTo } = req.query;
    try {
      const result = await Database.query('SELECT * FROM tasks WHERE assigned_to = $1;', [assignedTo]);
      res.status(200).json({ data: result.rows });
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  static updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
      const result = await Database.query(
        'UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *;',
        [title, description, status, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json({ data: result.rows[0] });
    } catch (error) {
      console.error('Error updating task:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  static deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Database.query(
        'DELETE FROM tasks WHERE id = $1 RETURNING *;',
        [id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json({ message: 'Task deleted successfully', data: result.rows[0] });
    } catch (error) {
      console.error('Error deleting task:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}