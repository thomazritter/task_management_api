import Task from '../models/task.js';

export default class TasksController {
  static createTask = async (req, res) => {
    const { title, description, assignedTo, status } = req.body;
    try {
      const task = await Task.create({ title, description, assignedTo, status });
      res.status(201).json({ data: task });
    } catch (error) {
      console.error('Error creating task:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  static getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.status(200).json({ data: task });
    } catch (error) {
      console.error('Error fetching task:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  static getTasksByUser = async (req, res) => {
    const { assignedTo } = req.query;
    try {
      const tasks = await Task.findAll({ where: { assignedTo } });
      res.status(200).json({ data: tasks });
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  static updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      await task.update({ title, description, status });
      res.status(200).json({ data: task });
    } catch (error) {
      console.error('Error updating task:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  static deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      await task.destroy();
      res.status(200).json({ message: 'Task deleted successfully', data: task });
    } catch (error) {
      console.error('Error deleting task:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}