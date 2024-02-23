import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../middleware/errorHandler.js'

export const signup = async (req, res, next) => {
    const { company, email, password, confirmPassword } = req.body
    if(!company || company === "" || !email || email === "" || !password || password === "" || !confirmPassword || confirmPassword === "") {
        return next(errorHandler(400, `Tous les champs sont obligatoires`))
    }
    try {
        const validUser = await User.findOne({ $or: [{ company }, { email }] })
        if(validUser) {
            return next(errorHandler(401, `Un usager est déjà enregistré avec ses coordonnées`))
        }
        if(password !== confirmPassword) {
            return next(errorHandler(401, `Les deux mot de passe doivent être identique`))
        }
        const hashPassword = bcryptjs.hashSync(password, 10)
        const newUser = new User({
            company,
            email,
            password: hashPassword
        })
        await newUser.save()
        res.json('Inscription réussie')
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {}

export const deleteUser = async (req, res, next) => {}

