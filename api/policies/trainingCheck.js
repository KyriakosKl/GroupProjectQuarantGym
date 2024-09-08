
const utils = require('../../application/utilities')

const tools = require('../../application/tools');

module.exports = async function(req, res, proceed) {
    console.log('inside policy trainingCheck')
    let startDate = new Date(req.body.startDate);
    let location = req.body.location;
    let trainerId = req.session.trainer_selected;
    let customerId = req.session.user.id;
    let trainerFirstName = req.session.trainerFname;
    let trainerLastName = req.session.trainerLname;
    let trainerBio = req.session.trainerBio;
    let trainerImage = req.session.trainerImage;
    let allTrainings=[];
    let errorLog = {};

    const isToday = new Date()
    const trainingUpdate = tools.trainingsHandle


    let whatUser = async()=>{
            if(req.session.user.isTrainer){            
                let _allTrainings = await Training.find({trainerId:customerId, isCancelled:0})
                console.log('user is a trainer.')
                return _allTrainings
            } else if ((!req.session.user.isTrainer) && (req.session.user.isCustomer)){
                
                let _allTrainings = await Training.find({customerId:customerId, isCancelled:0})
                let _allTrainerTrainings = await Training.find({trainerId:trainerId, isCancelled:0})
                let _availability = await _.union(_allTrainings,_allTrainerTrainings)
                  
                console.log('user is a customer.')
                return _availability
            }
        }
    allTrainings = await whatUser()
    let sessionsLeft = await utils.calculateSessions(req,res)

    for (let _training in allTrainings){
        //console.log(req.body.startDate,',', allTrainings[_training])
        if(req.body.startDate == allTrainings[_training].startDate){
            console.log(req.body.startDate,',', allTrainings[_training].startDate)
            console.log('conflict in dates booking')
            errorLog.error = 'Trainer Unavailable or you have already booked that date.'
        }
    }
    let locations = await Location.find({})

    let _locations = [];

    for (let location in locations){
        let row = await locations[location]
       
        _locations.push(row);
    }   

    if(sessionsLeft == 0){
        errorLog.error = 'You have no more sessions left for booking!'
    }

    if(startDate == "Invalid Date" || location == "") {
        errorLog.error = "Please fill in all fields"
    } 
    if(req.session.user.isTrainer){
        errorLog.error = "Trainers can not book trainings."
    }
    if(trainerId == customerId) {
        errorLog.error = "Sorry you cannot book with yourself!"
    } 
    if(startDate < isToday) {
        errorLog.error = "You need to choose a valid date" 
    }
    // if (req.session.user)
    
    if(Object.keys(errorLog).length>0) {
        return res.view('pages/account/trainerpage', {errorList:errorLog, bookedTrainings: "", trainingLocations: _locations, trainerObject : {trainerFirstName, trainerLastName, trainerBio, trainerImage}})
        }
    
    else if(Object.keys(errorLog).length<1){
        await trainingUpdate('book',req,res)
        return proceed();
    }
    

}

