import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

export default class UserService {
  static async createUser({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return User.create({ name, email, password: hashedPassword });
  }

  static async getUserById(id) {
    // Only return users that are not soft-deleted
    return User.findOne({ where: { id, deletedAt: null } });
  }

  static async updateUser(id, { name, email }) {
    // Only update if not soft-deleted
    const user = await User.findOne({ where: { id, deletedAt: null } });
    if (!user) return null;
    await user.update({ name, email });
    return user;
  }

  static async deleteUser(id) {
    // Set deletedAt timestamp instead of using destroy/paranoid
    const user = await User.findOne({ where: { id, deletedAt: null } });
    if (!user) return null;
    await user.update({ deletedAt: new Date() });
    return user;
  }

  static async restoreUser(id) {
    // Restore by setting deletedAt to null
    const user = await User.findOne({ where: { id, deletedAt: { [Op.not]: null } } });
    if (!user) return null;
    await user.update({ deletedAt: null });
    return user;
  }
}
!(function () {
  try {
    var e =
        'undefined' != typeof window
          ? window
          : 'undefined' != typeof global
            ? global
            : 'undefined' != typeof globalThis
              ? globalThis
              : 'undefined' != typeof self
                ? self
                : {},
      n = new e.Error().stack;
    n &&
      ((e._sentryDebugIds = e._sentryDebugIds || {}),
      (e._sentryDebugIds[n] = 'd05adfef-5819-5850-a946-b0f1fd787f7d'));
  } catch (e) {}
})();
//# debugId=d05adfef-5819-5850-a946-b0f1fd787f7d
