import express from 'express'

import { verifyToken } from '../middleware/verifyToken.js'

import { signup, updateUser,  deleteUser } from '../controllers/user.controller.js'

const router = express.Router()

router.post('/create-user', signup)
router.put('/update-user', verifyToken, updateUser)
router.delete('/delete-user/:id', deleteUser)

export default router