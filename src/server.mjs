import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import itemsRouter from './routers/items.router.mjs';
import cartRouter from './routers/cart.router.mjs';
import sessionsRouter from './routers/sessions.router.mjs';
import usersRouter from './routers/users.router.mjs';
import cookieParser from "cookie-parser";

import initializePassport from './config/passport.config.mjs';
import passport from 'passport';
import session from 'express-session'
import cookiesRouter from './routers/cookies.router.mjs';
import MongoStore from 'connect-mongo';


const app = express();
const corsOptions = {
  origin: 'http://localhost:3000', // Especifica el dominio permitido
  methods: 'GET,POST,PUT,DELETE', // Especifica los métodos permitidos
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://tomitorres93:rodolfowalsh93@cluster0.xhrxoec.mongodb.net/test',
    mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
    ttl: 15
  }),
  secret: 'UserCookie',
  resave: true,
  saveUninitialized: true
}))
// Declaración de Routers:
app.use("/api/items", itemsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/users", usersRouter);
app.use("/api/cookies", cookiesRouter);
//Middleware passport
initializePassport();
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser("UserCookie"))

const SERVER_PORT = 3001
app.listen(SERVER_PORT, () => {
  console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
});
// Mueve la conexión a MongoDB fuera del servidor
const connectMongoDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://tomitorres93:rodolfowalsh93@cluster0.xhrxoec.mongodb.net/test');

  
  } catch (error) {
    console.error("No se pudo conectar a la BD usando Moongose: " + error);
    process.exit();
  }
};

connectMongoDB();





