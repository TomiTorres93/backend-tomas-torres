import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import itemsRouter from './routers/items.router.mjs';
import cartRouter from './routers/cart.router.mjs';
import sessionsRouter from './routers/sessions.router.mjs';
import usersRouter from './routers/users.router.mjs';
import jwtRouter from './routers/jwt.router.mjs';
import ticketRouter from './routers/ticket.router.mjs';
import cookieParser from "cookie-parser";
import initializePassport from './config/passport.config.mjs';
import passport from 'passport';
import session from 'express-session'
import cookiesRouter from './routers/cookies.router.mjs';
import MongoStore from 'connect-mongo';
import compression from 'express-compression';
import MongoSingleton from './config/db.mjs';

const app = express();
const corsOptions = {
  origin: ['http://localhost:3002', 'http://localhost:3001', 'http://localhost:3000'],
  methods: 'GET,POST,PUT,DELETE', 
    credentials: true, //included credentials as true
};

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(cookieParser())
app.use(compression({
  brotli: {enabled:true, zlib:{}}
}))
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
app.use("/api/jwt", jwtRouter);
app.use("/api/ticket", ticketRouter);
// // MAILING
// app.use("/api/email", );
// app.use("/api/sms", );
//Middleware passport
initializePassport();
app.use(passport.initialize())
app.use(passport.session())


const SERVER_PORT = 3001
app.listen(SERVER_PORT, () => {
  console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
});
// Mueve la conexión a MongoDB fuera del servidor
// const connectMongoDB = async () => {
//   try {
//     await mongoose.connect('mongodb+srv://tomitorres93:rodolfowalsh93@cluster0.xhrxoec.mongodb.net/test');

  
//   } catch (error) {
//     console.error("No se pudo conectar a la BD usando Moongose: " + error);
//     process.exit();
//   }
// };

// connectMongoDB();


const mongoInstance = async () => {
  try {
      await MongoSingleton.getInstance();
  } catch (error) {
      console.log(error);
  }
};
mongoInstance();




