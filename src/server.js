import app from './app.js';

const port = process.env.SERVER_PORT || 3001;
app.listen(port, () => {
  console.log(`Task Management API is running on port ${port}`);
});
