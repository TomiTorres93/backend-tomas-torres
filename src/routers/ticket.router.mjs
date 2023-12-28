import { Router } from "express";
import {getTicketController, getTicketByIdController, webhookMPController} from "../controllers/ticket.controller.mjs";

const router = Router();


router.get('/',  getTicketController);

// Obtener un carrito por su ID
router.get('/:id', getTicketByIdController);

// Procesar webhook de mercadopago
router.post('/webhook', webhookMPController);

export default router;