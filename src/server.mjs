import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import itemsRouter from './routers/items.router.mjs';


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Declaración de Routers:
app.use("/api/items", itemsRouter);


const SERVER_PORT = 3001
app.listen(SERVER_PORT, () => {
  console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
});
// Mueve la conexión a MongoDB fuera del servidor
const connectMongoDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://tomitorres93:rodolfowalsh93@cluster0.xhrxoec.mongodb.net/test');


    console.log("Conectado con exito a MongoDB usando Moongose.");
  
  } catch (error) {
    console.error("No se pudo conectar a la BD usando Moongose: " + error);
    process.exit();
  }
};

connectMongoDB();





