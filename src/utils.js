import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import {fakerES as faker} from '@faker-js/faker';
import multer from 'multer'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// IMPLEMENTACIÓN BCRYPT

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValidPassword =  (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

// JWT
export const PRIVATE_KEY = "jwtCookieToken";


/**
 * Generate token JWT usando jwt.sign:
 * Primer argumento: objeto a cifrar dentro del JWT
 * Segundo argumento: La llave privada a firmar el token.
 * Tercer argumento: Tiempo de expiración del token.
 */
export const generateJWToken = (user) => {
    return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' });
};


/**
 * Metodo que autentica el token JWT para nuestros requests.
 * OJO: Esto actúa como un middleware, observar el next.
 * @param {*} req Objeto de request
 * @param {*} res Objeto de response
 * @param {*} next Pasar al siguiente evento.
 */
export const authToken = (req, res, next) => {
    //El JWT token se guarda en los headers de autorización.
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ error: "User not authenticated or missing token." });
    }
    const token = authHeader.split(' ')[1]; //Se hace el split para retirar la palabra Bearer.
    //Validar token
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({ error: "Token invalid, Unauthorized!" });
        //Token OK
        req.user = credentials.user;
        console.log(req.user);
        next();
    });
};

//creamos base de productos con Faker
export const generateProducts = () => {
    return{
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.string.alpha(5),
        price: faker.commerce.price(),
        thumbnail: faker.image.avatar(),
        stock: faker.number.int(500),
        available: faker.datatype.boolean(),
    }
};

//Configuracion de Multer para subir archivos
function createMulterMiddleware(destination) {
    return multer({
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, destination);
        },
        filename: function (req, file, cb) {
          const email = req.params.user;
          const baseName = file.originalname.slice(file.originalname.length - 4);
          if (destination === `${__dirname}/public/profile` ){
            cb(null, `avatar_${email}_${baseName}`);
          }else if (destination === `${__dirname}/public/products`){
            cb(null, `prodImg_${email}_${baseName}`);
          }else{
            cb(null, file.fieldname +`_${email}_${baseName}`);
          
          }
          
        },
      }),
      onError: function (err, next) {
        console.log(err);
        next();
      },
    });
  }
  
  export const upProfileImg = createMulterMiddleware(`${__dirname}/public/profile`);
  export const upProdImg = createMulterMiddleware(`${__dirname}/public/products`);
  export const upUserDocs = createMulterMiddleware(`${__dirname}/public/documents`);
    

export default __dirname;