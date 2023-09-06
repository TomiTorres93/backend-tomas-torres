import { Router } from 'express';
import { userModel } from '../services/db/models/user.model.mjs';
import { createHash, isValidPassword } from '../utils.mjs';
import passport from 'passport';

const router = Router();

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

router.post("/register", passport.authenticate('register', {failureRedirect: '/api/sessions/fail-register'}), async (req, res) => {
    console.log('Registrando nuevo usuario.');
    res.status(201).send({status: "success", message: "Usuario creado con éxito."})
});

router.post("/login", passport.authenticate('login', {failureRedirect: '/api/sessions/fail-login'}) ,async (req, res) => {
    console.log('Logueando al usuario.');
    const user = req.user
    console.log(user)

});

//RUTAS GET

export default router;