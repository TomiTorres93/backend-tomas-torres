import { cartModel } from "./models/cart.model.mjs";
import { itemModel } from "./models/item.model.mjs";

import { isObjectIdOrHexString } from "mongoose"


export default class CartsService {
    constructor() {
        console.log("Working items with Database persistence in mongodb");
    }

    // save = async (cart) => {
    //     try {
    //         let result = await cartModel.create(cart);
    //         return result;
    //     } catch (error) {
    //         return error
    //     }
    // }

    
    getCarts = async () => {
        try {
            let cartsListResult = await cartModel.find()
            return cartsListResult
        } catch (error) {
            return error
        }
    }

    createCart = async () => {
        try {
          const newCart = await cartModel.create({ products: [] });
          return newCart;
        } catch (error) {
          console.error("Error al crear el carrito:", error);
          throw error;
        }
      };
       

      
      // Corrección en addToCart para que utilice el cartId pasado como parámetro
      addToCart = async (cartId, productInfo) => {
        try {
          const updatedCart = await cartModel.findByIdAndUpdate(
            cartId,
          { products: productInfo } 
     
          );
          return updatedCart;
        } catch (error) {
          console.error("Error al agregar producto al carrito:", error);
          throw error;
        }
      };

      
    // updateCart = async (cartId, productUpdated) => {
    //     try {
    //         let updateProductResult = await cartModel.updateOne({ _id: cartId }, productUpdated)
    //         return updateProductResult
    //     } catch (error) {
    //         return error
    //     }
    // }

    getCartsById = async (cartId) => {
        try {
            let productByIdResult = await cartModel.findById(cartId).populate('products')
         
            return productByIdResult
        } catch (error) {
            return error
        }
    }


    updateCartProductById = async (cartId, productUpdatedId, quantity) => {
        try {
            let updateProductResult = await cartModel.updateOne({ "_id": cartId, "products.id": productUpdatedId }, { $set: { "products.$.quantity": quantity } })
            return updateProductResult
        } catch (error) {
            return error
        }
    }

    deleteProducts = async (cartId) => {
        try {
            let updateProductResult = await cartModel.updateOne({ _id: cartId }, { $set: { products: [] } })
            console.log(updateProductResult)
            return updateProductResult
        } catch (error) {
            return error
        }
    }
}
