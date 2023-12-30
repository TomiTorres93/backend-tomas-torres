import { Router } from "express";
import {sendEmailController} from "../controllers/mailing.controller.js";

const router = Router();


router.post('/send', sendEmailController);

export default router;

