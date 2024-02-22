import express from 'express'

import { verifyToken } from '../middleware/verifyToken.js'

import { getClients, getClient, createClient, updateClient, deleteClient } from '../controllers/client.controller.js'

const router = express.Router()

router.get('/', getClients)
router.get('/', getClient)
router.post('/', createClient)
router.put('/', updateClient)
router.delete('/', deleteClient)

export default router