import { Router } from 'express';
import cookieParser from "cookie-parser";
import passport from 'passport';
import { passwordController, setCookieController, newUserController, modifyController, loginController, githubLoginGetController, githubCallbackController, githubLoginPostController } from "../controllers/sessions.controller.mjs";

const router = Router();

router.use(cookieParser("UserCookie"))

router.get('/', passwordController);

router.get('/setCookie', setCookieController);

router.post('/register', passport.authenticate('register', {  failureRedirect: '/api/sessions//modify'}), newUserController);

router.post('/modify', passport.authenticate('modify', { failureRedirect: '/modify-failure', successRedirect: '/modify-success' }), modifyController);

router.post('/login', passport.authenticate('login', {  failureRedirect: '/api/sessions/fail-login'}), loginController);

router.get('/github', passport.authenticate('github', { scope: 'user:email' }), githubLoginGetController);

router.get('/githubcallback', passport.authenticate('github', { scope: 'user:email' }), githubCallbackController);

router.post('/githubcallback', passport.authenticate('github', { failureRedirect: '/api/sessions/fail-login' }), githubLoginPostController);

//Obtenemos todos los usuarios inactivos de la base de datos MongoDB
// router.delete('/inactiveUsers', delAllInactiveUsersController )


export default router;