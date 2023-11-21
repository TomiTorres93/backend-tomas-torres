import {userModel} from "./models/user.model.mjs";

export default class UsersService {
    constructor() { 
    }


    getAll = async ({ query, options }) => {
        const result = await userModel.paginate(query, options);
        return {
           docs: result.docs.map(user => user.toObject()),
            pagination: {
                page: result.page,
                limit: result.limit,
                totalDocs: result.totalDocs,
                totalPages: result.totalPages,
                hasNextPage: result.hasNextPage,
                hasPrevPage: result.hasPrevPage,
                prevLink: result.prevLink,
                nextLink: result.nextLink,
            }
        }  
    }


    save = async (user) => {
        let result = await userModel.create(user);
        return result;
    }


    
    getUserByEmail = async (email) => {
        try {
          let userByEmailResult = await userModel.findOne({ email: email });
          return userByEmailResult;
        } catch (error) {
          return error;
        }
      }
      

    userExists = async (email) => {
        try {
            // Utiliza el método findOne para buscar un usuario con el correo electrónico dado
            const user = await userModel.findOne({ email });
        
            // Si se encuentra un usuario, user contendrá la información del usuario
            if (user) {
              console.log(`El usuario con el correo electrónico ${email} existe.`);
              return true;
            } else {
              console.log(`El usuario con el correo electrónico ${email} no existe.`);
              return false;
            }
          } catch (error) {
            console.error('Error al buscar el usuario:', error);
            throw error;
          }
    }




}