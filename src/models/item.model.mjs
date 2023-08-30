import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const itemCollection = 'items';

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Nombre es requerido']
    },
    description: String,
    stock: Number,
    size: Number,
})

itemSchema.plugin(mongoosePaginate)

export const itemModel = mongoose.model(itemCollection, itemSchema);