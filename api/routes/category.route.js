import express from 'express'

import { verifyToken } from '../middleware/verifyToken.js'

import { getCategories, getCategory, createCategory, updateCategory, deleteCategory } from '../controllers/category.controller.js'

const router = express.Router()

router.get('/', getCategories)
router.get('/:id', getCategory)
router.post('/create-category', createCategory)
router.put('/update-category/:id', updateCategory)
router.delete('/delete-category/:id', deleteCategory)

export default router