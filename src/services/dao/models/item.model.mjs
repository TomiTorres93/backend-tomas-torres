import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const collectionName = 'items';

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


const itemSchema = new mongoose.Schema({
    name: stringTypeSchemaUniqueRequired,
    description: stringTypeSchemaNonUniqueRequired,
    category: stringTypeSchemaNonUniqueRequired,
    stock: numberTypeSchemaNonUniqueRequired,
    size: numberTypeSchemaNonUniqueRequired,
    price: numberTypeSchemaNonUniqueRequired
});

itemSchema.plugin(mongoosePaginate)

export const itemModel = mongoose.model(collectionName, itemSchema);