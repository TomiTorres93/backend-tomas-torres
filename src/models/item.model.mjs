import mongoose from 'mongoose';

const itemCollection = 'items';

// definimos el schema 
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


// Definimos el modelo
export const itemModel = mongoose.model(itemCollection, itemSchema);