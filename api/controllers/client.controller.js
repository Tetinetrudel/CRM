import { errorHandler } from "../middleware/errorHandler.js"
import Client from '../models/client.model.js'

export const getClients = async (req, res, next) => {
    const userId = req.user.id
    try {
        const clients = await Client.find({ user: userId }).exec()
        if(clients.length < 0) {
            return errorHandler(400, `Aucun client existant`)
        }
        res.json(clients)
    } catch (error) {
        next(error)
    }
}

export const getClient = async (req, res, next) => {}
export const createClient = async (req, res, next) => {
    const userId = req.user.id
    const { name, email } = req.body
    if(!name || name === "" || !email || email === "") {
        return next(errorHandler(401, `Tous les champs doivent être complétés`))
    }
    try {
        const existingClient = await Client.findOne({ email, user: userId}).exec()
        if(existingClient) {
            return next(errorHandler(401, `Client déjà existant`))
        }
        const newClient = new Client({
            user: userId,
            name,
            email
        })
        await newClient.save()
        res.json(`${name} a été créé avec succès`)
    } catch (error) {
        next(error)
    }
}
export const updateClient = async (req, res, next) => {}
export const deleteClient = async (req, res, next) => {}