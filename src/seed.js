import User from './models/user.js';
import Task from './models/task.js';
import sequelize from './connections/database.js';

const retryConnection = async (maxRetries = 5, delay = 2000) => {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      await sequelize.authenticate();
      console.log('Database connection established');
      return;
    } catch (error) {
      retries++;
      console.log(`Retrying database connection (${retries}/${maxRetries})...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error('Failed to connect to the database after multiple retries');
};

const seedDatabase = async () => {
  try {
    await retryConnection();
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate([
      { name: 'John Doe', email: 'john.doe@example.com', password: 'password123' },
      { name: 'Jane Smith', email: 'jane.smith@example.com', password: 'password456' },
    ]);

    await Task.bulkCreate([
      { title: 'Task 1', description: 'Description for Task 1', assignedTo: users[0].id, status: 'pending' },
      { title: 'Task 2', description: 'Description for Task 2', assignedTo: users[1].id, status: 'completed' },
    ]);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Seeding error:', error.message);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();