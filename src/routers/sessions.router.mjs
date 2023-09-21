import { Router } from 'express';
import { userModel } from '../services/db/models/user.model.mjs';
import { createHash, generateJWToken, isValidPassword } from '../utils.mjs';
import cookieParser from "cookie-parser";
import passport from 'passport';

const router = Router();
router.use(cookieParser("UserCookie"))

router.get("/",  async (req, username, password, done) => {

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
    
});

// Ruta para configurar la cookie después de una autenticación exitosa
router.get('/setCookie', (req, res) => {
    const cookieValue = req.user.email; // Usa el email del usuario o la información que desees almacenar en la cookie
    res.cookie('UserCookie', cookieValue, { signed: true, maxAge: 300000 }); // Configura la cookie
    res.send("Cookie asignada con éxito");
  });
  
  // Ruta para registrar un nuevo usuario
  router.post("/register", passport.authenticate('register', {
    failureRedirect: '/api/sessions//modify'
  }), async (req, res) => {
    console.log('Registrando nuevo usuario.');
    res.status(201).send({ status: "success", message: "Usuario creado con éxito." });
  });

  router.post("/modify", passport.authenticate('modify', { failureRedirect: '/modify-failure', successRedirect: '/modify-success' }), async (req, res) => {
    // La autenticación de la estrategia 'modify' se encargará de modificar el usuario
    // Si la autenticación es exitosa, el usuario se habrá modificado en la base de datos
    // Puedes redirigir al usuario a una página de éxito o realizar otras acciones necesarias.
  });
  
  
  // Ruta para iniciar sesión
  router.post("/login", passport.authenticate('login', {
    failureRedirect: '/api/sessions/fail-login'
  }), async (req, res) => {
    console.log('Logueando al usuario.');
    const user = req.user;
    res.status(200).send({ status: "success", message: "Usuario logueado con éxito." });
    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age
  }

  // //JWT
  // const access_token = generateJWToken(user)
  // console.log("token:" + access_token)
  // res.send({access_token: access_token})


  });
  

router.get('/github', passport.authenticate('github', {scope: 'user:email'}), async (req, res) => {

    res.redirect('https://github.com/login/oauth/authorize?client_id=Iv1.ad8241c45238ff04&redirect_uri=http://localhost:3001/api/sessions/githubcallback&scope=user:email');


} )

router.get('/githubcallback', passport.authenticate('github', {scope: 'user:email'}), async (req, res) => {
    const user = req.user;
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }

 
    req.session.admin = true
    if(!user.password) {
      res.redirect(`http://localhost:3000/users/newuser?${user.email}`)
    } else {
      res.redirect('http://localhost:3000/products')
    }
 } ) 

router.post("/github", passport.authenticate('github', {failureRedirect: '/api/sessions/fail-login'}) ,async (req, res) => {
    console.log('Logueando al usuario.');
    const user = req.user
    res.status(200).send({status: "success", message: "Usuario logueado con GitHub exitosamente."})
    console.log(user)

});




//RUTAS GET

export default router;