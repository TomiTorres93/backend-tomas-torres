import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const collectionName = 'users';

const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};



const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: stringTypeSchemaUniqueRequired,
    password: stringTypeSchemaNonUniqueRequired,
    age: Number
});

userSchema.plugin(mongoosePaginate)

export const userModel = mongoose.model(collectionName, userSchema);