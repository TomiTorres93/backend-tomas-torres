import { Router } from "express";
import cartsService from "../services/db/cart.services.mjs";


const cartService = new cartsService();
const router = Router();

// // Lectura


router.get('/', async (req, res) => {
 
});



// Crear
router.post('/', async (req, res) => {
    try {
        let {name, description, category, stock, size, price  } = req.body
        let user = await itemService.save({ name, description, category, stock, size, price });
        res.status(201).send({ result: 'success', payload: user })
    } catch (error) {
        console.error("No se pudo crear usuarios con moongose: " + error);
        res.status(500).send({ error: "No se pudo crear usuarios con moongose", message: error });
    }
})


// // PUT
// router.put('/:id', async (req, res) => {
//     try {
//         let userUpdated = req.body;
//         let user = await userModel.updateOne({ _id: req.params.id }, userUpdated);
//         res.status(202).send(user);
//     } catch (error) {
//         console.error("No se pudo obtener usuarios con moongose: " + error);
//         res.status(500).send({ error: "No se pudo obtener usuarios con moongose", message: error });
//     }
// })


// // DELETE
// router.delete('/:id', async (req, res) => {
//     try {
//         let { id } = req.params;
//         let result = await userModel.deleteOne({ _id: id })
//         res.status(202).send({ status: "success", payload: result });
//     } catch (error) {
//         console.error("No se pudo obtener usuarios con moongose: " + error);
//         res.status(500).send({ error: "No se pudo obtener usuarios con moongose", message: error });
//     }
// })




export default router;