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



const githubUserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    age: Number,
    loggedBy: String
});

githubUserSchema.plugin(mongoosePaginate)

export const githubUserModel = mongoose.model(collectionName, githubUserSchema);