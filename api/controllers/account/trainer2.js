const Booking = require('../../../classes/newBooking')
//const trainingsHandle = require('./../../../application/tools').trainingsHandle


module.exports = {
    /*

    Not quite sure we actually need inputs. Feeling lucky, may remove later

    */
    inputs: {
        trainerId: {
            type: 'number'
        },
        customerId: {
            type: 'number'
        },
        locationId: {
            type: 'number'
        },
        startDate: {
            type: 'string'
        },
        isCancelled: {
            type: 'boolean'
        }
    },
  

    fn: async function(inputs) {
        /* //uncomment for debugging
       
        console.log('Inside trainers 2 and logging credentials')
        console.log(this.req.session) // works
        console.log(inputs.location)//works
        console.log(inputs.startDate)//works
        console.log(this.req.session.user.id, this.req.session.user.email)
        */
        

        let session = this.req.session // <- get access to the req session and body object
        let body = this.req.body


        // Query for finding location ID for the booking
        let locationId = await Location.find({
            where: {location: body.location}
        })


        let _booking = new Booking(body.startDate, session.trainer_selected, session.user.id, body.locationId)
        
        //uncomment for debug 
        // console.log("string 234 ID" + body.locationId )
        // console.log('Booking Object : ' + _booking)
        // console.log('end Date : ' + _booking.endDate)
        // console.log('customer_id : ' + _booking.customerId)
        // console.log('trainer_id : ' + _booking.trainerId)
    
        
        var training = await Training.create({
            startDate:_booking.startDate,
            isCancelled: _booking.isCancelled,
            endDate : _booking.endDate,
            trainerId:_booking.trainerId,
            customerId:_booking.customerId,
            locationId:_booking.locationId
            
        })
        //await trainingsHandle('book',req,res)

        
        return this.res.successAction(`Success! new training created at ${_booking.startDate}`, {where:'inside trainer2'},'/detailsuser')
    }
}

