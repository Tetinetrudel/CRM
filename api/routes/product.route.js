import express from 'express'

import { verifyToken } from '../middleware/verifyToken.js'

import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js'

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProduct)
router.post('/create-product', createProduct)
router.put('/update-product/:id', updateProduct)
router.delete('/delete-product/:id', deleteProduct)

export default router