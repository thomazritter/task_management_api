import Product from '../models/product.js';

export default class ProductsController {
  static seed = async (req, res) => {
    try {
      const products = await Product.bulkCreate([
        { name: 'Product 1', price: 10.0, description: 'Description 1', material: 'Material 1', categoryId: 1 },
        { name: 'Product 2', price: 20.0, description: 'Description 2', material: 'Material 2', categoryId: 2 },
      ]);
      res.status(200).json({ message: 'Database seeded successfully', data: products });
    } catch (error) {
      console.error('Seeding error:', error.message);
      res.status(500).json({ error: 'Failed to seed database' });
    }
  };

  static getProducts = async (req, res) => {
    try {
      const products = await Product.findAll();
      res.status(200).json({ data: products });
    } catch (error) {
      console.error('Fetching products error:', error.message);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  };

  static getProductById = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json({ data: product });
    } catch (error) {
      console.error('Fetching product error:', error.message);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  };

  static getProductByCategory = async (req, res) => {
    const { id } = req.params;
    try {
      const products = await Product.findAll({ where: { categoryId: id } });
      res.status(200).json({ data: products });
    } catch (error) {
      console.error('Fetching products by category error:', error.message);
      res.status(500).json({ error: 'Failed to fetch products by category' });
    }
  };

  static createProduct = async (req, res) => {
    const { name, price, description, material, categoryId } = req.body;
    try {
      const product = await Product.create({ name, price, description, material, categoryId });
      res.status(201).json({ data: product });
    } catch (error) {
      console.error('Creating product error:', error.message);
      res.status(500).json({ error: 'Failed to create product' });
    }
  };

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
      console.error('Deleting product error:', error.message);
      res.status(500).json({ error: 'Failed to delete product' });
    }
  };
}