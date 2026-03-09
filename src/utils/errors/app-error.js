const {StatusCodes}= require('http-status-codes')


class AppError extends Error{

    constructor(
        name,
        message,
        explaination,
        statusCode=StatusCodes.INTERNAL_SERVER_ERROR


    ){

        this.name=name
        this.message=message
        this.explaination=explaination
        this.statusCode=statusCode


    }









}



module.exports=AppError