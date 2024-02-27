import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../middleware/errorHandler.js'

export const signin = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password || email === '' || password === '') {
      next(errorHandler(400, 'Veuillez compléter tous les champs avant de poursuivre votre connection'))
    }
    try {
      const validUser = await User.findOne({ email })
      if (!validUser) {
        return next(errorHandler(404, `Données d'identifications invalides`))
      }
      const validPassword = bcryptjs.compareSync(password, validUser.password)
      if (!validPassword) {
        return next(errorHandler(400, `Données d'identifications invalides`))
      }
      const token = jwt.sign(
        { id: validUser._id},
        process.env.JWT_SECRET
      )
      const { password: pass, ...rest } = validUser._doc
      res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest)
    } catch (error) {
      next(error)
    }
}

export const google = async (req, res, next) => {}

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('Déconnexion réussi')
  } catch (error) {
    next(error)
  }
}