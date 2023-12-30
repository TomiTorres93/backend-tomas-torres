import {itemModel} from "./models/item.model.js";


export default class ItemsService {
    constructor() { 
    }


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
                prevLink: result.prevLink,
                nextLink: result.nextLink,
            }
        }  
    }


        getItemByIdAndDeduce = async (itemId, quantity) => {
            try {

              const item = await itemModel.findById(itemId);
          
              if (!item) {
                return { success: false, message: 'Producto no encontrado' };
              }
          
              const requestedQuantity = quantity; 

              if (item.stock >= requestedQuantity) {

                item.stock -= requestedQuantity;
          
                const updatedItem = await item.save();
          
                return { success: true, message: 'Producto actualizado con éxito', updatedItem };
              } else {
                return { success: false, message: 'Stock insuficiente' };
              }
            } catch (error) {
              return { success: false, message: 'Error al procesar la solicitud', error };
            }
          };
          


    



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