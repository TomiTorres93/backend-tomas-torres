import { Router } from "express";
import UsersService from "../services/db/users.services.mjs";


const UserService = new UsersService();
const router = Router();

// // Lectura


router.get('/', async (req, res) => {
    const query = req.query;

    try {
        const options = {
            page: parseInt(query.page) || 1,
            limit: parseInt(query.limit) || 10,
        }
        const users = await UserService.getAll(
            {
                query, 
                options: options
            }
        )

        res.send({ status: 'success', payload: users.docs, pagination: users.pagination });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener el usuario." });
    }
});




router.get(`/userExists/:email`, async (req, res) => {
    const email = req.params.email; // Captura el valor del parámetro de la URL
  
    try {
      let matchedUser = await UserService.getUserByEmail(email);
      if (matchedUser) {
        res.status(200).send({ match: matchedUser }); // Enviar el valor dentro de un objeto si se encuentra un usuario
      } else {
        res.status(404).send({ message: "Usuario no encontrado" }); // Usuario no encontrado
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error, message: "No se pudo obtener el usuario." });
    }
  });

// Crear
router.post('/', async (req, res) => {
    try {
        let {first_name, last_name, email, password, age  } = req.body
        let user = await UserService.save({ first_name, last_name, email, password, age });
        console.log(res)
        res.status(201).send({ result: 'success', payload: user })
    } catch (error) {
        console.error("No se pudo crear usuarios con moongose: " + error);
        res.status(500).send({ error: "No se pudo crear usuarios con moongose", message: error });
    }
})




export default router;