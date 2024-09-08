const TView = require('../../../classes/trainerFull');

module.exports = {
    

    fn: async function() {

        /* 
        Simple function to fill an array with trainers results
        and send it to the trainersAll page

        */

        let payload=[]; // <- init empty array for pushing

        let trainerList = await UserDetails.find({
            where :{isTrainer:1}        // first query to iterate through
        });
        //console.log(trainerList)
        
        var GETlocalPath = require('path').resolve(sails.config.appPath, 'assets')
        for (let trainer in trainerList){       // <- begin iteration loop
            let trainerDetails = await User.findOne({id:trainerList[trainer].userId}) 

            //console.log(trainerDetails)
            let _localTrainer =new TView(
                    await trainerDetails.id,       // <- Create new object for Trainer view
                    await trainerDetails.firstName,
                    await trainerDetails.lastName, 
                    await trainerDetails.email,
                    await trainerList[trainer].address, 
                    await trainerList[trainer].image.split(GETlocalPath)[1], 
                    await trainerList[trainer].birthDate,
                    await trainerList[trainer].bio
                                                );
            payload.push(_localTrainer) // and push it to the empty array
            //console.log(_localTrainer._imageLocation)
        }

        
        /*
        //Uncomment for debugging
        console.log('Inside router and just populated trainers array')
        console.log(trainerList)
        */
        
        this.res.status(200)
        this.res.view('pages/account/trainersAll', {data:payload})
        return {}

    }
}