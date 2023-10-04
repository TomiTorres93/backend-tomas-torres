import { Router } from "express";
import ItemsService from "../services/db/items.services.mjs";
import { getItemsController, countController, matchController, groupController, createController, putController, deleteController} from "../controllers/items.controller.mjs";


const itemService = new ItemsService();
const router = Router();

// // Lectura


router.get('/', getItemsController);

router.get('/count', countController)

router.get(`/match/:parametroId`, matchController)

router.get(`/group/`, groupController)

// Crear
router.post('/', createController)

// // PUT
router.put('/:id', putController)

// // DELETE
router.delete('/:id', deleteController)




export default router;