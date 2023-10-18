import { Router } from "express";
import {getTicketController, createTicketcontroller, getTicketByIdController} from "../controllers/ticket.controller.mjs";

const router = Router();


router.get('/',  getTicketController);

// Crear un carrito nuevo
router.post('/', createTicketcontroller);

// Obtener un carrito por su ID
router.get('/:id', getTicketByIdController);


export default router;