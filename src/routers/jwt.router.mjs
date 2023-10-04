import { Router } from 'express';
import { loginController } from "../controllers/jwt.controller.mjs";


const router = Router();


router.post("/login", loginController);

export default router;