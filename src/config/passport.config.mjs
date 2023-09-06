import passport from 'passport';
import passportLocal from 'passport-local';
import { userModel } from '../services/db/models/user.model.mjs';
import { createHash, isValidPassword } from '../utils.mjs';


// TODO: Implementacion passport
const localStrategy = passportLocal.Strategy
  
const initializePassport = () => {
//REGISTER
passport.use('register', new localStrategy({passReqToCallback: true, usernameField: 'email'},

async (req, username, password, done) => {
  const { first_name, last_name, email, age } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
        return done(null, false, { message: "El usuario ya existe." });
    }
    const user = {
        first_name,
        last_name,
        email,
        age,
        password: createHash(password) //////////
    };

    const result = await userModel.create(user);

    return done(null, result)
  } catch (error){
    return done("Error registrando al usuario: " + error)
  }
}
))

//LOGIN
passport.use('login', new localStrategy({passReqToCallback: true, usernameField: 'email'},

async (req, username, password, done) => { 
    try {
        const user = await userModel.findOne({ email: username });
        if (!user){
            console.warn("El usuario no existe: " + username)
            return done(null, false)
        }
            // VALIDACIÓN DEL PASSWORD
        if(!isValidPassword(user, password)){
            return res.status(401).send({ status: "error", error: "Incorrect credentials" });
        }
    
    
        return done(null, user)
      } catch (error){
        return done("Error registrando al usuario: " + error)
      }

 }
))


//FUNCIONES DE SERIALIZACIÓN (qué datos del usuario deben almacenarse en la sesión) Y DESERIALIZACIÓN (recuperar los datos del usuario a partir de una sesión)

passport.serializeUser( (user, done) => {
    done(null, user._id)
})
passport.deserializeUser( async (id, done) => {
    try {
        let user = await userModel.findOne(id)
        done(null, user)
    } catch (error) {
        console.error("Error deserializando el usuario: " + error)
    }
   
})

}

export default initializePassport;
