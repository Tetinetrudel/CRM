import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    picture: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    }
})

const Category = mongoose.model('Category', categorySchema)

export default Category