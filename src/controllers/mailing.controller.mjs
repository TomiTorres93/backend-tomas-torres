import { Router } from 'express';
import nodemailer from 'nodemailer'

const router = Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
     user: 'tomitorres.93@gmail.com',
     pass: 'lalb xkqj zbql xnez',
 
 }});
export const sendEmailController = async  (req, res) => {
    const { recipient, subject, mailBody } = req.body;
  
    // Detalles del correo electrónico
    const mailOptions = {
      from: "noreply@mailer.com.ar",
      to: recipient,
      subject: subject,
      html: mailBody,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(`Error al enviar el correo: ${error.message}`);
      } else {
        return res.status(200).send(`Correo enviado: ${info.response}`);
      }
    });
  }



export default router;