const {BookingRepository}=require('../repository/index.js')

const {FLIGHT_SERVICE_PATH}=require('../config/serverConfig.js')

const {ServiceError}=require('../utils/errors')

const axios=require('axios')
class BookingService{

    constructor(){
        this.BookingRepository=new BookingRepository();
    }


    async createBooking(data){

        try {
           const flightId=data.flightId

           const getFlightRequestUrl=`${FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`
           
           const response=await axios.get(getFlightRequestUrl)
        
           const flightData=response.data.data
        
           let PriceOfFlight=flightData.price 
        
           if(data.noOfSeats> flightData.totalSeats){
          
            throw new ServiceError('Something went wrong in Booking process', 'Insufficient Space')
        
        }


        const totalCost=PriceOfFlight*data.noOfSeats;

        const BookingPayload={...data,totalCost}

        const booking=await this.BookingRepository.create(BookingPayload)

        const updateFlightRequestUrl=`${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`


        await axios.patch(updateFlightRequestUrl,{totalSeats:flightData.totalSeats-booking.noOfSeats})

      const finalBooking=  await this.BookingRepository.update(booking.id,{status:"Booked"})

        return finalBooking




        } catch (error) {

            if(error.name=='RepositoryError' || error.name=='ValidationError'){
                throw error
            }

            throw new ServiceError();
        }       

    }



}



module.exports=BookingService