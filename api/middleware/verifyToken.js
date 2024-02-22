import jwt from 'jsonwebtoken'
import { errorHandler } from './errorHandler.js'
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token
  console.log(token)
  if (!token) {
    return next(errorHandler(401, 'Non autorisé'))
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Non autorisé'))
    }
    req.user = user
    next()
  })
}