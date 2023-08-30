import {itemModel} from "./models/item.model.mjs";


export default class ItemsService {
    constructor() { 
        console.log("Working items with Database persistence in mongodb");
    }

    // getAll2 = async ({ limit, page, sort }) => {
    //     let items = await itemModel.find({ })
    //         .limit(limit)
    //         .skip((page - 1) * limit)
    //         .sort(sort);
           
    //     return items.map(item => item.toObject());
    // }

    getAll = async ({ query, options }) => {
        const result = await itemModel.paginate(query, options);
        return {
           docs: result.docs.map(item => item.toObject()),
            pagination: {
                page: result.page,
                limit: result.limit,
                totalDocs: result.totalDocs,
                totalPages: result.totalPages,
                hasNextPage: result.hasNextPage,
                hasPrevPage: result.hasPrevPage,
            }
        }  
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

    groupItems = async () => {
        let result = await itemModel.aggregate([
            
            {
                $group: {_id: "$size", totalQty: {$sum: "$stock" } } 
            }

            ])
        return result;
    }


}