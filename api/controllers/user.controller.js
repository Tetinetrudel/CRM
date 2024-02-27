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

export const updateUser = async (req, res, next) => {
    const { company, email, profilePicture } = req.body
    try {
        const user = await User.findById(req.user.id).exec()
    
        if (!user) {
            return next(errorHandler(400, `L'usager n'a pas été trouvé`))
        }
    
        const duplicate = await User.findOne({ email }).collation({ locale: 'en', strength: 2 }).lean().exec()
    
        if (duplicate && duplicate?._id.toString() !== req.user.id) {
            return next(errorHandler(409, `Le courriel que vous tenté d'entrer existe déjà`))
        }
    
        user.company = company
        user.email = email
    
        if(!profilePicture) {
            user.profilePicture = user.profilePicture
        } else {
            user.profilePicture = profilePicture
        }

        user.password = user.password
        const updatedUser = await user.save()
        const { password, ...rest } = updatedUser._doc
        res.json(rest)
    } catch (error) {
        next(error)
    }
}

export const updatePassword = async (req, res, next) => {
    const { actualPassword, newPassword, confirmNewPassword } = req.body
    try {
        const user = await User.findById(req.user.id).exec()
        if (!user) {
            return next(errorHandler(400, `L'usager n'a pas été trouvé`))
        }

        const validPassword = bcryptjs.compareSync(actualPassword, user.password)
        if(!validPassword) {
            return next(errorHandler(401, `Le mot de passe actuel est érroné`))
        }
        
        if(newPassword !== confirmNewPassword) {
            return next(errorHandler(401, `Les deux nouveaux mot de passe ne sont pas identique`))
        }

        const hashPassword = bcryptjs.hashSync(newPassword, 12)

        user.company = user.company
        user.email = user.email
        user.profilePicture = user.profilePicture
        user.password = hashPassword
        const updatedUser = await user.save()
        const { password, ...rest } = updatedUser._doc
        res.json(rest)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, `Vous n'êtes pas autorisé à supprimer cet utilisateur`))
    }
    try {
      await User.findByIdAndDelete(req.params.userId)
      res.status(200).json('Compte supprimé avec succès')
    } catch (error) {
      next(error)
    }
  }

