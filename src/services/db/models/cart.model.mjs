import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const collectionName = 'carts';


const objectIdTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};

const numberTypeSchemaNonUniqueRequired = {
    type: Number,
    required: true
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    required: true,

};


const cartSchema = new mongoose.Schema({
    products: [{
        product: stringTypeSchemaNonUniqueRequired,
        price: numberTypeSchemaNonUniqueRequired,
        quantity: numberTypeSchemaNonUniqueRequired
    }]
  
});

cartSchema.plugin(mongoosePaginate)

export const cartModel = mongoose.model(collectionName, cartSchema);