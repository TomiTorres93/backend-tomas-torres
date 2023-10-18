import { Router } from "express";
import UsersService from "../services/dao/users.services.mjs";

const UserService = new UsersService();
const router = Router();

// // Lectura


// router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  
//   try {
//     res.send({user: req.user})
//     console.log(req.user)
//   } catch (error) {
//       console.error(error);
//       res.status(500).send({ error: error, message: "No se pudo obtener el usuario." });
//   }
// });


// router.get('/', async (req, res) => {
//     const query = req.query;

//     try {
//         const options = {
//             page: parseInt(query.page) || 1,
//             limit: parseInt(query.limit) || 10,
//         }
//         const users = await UserService.getAll(
//             {
//                 query, 
//                 options: options
//             }
//         )

//         res.send({ status: 'success', payload: users.docs, pagination: users.pagination });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ error: error, message: "No se pudo obtener el usuario." });
//     }
// });


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




export default router;