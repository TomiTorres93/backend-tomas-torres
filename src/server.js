import express from 'express';
import cors from 'cors';
import itemsRouter from './routers/items.router.js';
import cartRouter from './routers/cart.router.js';
import sessionsRouter from './routers/sessions.router.js';
import usersRouter from './routers/users.router.js';
import jwtRouter from './routers/jwt.router.js';
import ticketRouter from './routers/ticket.router.js';
import mailingRouter from './routers/mailing.router.js';
import cookieParser from "cookie-parser";
import initializePassport from './config/passport.config.js';
import passport from 'passport';
import session from 'express-session'
import cookiesRouter from './routers/cookies.router.js';
import MongoStore from 'connect-mongo';
import compression from 'express-compression';
import MongoSingleton from './config/db.js';
import performanceRouter from './routers/performance-test-router.js';
import mockRouter from './routers/mock.router.js';
import cluster from 'cluster'
import {cpus} from 'os'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'


// if(cluster.isPrimary) {
//   const processors = cpus().length
//   for(let i = 0; i < processors -1; i++) {
//     cluster.fork()
//   }
// } else {

// }


// **BASE
import { addLogger } from './config/logger_BASE.js';
// import { addLogger } from './config/logger_CUSTOM.js';

const app = express();
const corsOptions = {
  origin: ['https://backend-tomitorres.netlify.app', "http://localhost:3000"],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};



app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
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
    mongoUrl: 'mongodb+srv://tomitorres93:rodolfowalsh93@cluster0.xhrxoec.mongodb.net/?retryWrites=true&w=majority',
    ttl: 15
  }),
  secret: 'UserCookie',
  resave: true,
  saveUninitialized: true
}));

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


const SERVER_PORT =  process.env.PORT || 80;

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




