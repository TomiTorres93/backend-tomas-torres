import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const collectionName = 'carts';

const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};

const numberTypeSchemaNonUniqueRequired = {
    type: Number,
    required: true
};


const cartSchema = new mongoose.Schema({
    name: stringTypeSchemaUniqueRequired,
    description: stringTypeSchemaNonUniqueRequired,
    category: stringTypeSchemaNonUniqueRequired,
    stock: numberTypeSchemaNonUniqueRequired,
    size: numberTypeSchemaNonUniqueRequired,
    price: numberTypeSchemaNonUniqueRequired
});

cartSchema.plugin(mongoosePaginate)

export const cartModel = mongoose.model(collectionName, cartSchema);