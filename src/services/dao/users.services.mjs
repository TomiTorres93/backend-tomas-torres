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

    updateUser = async (id, user) => {
      let result = await userModel.updateOne(id, user);
      if (result){
          return result;
      }
      else{
          return null
      }
  };
  deleteUser = async (id) => {
    let result = await userModel.deleteOne(id);
    if (result){
        return result;
    }
    else{
        return null
    }
};

deleteAllInactive = async () => {
    const fechaActual = new Date();
    const users = await userModel.find();
    const usersInactive = users.filter(user => {
        const fechaUltimaConexion = new Date(user.last_connection);
        const diff = fechaActual - fechaUltimaConexion;
        const minutos = Math.floor(diff / (1000 * 60));
        return minutos > 2880;
    })
    // Recorre el array de usuarios inactivos
    for (const user of usersInactive) {
        const mailOptions = {
        from: envConfig.gmailUser,
        to: user.email,
        subject: `Hola ${user.first_name}, tu cuenta ha sido eliminada`,
        text: `Su cuenta ha sido eliminada por inactividad. Por politicas de la empresa si la cuenta esta más de 48 hs sin movimientos se elimina de forma automatica.
        
        Esperamos verte pronto.
        Saludos`,
        };
        transporter.sendMail(mailOptions,(error, info)=>{
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.messageId);
            }
        });
    };
    const result =  await userModel.deleteMany({_id: {$in: usersInactive.map(user => user._id)}});
    if (result){
        return result;
    }
    else{
        return null
    }
};

uploadAvatar = async (email, path) => {
    let userUpdate = await userModel.updateOne({email: email}, {img_profile: path})
    if (userUpdate){
        return userUpdate;
    }
    else{
        return null
    }
};


uploadDoc = async (email, path, docName) => {
    const exists = await userModel.findOne({ email });
    const docs = exists.documents;
    const duExists = docs.some(doc => doc.name === docName);
    const names = ["DU", "EC", "CD"];        

    async function premium () {
        const exists = await userModel.findOne({ email: email });
        const docs = exists.documents;
        return docs.filter((objeto) => {
            return names.includes(objeto.name);
        }).length === 3;
        };

    if (duExists) {
        let delDoc = await userModel.updateOne({ email: email },
            { $pull: { documents: { name: docName } } });
        let user = await userModel.updateOne({ email: email },
            { $push: { documents: { name: docName, reference: path, status: true } } })

        return user
    }else{
        let user = await userModel.updateOne({ email: email     },
        { $push: { documents: { name: docName, reference: path, status: true } } })
        if (user) {
            const isPremium = await premium();
            if (isPremium) {
                await userModel.updateOne({ email },
                    { $set: { role: "premium" } });
            }
        }
        return user
    };
};

}