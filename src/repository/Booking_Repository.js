const { ValidationError, AppError } = require('../utils/errors/index.js')
const {Booking}= require('../../models/index.js')
const {StatusCodes}=require('http-status-codes')

class BookingRepository{

    async create(data){
        try {
            const response=await Booking.create(data);
            return response



        } catch (error) {
            if(error.name=='SequelizeValidationError'){
                throw new ValidationError(error)
            }

            throw new AppError(
                'RepositoryError',
                'Cannot create Booking',
                'There was some issue while creating th e Booking',
                StatusCodes.INTERNAL_SERVER_ERROR

            )

        }
    }




    async update(data){

        try {
            
        } catch (error) {
            
            


        }


    }



}