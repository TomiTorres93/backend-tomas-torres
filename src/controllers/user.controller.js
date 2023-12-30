import { Router } from "express";
import UsersService from "../services/dao/users.services.js";

const UserService = new UsersService();
const router = Router();

//Controller para obtener todos los usuarios
export const getAllUsersController = async (req, res) => {
  const data = await UserService.getAll();
  res.send(data);
};

//Controller para obtener todos los usuarios inactivos
export const delAllInactiveUsersController = async (req, res) => {
  const data = await UserService.deleteAllInactive();
  res.send(data);
}


export const authJWTcontroller = async (req, res) => {
  const userReq = req.user
  try {
    const user = await UserService.getUserByEmail(userReq.email)
    if(!user) {
      res.status(202).json({message: "User not found with ID: " + userReq.email})
    }
    res.json(user)
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: error, message: "No se pudo obtener el usuario con ID:" + userReq.email });
  }
}


export const userByEmailcontroller = async (req, res) => {
    const email = req.params; // Captura el valor del parámetro de la URL
  
    try {
      let matchedUser = await UserService.getUserByEmail(email);
      console.log(email)
      if (matchedUser) {
        res.status(200).send({ match: matchedUser }); // Enviar el valor dentro de un objeto si se encuentra un usuario
      } else {
        res.status(404).send({ message: "Usuario no encontrado" }); // Usuario no encontrado
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error, message: "No se pudo obtener el usuario." });
    }
  }

// Crear

export const createUsercontroller   = async (req, res) => {
    try {
        let {first_name, last_name, email, password, age  } = req.body
        let user = await UserService.save({ first_name, last_name, email, password, age });
        console.log(res)
        res.status(201).send({ result: 'success', payload: user })
    } catch (error) {
        console.error("No se pudo crear usuarios con moongose: " + error);
        res.status(500).send({ error: "No se pudo crear usuarios con moongose", message: error });
    }
}

//Controller para eliminar un usuario por id
export const deleteUserController = async (req, res) => {
  const uid = req.params.uid;
  try {
      const user = await UserService.deleteUser({_id:uid})
      if (user) {
          req.logger.info("Usuario eliminado con exito")
          return res.send({status: "200", message: "Usuario eliminado con exito", payload: user});
      }else{
          req.logger.error("Error al buscar el usuario")
          return res.status(401).send({ message: "Usuario no valido" });
      }
  } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor', details: error.message });  
      
  }
}


//controller para actualizar un usuario
export const updateUserController = async (req, res) => {
  const uid = req.params.uid;
  try {
      const {first_name, last_name, email, age, role, last_connection, documents} = req.body;
      const data = {
          first_name,
          last_name,
          email,
          age,
          role,
          last_connection,
          documents
      }
      const user = await UserService.updateUser({_id: uid}, data);
      if (user) {
          req.logger.info("Usuario actualizado con éxito")
          return res.send({status: "200", message: "Usuario actualizado con éxito", payload: user});
      }else{
          req.logger.error("Error al actualizar el usuario")
          return res.status(401).send({ message: "Usuario no válido" });
      }

  } catch (error) {
      res.status(500).json({ error: 'Error del servidor', details: error.message });
  }
  

}


//controller subir img de perfil
export const imgProfileController = async (req, res) => {
  try {
      let email = req.params.user;
  let path = "../profile/"+(req.file.filename)
  const user = await UserService.uploadAvatar(email, path);
  if (user) {
      req.logger.info("Imagen de perfil subida con exito")
      return res.status(200).send({ message: "Imagen de perfil subida con exito" }); 
      
  }else{
      req.logger.error("Error al subir la imagen de perfil")
  }  
  }catch (error) {
      res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
};

//controller subir documentos (DU)
export const userDUController = async (req, res) => {
  try {
      let email = req.params.user;
      let path = "../documents/"+(req.file.filename)
      const user = await UserService.uploadDoc(email, path, "DU");
      if (user) {
          req.logger.info("Documento subido con exito")
          return res.status(200).send({ message: "Documento subido con exito" }); 
      }else{
          req.logger.error("Error al subir el documento")
      }
  } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }



};

//controller subir documentos (CD)
export const userCDController = async (req, res) => {
  try {
      let email = req.params.user;
  let path = "../documents/"+(req.file.filename)
  const user = await UserService.uploadDoc(email,path, "CD");
  if (user) {
      req.logger.info("Documento subido con exito")
      return res.status(200).send({ message: "Documento subido con exito" }); 
  }else{
      req.logger.error("Error al subir el documento")
  };
  } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
};
//controller subir documentos (EC)
export const userECController = async (req, res) => {
  try {
      let email = req.params.user;
      let path = "../documents/"+(req.file.filename)
      const user = await UserService.uploadDoc(email,path,"EC");
      if (user) {
          req.logger.info("Documento subido con exito")
          return res.status(200).send({ message: "Documento subido con exito" }); 
      }else{
          req.logger.error("Error al subir el documento")
      };    
  } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
}


export default router;