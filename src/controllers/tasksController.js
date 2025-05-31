import Task from '../models/task.js';

export default class TasksController {
  static createTask = async (req, res) => {
    const { title, description, assignedTo, status } = req.body;
    try {
      const task = await Task.create({ title, description, assignedTo, status });
      res.status(201).json({ data: task });
    } catch (error) {
      console.error('Task creation error:', error.message);
      res.status(500).json({ error: 'Failed to create task' });
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
      console.error('Fetching task error:', error.message);
      res.status(500).json({ error: 'Failed to fetch task' });
    }
  };

  static getTasksByUser = async (req, res) => {
    const { assignedTo } = req.query;
    try {
      const tasks = await Task.findAll({ where: { assignedTo } });
      res.status(200).json({ data: tasks });
    } catch (error) {
      console.error('Fetching tasks error:', error.message);
      res.status(500).json({ error: 'Failed to fetch tasks' });
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
      console.error('Updating task error:', error.message);
      res.status(500).json({ error: 'Failed to update task' });
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
      console.error('Deleting task error:', error.message);
      res.status(500).json({ error: 'Failed to delete task' });
    }
  };
}