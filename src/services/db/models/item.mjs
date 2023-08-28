import mongoose from 'mongoose';

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
    stock: stringTypeSchemaNonUniqueRequired,
    size: numberTypeSchemaNonUniqueRequired
});

export const itemModel = mongoose.model(collectionName, itemSchema);