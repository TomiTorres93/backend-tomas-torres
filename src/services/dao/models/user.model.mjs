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
    },
    carts:{
        type:[
            {
                cart:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'carts'
                },
            }
        ],
        default: [],
    },
    documents:{
        type:[
            {
                name: String,
                reference : String,
                status : Boolean
            },
        ]
    },
    
    last_connection:String,
    img_profile: String,
})



userSchema.plugin(mongoosePaginate)

export const userModel = mongoose.model(collectionName, userSchema);