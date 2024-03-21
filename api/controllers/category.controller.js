import { errorHandler } from "../middleware/errorHandler.js"
import Category from '../models/category.model.js'

export const getCategories = async (req, res, next) => {
    const userId = req.user.id
    try {
        const categories = await Category.find({ user: userId }).exec()
        if(categories.length < 0) {
            return errorHandler(400, `Aucune catégorie existante`)
        }
        res.json(categories)
    } catch (error) {
        next(error)
    }
}

export const getCategory = async (req, res, next) => {}

export const createCategory = async (req, res, next) => {
    const userId = req.user.id
    const { name, picture } = req.body
    if(!name || name === "") {
        return next(errorHandler(401, `Tous les champs doivent être complétés`))
    }
    try {
        const existingCategory = await Category.findOne({ name }).exec()
        if(existingCategory) {
            return next(errorHandler(401, `La catégorie ${name} existe déjà`))
        }
        const newCategory = new Category({
            user: userId,
            name,
            picture
        })
        await newCategory.save()
        res.json('Catégorie créer avec succès')
    } catch (error) {
        next(error)
    }
}
export const updateCategory = async (req, res, next) => {}
export const deleteCategory = async (req, res, next) => {}