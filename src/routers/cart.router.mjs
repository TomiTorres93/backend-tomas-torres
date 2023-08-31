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


// Crear un carrito nuevo
router.post('/', async (req, res) => {
    try {
        const newCart = await cartService.createCart({ products: [] }); 
        res.status(201).send({ result: 'success', payload: newCart });
    } catch (error) {
        console.error("No se pudo crear el carrito con mongoose: " + error);
        res.status(500).send({ error: "No se pudo crear carrito con mongoose", message: error });
    }
});

// Agregar un producto al carrito
router.put('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const { product } = req.body;
        
        
        const updatedCart = await cartService.addToCart(cartId, product);
        res.status(200).send({ result: 'success', payload: updatedCart });
    } catch (error) {
        console.error("No se pudo agregar el producto al carrito con mongoose: " + error);
        res.status(500).send({ error: "No se pudo agregar producto al carrito con mongoose", message: error });
    }
});


// Obtener un carrito por su ID
router.get('/:id', async (req, res) => {
    try {
        const cartId = req.params.id;
        const cart = await cartService.getById(cartId);
        if (!cart) {
            return res.status(404).send({ error: 'Carrito no encontrado' });
        }
        res.status(200).send(cart);
    } catch (error) {
        console.error('Error al obtener el carrito por ID:', error);
        res.status(500).send({ error: 'Error al obtener el carrito por ID' });
    }
});


// router.put('/:cid', cartService.updateCart)
// router.delete('/:cid', cartService.deleteProducts)
// router.put('/:cid/products/:pid', cartService.updateProductQuantity)



export default router;