import { Router } from "express";
import ItemsService from "../services/db/items.services.mjs";


const itemService = new ItemsService();
const router = Router();

// // Lectura

router.get('/', async (req,res)=>{
    try {
        let items = await itemService.getAll();
        res.send(items);
    } catch (error) {
        console.error(error);
        res.status(500).send({error:  error, message: "No se pudo obtener los items."});
    }
})


// Crear
router.post('/', async (req, res) => {
    try {
        let { name, description, stock, size } = req.body
        let user = await itemService.save({ name, description, stock, size });
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