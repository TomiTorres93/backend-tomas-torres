import passport from 'passport';
import passportLocal from 'passport-local';
import { userModel } from '../services/db/models/user.model.mjs';
import { createHash, isValidPassword } from '../utils.mjs';
import  GitHubStrategy from 'passport-github2'


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

//UPDATE
passport.use('modify', new localStrategy({ passReqToCallback: true, usernameField: 'email' },
  async (req, username, password, done) => {
    const { first_name, last_name, age, email } = req.body;

    try {
      const user = await userModel.findOne({ email });

      if (!user) {
        return done(null, false, { message: "El usuario no existe." });
      }

      // Modificar los datos del usuario
      user.first_name = first_name;
      user.last_name = last_name;
      user.age = age;
      user.email = email;
      user.password =  createHash(password)


      // Guardar los cambios en la base de datos
      await user.save();

      return done(null, user);
    } catch (error) {
      return done("Error modificando al usuario: " + error);
    }
  }
));


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


//GITHUB STRATEGY

passport.use('github', new GitHubStrategy({
    clientID: 'Iv1.ad8241c45238ff04',
    clientSecret: 'a6f528128eb2776017bf090ea478cf765dcf9162',
    callbackURL: 'http://localhost:3001/api/sessions/githubcallback'
},

async (accessToken, refreshToken, profile, done) => {
  console.log("Profile obtenido")
  console.log(profile)

  try {
    const user = await userModel.findOne({email: profile._json.email})
    console.log("Profile encontrado!!")

    if(!user) {
        let newUser = {
            first_name: profile._json.name,
            last_name: '',
            email: profile._json.email,
            password: '',
            age: '',
            loggedBy: "GitHub"
        }
        const result = await userModel.create(newUser)
        done(null, result)
    } else {
     return  done(null, user)
    }


} catch (error) {
    console.log(error)
}


}
))

//FUNCIONES DE SERIALIZACIÓN (qué datos del usuario deben almacenarse en la sesión) Y DESERIALIZACIÓN (recuperar los datos del usuario a partir de una sesión)

passport.serializeUser( (user, done) => {
    done(null, user._id)
})
passport.deserializeUser( async (id, done) => {
    try {
        let user = await userModel.findById(id)
        done(null, user)
    } catch (error) {
        console.error("Error deserializando el usuario: " + error)
    }
   
})




}

export default initializePassport;
