const express=require('express')


const BookingController=require('../../Controllers/booking-controller.js')



const bookingController = new BookingController()


const router=express.Router()


router.post('/bookings',bookingController.create)

router .post('/publish',bookingController.sendMessageToQueue)



module.exports=router