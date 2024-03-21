import Product from '../models/product.model.js'
import { errorHandler } from '../middleware/errorHandler.js'

export const getProducts = async (req, res, next) => {
    const userId = req.user.id
    try {
        const products = await Product.find({ user: userId }).populate('category').exec()
        if(products.length < 0) {
            return errorHandler(400, `Aucun produit existant`)
        }
        res.json(products)
    } catch (error) {
        next(error)
    }
}
export const getProduct = async (req, res, next) => {}

export const createProduct = async (req, res, next) => {
    const userId = req.user.id
    const { name, category, quantity, price } = req.body
    if(!name || name === "" || !category || category === "" || quantity === "" || !price || price === "") {
        return next(errorHandler(401, `Tous les champs doivent être complétés`))
    }
    try {
        const existingproduct = await Product.findOne({ name }).exec()
        if(existingproduct) {
            return next(errorHandler(401, `Le produit ${name} est déjà existant`))
        }

        const newProduct = new Product({
            user: userId,
            name,
            category,
            quantity,
            price
        })
        await newProduct.save()
        res.json(`Le produit ${name} a été créé avec succès`)
    } catch (error) {
        next(error)
    }
}

export const updateProduct = async (req, res, next) => {}

export const deleteProduct = async (req, res, next) => {}