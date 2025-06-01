import express from 'express'
import UsersController from '../controllers/usersController.js'
import TasksController from '../controllers/tasksController.js'
import AuthController from '../controllers/authController.js'
import sentry from '../sentry.js'

export default class Router {
  static getRouter() {
    const router = express.Router()

    // Health check
    router.get('/health', (req, res) => res.status(200).json({ status: 'API is running' }))
    router.get('/error', (req, res) => { 
      sentry.captureException(new Error('Someone tried to access an error endpoint'), { extra: req.body })
      res.status(500).json({ error: 'This is a test error endpoint' })
    });

    // Users endpoints
    router.post('/users', UsersController.createUser)
    router.get('/users/:id', UsersController.getUserById)
    router.put('/users/:id', UsersController.updateUser)
    router.delete('/users/:id', UsersController.deleteUser)

    // Tasks endpoints
    router.post('/tasks', TasksController.createTask)
    router.get('/tasks/:id', TasksController.getTaskById)
    router.get('/tasks', TasksController.getTasksByUser)
    router.put('/tasks/:id', TasksController.updateTask)
    router.delete('/tasks/:id', TasksController.deleteTask)

    // Authentication endpoints
    router.post('/auth/login', AuthController.login)
    router.post('/auth/logout', AuthController.logout)

    return router
  }
}
