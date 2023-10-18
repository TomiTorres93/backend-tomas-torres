import { ticketModel } from "./models/ticket.model.mjs";

export default class TicketService { 


    getAll = async ({ query, options }) => {
        const result = await ticketModel.paginate(query, options);
        return {
           docs: result.docs.map(ticket => ticket.toObject()),
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


    getTicketById = async (ticketId) => {
        try {
            let ticketByIdResult = await ticketModel.findById(ticketId).populate('tickets')
         
            return ticketByIdResult
        } catch (error) {
            return error
        }
    }

    createTicket = async (ticket) => {
        let result = await ticketModel.create(ticket);
        return result;
      };


 }