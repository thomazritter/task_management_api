import { DataTypes } from 'sequelize';
import sequelize from '../connections/database.js';

// Improved readability and added comments for clarity
const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  assignedTo: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
}, {
  timestamps: true,
});

export default Task;