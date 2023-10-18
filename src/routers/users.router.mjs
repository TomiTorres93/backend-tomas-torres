import { Router } from "express";
import UsersService from "../services/dao/users.services.mjs";
import {authToken} from "../utils.mjs"
import passport from "passport";
import {authJWTcontroller, userByEmailcontroller, createUsercontroller} from "../controllers/user.controller.mjs";

const UserService = new UsersService();
const router = Router();


router.get('/', passport.authenticate('jwt', {session: false}), authJWTcontroller);

router.get(`/userByEmail/:email`, authToken, userByEmailcontroller);

router.post('/', createUsercontroller)




export default router;