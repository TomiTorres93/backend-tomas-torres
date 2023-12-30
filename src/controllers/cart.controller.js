import { Router } from "express";
import cartsService from "../services/dao/cart.services.js";


const cartService = new cartsService();
const router = Router();


export const getCartController = async (req, res) => {
    const query = req.query;

    try {
        const carts = await cartService.getCarts(
        )

        res.send({ status: 'success', payload: carts });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los items." });
    }
}


// Crear un carrito nuevo
export const createCartController = async (req, res) => {
    try {
        const { product } = req.body;
        let newCart = await cartService.createCart({ products: [product] });
        res.status(201).send({ result: 'success', payload: newCart });
    } catch (error) {
        console.error("No se pudo crear el carrito con mongoose: " + error);
        res.status(500).send({ error: "No se pudo crear carrito con mongoose", message: error });
    }
}

// Obtener un carrito por su ID

export const getCartByIdController = async (req, res) => {
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
}


// Agregar un producto al carrito

export const putController =  async (req, res) => {
    try {
        const cartId = req.params.cid;
        const { product } = req.body;
        const cart = await cartService.getCartsById(cartId);
        let lastProduct = product.slice(-1)[0]
        let filter = cart.products.find(e => e.name === lastProduct.name)

        if (filter) {
            let deletedArr = cart.products.filter(e => e.name !== filter.name)
            filter.quantity += 1
            deletedArr.push(filter)
            const updatedCart = await cartService.addToCart(cartId, deletedArr);
            res.status(200).send({ result: 'success', payload: updatedCart });
        } else if (!filter && cart.products.length === 0) {
            const updatedCart = await cartService.addToCart(cartId, product);
            res.status(200).send({ result: 'success', payload: updatedCart });
        } else if (!filter && cart.products.length > 0) {
            let newUpdateArr = [...cart.products, product[product.length - 1]]
            const updatedCart = await cartService.addToCart(cartId, newUpdateArr);
            res.status(200).send({ result: 'success', payload: updatedCart });
        }

    } catch (error) {
        console.error("No se pudo agregar el producto al carrito con mongoose: " + error);
        res.status(500).send({ error: "No se pudo agregar producto al carrito con mongoose", message: error });
    }
}



// Elimina un producto al carrito

export const deleteProductsById =  async (req, res) => {
    try {
        const cartId = req.params.cid;
        const { product } = req.body;
        const cart = await cartService.getCartsById(cartId);
 
        let filter = cart.products.filter(e => e.name !== product)

        const updatedCart = await cartService.deleteProductsById(cartId, filter);
      
        res.status(200).send({ result: 'success', payload: updatedCart });


    } catch (error) {
        console.error("No se pudo agregar el producto al carrito con mongoose: " + error);
        res.status(500).send({ error: "No se pudo agregar producto al carrito con mongoose", message: error });
    }
}




// router.delete('/:cid', cartService.deleteProducts)



// router.put('/:cid/products/:pid', cartService.updateProductQuantity)



export default router;