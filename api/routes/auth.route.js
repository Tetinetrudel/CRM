import express from 'express'

import { verifyToken } from '../middleware/verifyToken.js'

import { signin, google, signout } from '../controllers/auth.controller.js'


const router = express.Router()

router.post('/google', google)
router.post('/sign-in', signin)
router.post('/sign-out', signout)

export default router