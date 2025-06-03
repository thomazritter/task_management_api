import Task from '../models/task.js';

export default class TaskService {
  static async createTask({ title, description, assignedTo, status }) {
    return Task.create({ title, description, assignedTo, status });
  }

  static async getTaskById(id) {
    return Task.findOne({ where: { id, deletedAt: null } });
  }

  static async getTasksByUser(assignedTo) {
    return Task.findAll({ where: { assignedTo, deletedAt: null } });
  }

  static async updateTask(id, { title, description, status }) {
    const task = await Task.findOne({ where: { id, deletedAt: null } });
    if (!task) return null;
    await task.update({ title, description, status });
    return task;
  }

  static async deleteTask(id) {
    const task = await Task.findOne({ where: { id, deletedAt: null } });
    if (!task) return null;
    await task.update({ deletedAt: new Date() });
    return task;
  }

  static async restoreTask(id) {
    const task = await Task.findOne({ where: { id, deletedAt: { [Op.not]: null } } });
    if (!task) return null;
    await task.update({ deletedAt: null });
    return task;
  }
}
