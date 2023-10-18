import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const collectionName = 'tickets';

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


const ticketSchema = new mongoose.Schema({
    code: stringTypeSchemaUniqueRequired,
    purchase_datetime:  {type: Date},
    amount: numberTypeSchemaNonUniqueRequired,
    purchaser: stringTypeSchemaNonUniqueRequired
});


ticketSchema.plugin(mongoosePaginate)

export const ticketModel = mongoose.model(collectionName, ticketSchema);