import {itemModel} from "./models/item.mjs";


export default class ItemsService {
    constructor() { 
        console.log("Working items with Database persistence in mongodb");
    }

    getAll = async () => {
        let items = await itemModel.find();
        return items.map(item=>item.toObject());
    }
    save = async (item) => {
        let result = await itemModel.create(item);
        return result;
    }
    countItems = async () => {
        let result = await itemModel.countDocuments();
        return result;
    }

    matchItems = async (a) => {
        let result = await itemModel.aggregate([
            
            {
                $match: {size: a} 
            }

            ])
        return result;
    }


}