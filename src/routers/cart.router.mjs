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
        const { product } = req.body;  
        let newCart = await cartService.createCart({ products: [product] }); 
        res.status(201).send({ result: 'success', payload: newCart });
    } catch (error) {
        console.error("No se pudo crear el carrito con mongoose: " + error);
        res.status(500).send({ error: "No se pudo crear carrito con mongoose", message: error });
    }
});

// Obtener un carrito por su ID
router.get('/:id', async (req, res) => {
    try {
        const cartId = req.params.id;
        const cart = await cartService.getCartsById(cartId);
        if (!cart) {
            return res.status(404).send({ error: 'Carrito no encontrado' });
        }
        res.status(200).send(cart);
    } catch (error) {
        console.error('Error al obtener el carrito por ID:', error);
        res.status(500).send({ error: 'Error al obtener el carrito por ID' });
    }
});


// Agregar un producto al carrito
router.put('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const { product } = req.body;      
        const cart = await cartService.getCartsById(cartId);  
        console.log(cart)
   
        if(cart){
            let lastProduct = product.slice(-1)[0]
            let comparison = cart.products.find(e => e.name === lastProduct.name)
            let deletedArr = cart.products.filter(e => e.name !== comparison.name)
            comparison.quantity+=1 
            deletedArr.push(comparison)
          
            const updatedCart = await cartService.addToCart(cartId, deletedArr);
            res.status(200).send({ result: 'success', payload: updatedCart });
        } else {
            const updatedCart = await cartService.addToCart(cartId, product);
            res.status(200).send({ result: 'success', payload: updatedCart });
        }
  
         

console.log(product)
    } catch (error) {
        console.error("No se pudo agregar el producto al carrito con mongoose: " + error);
        res.status(500).send({ error: "No se pudo agregar producto al carrito con mongoose", message: error });
    }
});






// router.delete('/:cid', cartService.deleteProducts)
// router.put('/:cid/products/:pid', cartService.updateProductQuantity)



export default router;