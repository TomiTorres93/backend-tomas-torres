import {cartModel} from "./models/cart.model.mjs";
import { isObjectIdOrHexString } from "mongoose"


export default class CartsService {
    constructor() { 
        console.log("Working items with Database persistence in mongodb");
    }

    save = async (cart) =>{
            try {
                let result = await cartModel.create(cart);
                return result;
            } catch (error) {
                return error
            }
        }
    
        getCarts = async () =>{
            try {
                let cartsListResult = await cartModel.find()
                return cartsListResult
            } catch (error) {
                return error
            }
        }
    
        getCartsById = async (cartId) =>{
            try {
                let productByIdResult = await cartModel.findById(cartId)
                return productByIdResult
            } catch (error) {
                return error
            }
        }
    
        updateCart = async(cartId, productUpdated) =>{
            try {
                let updateProductResult = await cartModel.updateOne({_id:cartId}, productUpdated)
                return updateProductResult
            } catch (error) {
                return error
            }
        }
    
        updateCartProductById = async(cartId, productUpdatedId, quantity) =>{
            try {
                let updateProductResult = await cartModel.updateOne({ "_id": cartId, "products.id": productUpdatedId},{ $set: { "products.$.quantity": quantity } })
                return updateProductResult
            } catch (error) {
                return error
            }
        }
    
        deleteProducts = async(cartId) =>{
            try {
                let updateProductResult = await cartModel.updateOne({_id:cartId}, {$set: {products: []}})
                console.log(updateProductResult)
                return updateProductResult
            } catch (error) {
                return error
            }
        }
    }
    