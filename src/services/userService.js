import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

export default class UserService {
  static async createUser({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return User.create({ name, email, password: hashedPassword });
  }

  static async getUserById(id) {
    return User.findOne({ where: { id, deletedAt: null } });
  }

  static async updateUser(id, { name, email }) {
    const user = await User.findOne({ where: { id, deletedAt: null } });
    if (!user) return null;
    // Only update fields if provided
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    await user.save();
    return user;
  }

  static async deleteUser(id) {
    const user = await User.findOne({ where: { id, deletedAt: null } });
    if (!user) return null;
    await user.update({ deletedAt: new Date() });
    return await User.findOne({ where: { id } });
  }

  static async restoreUser(id) {
    const user = await User.findOne({ where: { id, deletedAt: { [Op.not]: null } } });
    if (!user) return null;
    await user.update({ deletedAt: null });
    return await User.findOne({ where: { id } });
  }
}
