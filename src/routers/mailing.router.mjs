import { Router } from "express";
import {sendEmailController} from "../controllers/mailing.controller.mjs";

const router = Router();


router.post('/send', sendEmailController);

export default router;

