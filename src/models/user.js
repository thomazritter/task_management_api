import { DataTypes } from 'sequelize';
import sequelize from '../connections/database.js';

// Improved readability and added comments for clarity
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deletedAt: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
}, {
  timestamps: true,
  paranoid: true, // Enables soft delete functionality
});

export default User;