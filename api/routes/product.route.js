import express from 'express'

import { verifyToken } from '../middleware/verifyToken.js'

import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js'

const router = express.Router()

router.get('/', getProducts)
router.get('/', getProduct)
router.post('/', createProduct)
router.put('/', updateProduct)
router.delete('/', deleteProduct)

export default router