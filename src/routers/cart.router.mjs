import { Router } from "express";
import cartsService from "../services/db/cart.services.mjs";


const cartService = new cartsService();
const router = Router();



router.get('/', async (req, res) => {
    const query = req.query;

    try {
            const carts = await cartService.getCarts(
        )

        res.send({ status: 'success', payload: carts});
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los items." });
    }
});


router.post('/', async (req, res) => {
    try {
        let { cart  } = req.body
        let carts = await cartService.save({ cart });
        res.status(201).send({ result: 'success', payload: carts })
    } catch (error) {
        console.error("No se pudo crear el carrito con moongose: " + error);
        res.status(500).send({ error: "No se pudo crear carrito con moongose", message: error });
    }
})


// router.get('/:cid', cartService.getCartsById)
// router.put('/:cid', cartService.updateCart)
// router.delete('/:cid', cartService.deleteProducts)
// router.put('/:cid/products/:pid', cartService.updateProductQuantity)



export default router;