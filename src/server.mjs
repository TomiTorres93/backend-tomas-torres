import express from 'express';
import cors from 'cors';
import itemsRouter from './routers/items.router.mjs';
import cartRouter from './routers/cart.router.mjs';
import sessionsRouter from './routers/sessions.router.mjs';
import usersRouter from './routers/users.router.mjs';
import jwtRouter from './routers/jwt.router.mjs';
import ticketRouter from './routers/ticket.router.mjs';
import mailingRouter from './routers/mailing.router.mjs';
import cookieParser from "cookie-parser";
import initializePassport from './config/passport.config.mjs';
import passport from 'passport';
import session from 'express-session'
import cookiesRouter from './routers/cookies.router.mjs';
import MongoStore from 'connect-mongo';
import compression from 'express-compression';
import MongoSingleton from './config/db.mjs';
import performanceRouter from './routers/performance-test-router.mjs';
import mockRouter from './routers/mock.router.mjs';
import cluster from 'cluster'
import {cpus} from 'os'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'


if(cluster.isPrimary) {
  const processors = cpus().length
  for(let i = 0; i < processors -1; i++) {
    cluster.fork()
  }
} else {

}


// **BASE
import { addLogger } from './config/logger_BASE.mjs';
// import { addLogger } from './config/logger_CUSTOM.mjs';

const app = express();
const corsOptions = {
  origin: ['https://backend-tomitorres.netlify.app', 'https://backend-tomitorres.onrender.com', 'http://localhost:3002', 'http://localhost:3001', 'http://localhost:3000'],
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
};



app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const swaggerOptions = {
  definition: {
      openapi: "3.0.1",
      info: {
          title: "Documentación API Adopme",
          description: "Documentación para uso de Swagger"
      }
  },
  // aqui van a estar todas las especificaciones tecnicas de mis apis
  apis: ['./src/docs/**/*.yaml']
}

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

// **BASE
app.use(addLogger);

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
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpecs))
app.use("/api/items", itemsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/users", usersRouter);
app.use("/api/cookies", cookiesRouter);
app.use("/api/jwt", jwtRouter);
app.use("/api/ticket", ticketRouter);
app.use("/api/mockproducts", mockRouter);

app.use("/api/performance", performanceRouter);
app.get("/api/loggerTest", (req, res) => {
  // Logica 
  // req.logger.warn("Prueba de log level warn --> en Endpoint"); // **BASE
  // req.logger.warning("Prueba de log level warning --> en Endpoint"); // **CUSTOM
  res.send("Prueba de logger!");
});

// // MAILING
app.use("/api/email", mailingRouter);
// app.use("/api/sms", );
//Middleware passport
initializePassport();
app.use(passport.initialize())
app.use(passport.session())


const SERVER_PORT = 3001
app.listen(SERVER_PORT, () => {
  console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
});



const mongoInstance = async () => {
  try {
      await MongoSingleton.getInstance();
  } catch (error) {
      console.log(error);
  }
};
mongoInstance();




