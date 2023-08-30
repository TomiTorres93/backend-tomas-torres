import {cartModel} from "./models/cart.model.mjs";


export default class CartsService {
    constructor() { 
        console.log("Working items with Database persistence in mongodb");
    }


    getAll = async () => {
     
    }

    
    save = async (item) => {
        let result = await cartModel.create(item);
        return result;
    }


}