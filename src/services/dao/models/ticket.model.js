import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const collectionName = 'tickets';

const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true
};

const stringTypeSchemaUniqueNonRequired = {
    type: String,
    unique: true,
    required: false
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};

const numberTypeSchemaNonUniqueRequired = {
    type: Number,
    required: true
};

const numberTypeSchemaNonUniqueNonRequired = {
    type: Number,
    required: false
};


const ticketSchema = new mongoose.Schema({
    purchaser: stringTypeSchemaUniqueNonRequired,
    code: stringTypeSchemaUniqueNonRequired,
    purchase_datetime:  {type: Date},
    amount: numberTypeSchemaNonUniqueNonRequired,
});


ticketSchema.plugin(mongoosePaginate)

export const ticketModel = mongoose.model(collectionName, ticketSchema);