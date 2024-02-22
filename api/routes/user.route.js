import express from 'express'

import { verifyToken } from '../middleware/verifyToken.js'

import { signup, updateUser,  deleteUser } from '../controllers/user.controller.js'

const router = express.Router()

router.post('/', signup)
router.put('/', updateUser)
router.delete('/', deleteUser)

export default router