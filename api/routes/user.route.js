import express from 'express'

import { verifyToken } from '../middleware/verifyToken.js'

import { signup, updateUser,  deleteUser, updatePassword } from '../controllers/user.controller.js'

const router = express.Router()

router.post('/create-user', signup)
router.put('/update-user', verifyToken, updateUser)
router.put('/update-password', verifyToken, updatePassword)
router.delete('/delete-user/:userId', verifyToken, deleteUser)

export default router