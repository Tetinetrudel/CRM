import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { corsOptions } from './utils/corsOptions.js'
import { connectDB } from './utils/dbConnect.js'

import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import clientRoutes from './routes/client.route.js'
import productRoutes from './routes/product.route.js'
import categoryRoutes from './routes/category.route.js'

dotenv.config()

const app = express()

const port = process.env.PORT || 5000

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/client', clientRoutes)
app.use('/api/product', productRoutes)
app.use('/api/category', categoryRoutes)

mongoose.connection.once('open', () => {
    console.log('Connecté à MongoDB')
    app.listen(port, () => console.log(`Le serveur fonctionne sur le port ${port}`))
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Erreur de serveur interne'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})