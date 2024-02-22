import express from 'express'

import { verifyToken } from '../middleware/verifyToken.js'

import { getCategories, getCategory, createCategory, updateCategory, deleteCategory } from '../controllers/category.controller.js'

const router = express.Router()

router.get('/', getCategories)
router.get('/', getCategory)
router.post('/', createCategory)
router.put('/', updateCategory)
router.delete('/', deleteCategory)

export default router