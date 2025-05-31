import Product from '../models/product.js';

export default class ProductsController {
  // POST localhost:3001/api/products/seed
  static seed = async (req, res) => {
    try {
      // Example seed logic (replace with actual data)
      const products = await Product.bulkCreate([
        { name: 'Product 1', price: 10.0, description: 'Description 1', material: 'Material 1', categoryId: 1 },
        { name: 'Product 2', price: 20.0, description: 'Description 2', material: 'Material 2', categoryId: 2 },
      ]);
      res.status(200).json({ message: 'Seeded', data: products });
    } catch (error) {
      console.error('Error seeding products:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // GET localhost:3001/api/products
  static getProducts = async (req, res) => {
    try {
      const products = await Product.findAll();
      res.status(200).json({ data: products });
    } catch (error) {
      console.error('Error fetching products list:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // GET localhost:3001/api/products/1
  static getProductById = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json({ data: product });
    } catch (error) {
      console.error('Error fetching product:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // GET localhost:3001/api/products/category/1
  static getProductByCategory = async (req, res) => {
    const { id } = req.params;
    try {
      const products = await Product.findAll({ where: { categoryId: id } });
      res.status(200).json({ data: products });
    } catch (error) {
      console.error('Error fetching products by category:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // POST localhost:3001/api/products
  static createProduct = async (req, res) => {
    const { name, price, description, material, categoryId } = req.body;
    try {
      const product = await Product.create({ name, price, description, material, categoryId });
      res.status(201).json({ data: product });
    } catch (error) {
      console.error('Error creating product:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // DELETE localhost:3001/api/products/1
  static deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      await product.destroy();
      res.status(200).json({ message: 'Product deleted successfully', data: product });
    } catch (error) {
      console.error('Error deleting product:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}