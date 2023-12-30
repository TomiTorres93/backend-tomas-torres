import { Router } from 'express';
import { userModel } from '../services/dao/models/user.model.js';
import { createHash, generateJWToken, isValidPassword } from '../utils.js';
import cookieParser from "cookie-parser";
import passport from 'passport';

const router = Router();
router.use(cookieParser("UserCookie"))


export const passwordController = async (req, username, password, done) => {

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

export const setCookieController = (req, res) => {
    const cookieValue = req.user.email; 
    res.cookie('UserCookie', cookieValue, { signed: true, maxAge: 300000 }); 
    res.send("Cookie asignada con éxito");
  }
  
export const newUserController = async (req, res) => {
    console.log('Registrando nuevo usuario.');
    res.status(201).send({ status: "success", message: "Usuario creado con éxito." });
  }

export const modifyController = async (req, res) => {
    // La autenticación de la estrategia 'modify' se encargará de modificar el usuario
    // Si la autenticación es exitosa, el usuario se habrá modificado en la base de datos
    // Puedes redirigir al usuario a una página de éxito o realizar otras acciones necesarias.
  }
  
export const loginController = async (req, res) => {
    console.log('Logueando al usuario.');
    const user = req.user;
    res.status(200).send({ status: "success", message: "Usuario logueado con éxito." });
    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age
  }
}

export const githubLoginGetController = async (req, res) => {
    res.redirect('https://github.com/login/oauth/authorize?client_id=Iv1.ad8241c45238ff04&redirect_uri=https://backend-tomitorres.onrender.com/api/sessions/githubcallback&scope=user:email');
}


export const githubCallbackController = async (req, res) => {
    const user = req.user;
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }
 
    req.session.admin = true
    if(!user.password) {
      res.redirect(`https://backend-tomitorres.onrender.com/users/newuser?${user.email}`)
    } else {
      res.redirect('https://backend-tomitorres.onrender.com/dashboard')
    }
 }

export const githubLoginPostController = async (req, res) => {
    console.log('Logueando al usuario.');
    const user = req.user
    res.status(200).send({status: "success", message: "Usuario logueado con GitHub exitosamente."})
    console.log(user)
}


export default router;