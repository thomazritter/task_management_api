import express from 'express'
import ProductsController from '../controllers/productsController.js'
import UsersController from '../controllers/usersController.js'
import TasksController from '../controllers/tasksController.js'
import AuthController from '../controllers/authController.js'

export default class Router {
  static getRouter() {
    const router = express.Router().all('/api')

    // Health check
    router.get('/health', (req, res) => res.status(200).json({ status: 'API is running' }))

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

    // Products endpoints
    router.get('/products/seedDatabase', ProductsController.seed)
    router.get('/products', ProductsController.getProducts)
    router.get('/products/:id', ProductsController.getProductById)
    router.get('/products/category/:id', ProductsController.getProductByCategory)
    router.post('/products', ProductsController.createProduct)
    router.delete('/products/:myId', ProductsController.createProduct)

    return router
  }
}
