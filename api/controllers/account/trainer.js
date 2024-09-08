const { RSA_NO_PADDING } = require('constants');
const NewTraining = require('../../../classes/newBooking')

module.exports = {
   inputs:{
       id : {
           type:'number'
        }
    },

    fn: async function({id}) {
        var GETlocalPath = require('path').resolve(sails.config.appPath, 'assets')
        
        //uncomment for debug
        // console.log('trainer ID selected : ' + id)
        // console.log('firing from inside trainer.js controller')
        
        
        let session = this.req.session;
        session.trainer_selected = id;
        
        let req = this.req;
        let res = this.res;
        let payload = []; 
        let trainerTrainings = await Training.find({trainerId:session.trainer_selected})
        
        let trainerData = await User.findOne({id:session.trainer_selected})
        let extraData = await UserDetails.findOne({userId:session.trainer_selected})

        let locations = await Location.find({})

        let _locations = [];
        // console.log(locations);
        for (let location in locations){
            let row = await locations[location]
           
            _locations.push(row);
        }
        //  console.log(_locations);
        
        let dataPacket = {trainerFirstName : trainerData.firstName,
                            trainerLastName : trainerData.lastName,
                            trainerBio : extraData.bio,
                            trainerImage : extraData.image.split(GETlocalPath)[1]}

            session.trainerFname = dataPacket.trainerFirstName;
            session.trainerLname = dataPacket.trainerLastName;
            session.trainerBio = dataPacket.trainerBio;
            session.trainerImage = dataPacket.trainerImage;
            console.log(session.trainerFname)
            console.log(session.trainerLname)



        
        for (training in trainerTrainings) {
            let _training = new NewTraining(
                trainerTrainings[training].startDate,
                trainerTrainings[training].trainerId,
                trainerTrainings[training].customerId,
                trainerTrainings[training].locationId,
                trainerTrainings[training].endDate
            );
           
            payload.push(_training);
        }
        
      
        // //Uncomment for debug
        // console.log('Session email : ' + session.user_email + 'Session User ID : '+  session.user_id + 'Session Trainer Selected ID : ' + session.trainer_selected);
        // console.log('end trainer.js output');
        res.status(200)
        return res.view('pages/account/trainerpage',{errorList:'', bookedTrainings:payload, trainingLocations: _locations, trainerObject : dataPacket }) 
    }
}
