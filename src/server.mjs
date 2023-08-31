import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import itemsRouter from './routers/items.router.mjs';
import cartRouter from './routers/cart.router.mjs';
import session from 'express-session'
import cookiesRouter from './routers/cookies.router.mjs';

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000', // Especifica el dominio permitido
  methods: 'GET,POST,PUT,DELETE', // Especifica los métodos permitidos
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secretCoder',
  resave: true,
  saveUninitialized: true
}))
// Declaración de Routers:
app.use("/api/items", itemsRouter);
app.use("/api/carts", cartRouter);
// app.use("/", cookiesRouter);



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





