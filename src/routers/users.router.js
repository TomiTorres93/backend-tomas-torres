import { Router } from "express";
import UsersService from "../services/dao/users.services.js";
import {authToken, upProdImg, upProfileImg, upUserDocs} from "../utils.js"
import passport from "passport";
import {authJWTcontroller, userByEmailcontroller, getAllUsersController, createUsercontroller,updateUserController, deleteUserController, userDUController, userECController, userCDController} from "../controllers/user.controller.js";

const UserService = new UsersService();
const router = Router();


router.get('/', passport.authenticate('jwt', {session: false}), authJWTcontroller);

router.get(`/userByEmail/:email`, authToken, userByEmailcontroller);

router.post('/', createUsercontroller)

// //Actualizamos un usuario en la base de datos MongoDB
router.put('/update/:uid', updateUserController)

// //Eliminar un usuario de la base de datos MongoDB
router.delete('/deleteOne/:uid', deleteUserController)

// //Obtenemos todos los usuarios de la base de datos MongoDB
router.get('/allUsers', getAllUsersController )

// //subir documentos
router.post('/uploadDocs/du/:user', upUserDocs.single('du'), userDUController)
router.post('/uploadDocs/cd/:user', upUserDocs.single('cd'), userCDController)
router.post('/uploadDocs/ec/:user', upUserDocs.single('ec'), userECController)

// //Acceso a ruta premium
router.get('/premium/:uid', )

// //autenticación
// function auth(req, res, next){
//     const role = req.params.role;
//     if (role === "admin") {
//         return next();
//     } else{
//         return res.status(403).send("Usuario no autorizado para ingresar a este recurso.");
//     }
    
// }

export default router;