import { Router } from "express";
import cartsService from "../services/dao/cart.services.mjs";
import {getCartController, createCartController, getCartByIdController, putController, deleteProductsById} from "../controllers/cart.controller.mjs";

const cartService = new cartsService();
const router = Router();



router.get('/',  getCartController);

// Crear un carrito nuevo
router.post('/', createCartController);

// Obtener un carrito por su ID
router.get('/:id', getCartByIdController);

// Agregar un producto al carrito
router.put('/:cid', putController );

// Agregar un producto al carrito
router.delete('/:cid', deleteProductsById );

// router.delete('/:cid', cartService.deleteProducts)
// router.put('/:cid/products/:pid', cartService.updateProductQuantity)



export default router;