import { Router } from "express";
import ItemsService from "../services/dao/items.services.mjs";
import { getItemsController, countController, getItemsByIdController, matchController, groupController, createController, putController, deleteController} from "../controllers/items.controller.mjs";


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
router.put('/purchase/:id', getItemsByIdController);

// // DELETE
router.delete('/:id', deleteController)




export default router;