import mongoose from "mongoose"

const clientSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    }, 
    status: {
        type: Boolean,
        default: false
    },
    bill: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products'
            },
            addedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    cards: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products'
            },
            count: {
                type: Number,
                default: 10
            }
        }
    ],
}, { timestamps: true })

const Client = mongoose.model('Client', clientSchema)

export default Client