const {StatusCodes}=require('http-status-codes')

const {BookingService }=require('../Services/index.js')

const bookingService=new BookingService();

const {createChannel,publishedMessage}=require('../utils/message_Queue.js')

const {REMINDER_BINDING_KEY}=require('../config/serverConfig.js');
const { Json } = require('sequelize/lib/utils');
class BookingController{

    

    async sendMessageToQueue(req,res){

        const channel=await createChannel();
        const data={message:'Success'}
        publishedMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(data))

        return res.status(200).json({
            message:'Successfully published the event'
        })
    }


    async create (req,res){

    try {
        const response=await bookingService.createBooking(req.body)
        console.log("From Booking Controller",response);
        
        return res.status(StatusCodes.OK).json({

            message:"Successfully completed booking",
            success:true,
            data:response,
            err:{}



        })
    }  catch (error) {
        
        console.log("error from Booking Controller",error);
        
        return res.status(error.statusCode|| 400).json({

            message:error.message,
            success:false,
            data:{},
            err:error.explaination



        })
    }



}


}





module.exports=BookingController