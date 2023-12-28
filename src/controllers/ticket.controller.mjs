import { Router } from "express";
import ticketService from "../services/dao/ticket.services.mjs";
import nodemailer from 'nodemailer'

const TicketService = new ticketService();
const router = Router();



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
     user: 'tomitorres.93@gmail.com',
     pass: 'lalb xkqj zbql xnez',
 
 }});
 export const sendEmailController = async (req, res) => {
    try {
        const { recipient, subject } = req.body;
      
        // Detalles del correo electrónico
        const mailOptions = {
          from: "noreply@mailer.com.ar",
          to: recipient,
          subject: subject || "Asunto predeterminado", // Asigna un asunto predeterminado si no se proporciona
          html: "Gracias por tu compra",
        };
      
        const emailResponse = await new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(`Error al enviar el correo: ${error.message}`);
                } else {
                    resolve(`Correo enviado: ${info.response}`);
                }
            });
        });

        res.status(200).send(emailResponse);
    } catch (error) {
        console.error("Error al enviar el correo electrónico: " + error);
        res.status(500).send({ error: "Error al enviar el correo electrónico", message: error });
    }
};

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

export const createTicketController = async (req, res) => {
    try {
        const { code, purchase_datetime, amount, purchaser } = req.body;
        const ticket = await TicketService.createTicket({ code, purchase_datetime, amount, purchaser });
        // Envía el correo electrónico al purchaser del nuevo ticket
        const emailResponse = await sendEmailController({
            body: {
                recipient: purchaser,
                subject: "Asunto del Correo Electrónico",  // Puedes personalizar el asunto
            }
        }, res);

        res.status(201).send({ result: 'success', payload: ticket, emailResponse });
    } catch (error) {
        console.error("No se pudo crear el ticket con Mongoose: " + error);
        res.status(500).send({ error: "No se pudo crear el ticket con Mongoose", message: error });
    }
};

export const webhookMPController = async (req, res) => {
    try {
        const evento = req.body;
        const newTicket = {
            purchaser: req.query.purchaser,
            code: req.query.code,
            amount: req.query.amount,
            purchase_datetime: req.query.purchase_datetime, // Corregir la propiedad duplicada
        };

        switch (evento.type) {
            case 'payment':
                await createTicketController({ body: newTicket }, res); // Pasar req y res correctamente
                break;
            case 'something_else':
                // Manejar otros casos
                break;
            default:
                console.log('Evento no manejado:', evento);
        }

        res.status(200).end();
    } catch (error) {
        console.error("Error en el controlador del webhook: " + error);
        res.status(500).send({ error: "Error en el controlador del webhook", message: error });
    }
};


export default router;