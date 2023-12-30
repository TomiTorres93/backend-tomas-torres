import { Router } from "express";
import ItemsService from "../services/dao/items.services.js";


const itemService = new ItemsService();
const router = Router();

// // Lectura


export const getItemsController =  async (req, res) => {
    const query = req.query;

    try {
        const options = {
            page: parseInt(query.page) || 1,
            limit: parseInt(query.limit) || 2,
        }

        if (query.sort === "desc") options.sort = { price: -1 };
        if (query.sort === "asc") options.sort = { price: 1 };

     
        const items = await itemService.getAll(
            {
                query: { name: { $regex: query.filter || '', $options: 'i' } }, 
                options: options
            }
        )

        res.send({ status: 'success', payload: items.docs, pagination: items.pagination });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los items." });
    }
}

export const getItemsByIdController =  async (req, res) => {

    try {
        const itemId = req.params.id;
        const body = req.body.quantity;
        const item = await itemService.getItemByIdAndDeduce(itemId, body);
        if (item.success === false) {
            return res.status(404).send({ error: 'item no encontrado' });
        }
        res.status(200).send(item);
    } catch (error) {
        console.error('Error al obtener el item por ID:', error);
        res.status(500).send({ error: 'Error al obtener el item por ID' });
    }
}


export const countController = async (req,res)=>{
    try {
        let countedItems = await itemService.countItems();
        res.status(200).send({ count: countedItems }); // Enviar el valor dentro de un objeto
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los items." });
    }
    
}

export const matchController = async (req,res)=>{
    const parametroId = req.params.parametroId; // Captura el valor del parámetro de la URL

    try {
        let matchedItems = await itemService.matchItems(Number(parametroId));
        res.status(200).send({ match: matchedItems }); // Enviar el valor dentro de un objeto
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los items." });
    }
    
}

export const groupController = async (req,res)=>{

    try {
        let groupedItems = await itemService.groupItems();
        res.status(200).send({ group: groupedItems }); // Enviar el valor dentro de un objeto
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los items." });
    }
    
}

// Crear
export const createController = async (req, res) => {
    try {
        let {name, description, category, stock, size, price  } = req.body
        let user = await itemService.save({ name, description, category, stock, size, price });
        res.status(201).send({ result: 'success', payload: user })
    } catch (error) {
        console.error("No se pudo crear usuarios con moongose: " + error);
        res.status(500).send({ error: "No se pudo crear usuarios con moongose", message: error });
    }
}

export const putController =  async (req, res) => {
    try {
        let userUpdated = req.body;
        let user = await userModel.updateOne({ _id: req.params.id }, userUpdated);
        res.status(202).send(user);
    } catch (error) {
        console.error("No se pudo obtener usuarios con moongose: " + error);
        res.status(500).send({ error: "No se pudo obtener usuarios con moongose", message: error });
    }
 }


// // DELETE
export const deleteController = async (req, res) => {
    try {
        let { id } = req.params;
        let result = await userModel.deleteOne({ _id: id })
        res.status(202).send({ status: "success", payload: result });
    } catch (error) {
        console.error("No se pudo obtener usuarios con moongose: " + error);
        res.status(500).send({ error: "No se pudo obtener usuarios con moongose", message: error });
    }
}




export default router;