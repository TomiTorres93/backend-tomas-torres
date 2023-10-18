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
    password: String,
    age: Number,
    loggedBy: String,
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    }
});

userSchema.plugin(mongoosePaginate)

export const userModel = mongoose.model(collectionName, userSchema);