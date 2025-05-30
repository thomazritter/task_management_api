import Database from '../connections/database.js'
import { constants } from '../utils/constants.js';

export default class ProductsController {
  // POST localhost:3001/api/products/seed
  static seed = async (req, res) => {
    try {
      const result = await Database.seed()
      console.log(result)
      res.status(200).json({ message: 'Seeded', data: result })
    } catch (e) {
      console.log(e)
      res.status(500).json({ data: e })
    }
  }

  // GET localhost:3001/api/products
  static getProducts = async (req, res) => {
    try {
      const result = await Database.query(constants.QUERIES.ALL_PRODUCTS)
      res.status(200).json({ data: result })
    } catch (e) {
      console.error('error fetching products list', e.message)
      res.status(500).json({ data: e })
    }
  }

  // GET localhost:3001/api/products/1
  static getProductById = async (req, res) => {
    const { id } = req.params

    try {
      const result = await Database.query(constants.QUERIES.SPECIFIC_ID_PRODUCTS, [id])
      res.status(200).json({ data: result })
    } catch (e) {
      console.error('error fetching product', e.message)
      res.status(500).json({ data: e })
    }
  }

  // GET localhost:3001/api/products/category/1
  static getProductByCategory = async (req, res) => {
    const { id } = req.params

    try {
      const result = await Database.query(constants.QUERIES.SPECIFIC_CATEGORY_PRODUCTS, [id])
      res.status(200).json({ data: result })
    } catch (e) {
      console.error('error fetching product', e.message)
      res.status(500).json({ data: e })
    }
  }

  // POST localhost:3001/api/products
  static createProduct = (req, res) => {
    const { product } = req.body
    // {
    //   produto_nome: "Anel bababa",
    //   produto_preco: 10,
    //   produto_descricao: "the lazy fox",
    //   produto_material: "Ferro",
    //   produto_categoria_id: 1
    // }

    try {
      Database.query(constants.QUERIES.CREATE_PRODUCT, [product.name, product.category_id, product.description, product.price])
      console.log(`product ${product} created!`)
      res.status(200).json({ data: "Product Created" })
    } catch (e) {
      console.error('error creating product', e.message)
      res.status(500).json({ data: e })
    }
  }

  // DELETE localhost:3001/api/products/1
  static deleteProductById = (req, res) => {
    const { id } = req.params

    try {
      Database.query(constants.QUERIES.DELETE_PRODUCT, [id])
      console.log(`product ${product} deleted!`)
      res.status(200).json({ data: `Product ${id} Deleted` })
    } catch (e) {
      console.error('error deleting product', e.message)
      res.status(500).json({ data: e })
    }
  }
}