import { Router } from "express";
import ticketService from "../services/dao/ticket.services.mjs";


const TicketService = new ticketService();
const router = Router();


export const getTicketController = async (req, res) => {
    const query = req.query;

    try {
        const tickets = await TicketService.getAll(
        )

        res.send({ status: 'success', payload: tickets });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los tickets." });
    }
}

// Crear

export const createTicketcontroller   = async (req, res) => {
    try {
        let {code, purchase_datetime, amount, purchaser } = req.body
        let ticket = await TicketService.createTicket({ code, purchase_datetime, amount, purchaser });
        console.log(res)
        res.status(201).send({ result: 'success', payload: ticket })
    } catch (error) {
        console.error("No se pudo crear usuarios con moongose: " + error);
        res.status(500).send({ error: "No se pudo crear usuarios con moongose", message: error });
    }
}


export const getTicketByIdController = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const ticket = await TicketService.getTicketsById(ticketId);
        if (!ticket) {
            return res.status(404).send({ error: 'Ticket no encontrado' });
        }
        res.status(200).send(ticket);
    } catch (error) {
        console.error('Error al obtener el ticket por ID:', error);
        res.status(500).send({ error: 'Error al obtener el ticket por ID' });
    }
}





export default router;