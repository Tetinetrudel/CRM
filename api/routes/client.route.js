import express from 'express'

import { verifyToken } from '../middleware/verifyToken.js'

import { getClients, getClient, createClient, updateClient, deleteClient } from '../controllers/client.controller.js'

const router = express.Router()

router.get('/', verifyToken, getClients)
router.get('/:id', getClient)
router.post('/create-client', verifyToken, createClient)
router.put('/update-client/:id', updateClient)
router.delete('/delete-client/:id', deleteClient)

export default router