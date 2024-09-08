const _dateFormat = require('dateformat')
const utils = require('./utilities')


//Function to calculate booked trainings used on login
async function getBookedTrainings(id,req,res){
    let today = new Date()
    today = utils.formatDate(today)
    let trainingsBooked;
    const bookedTrainings = await Training.find()
        .where(
            {
                customerId:id,
                isCancelled:0,
                startDate:{'>':today}
            })
    if(bookedTrainings){
        trainingsBooked = bookedTrainings.length
    } else {
        trainingsBooked = 0
    }
    return await Promise.resolve(trainingsBooked)
}

/**
 * simple timer function to locate time crunches 
 * usage ->
 *  line x: timers('start',req,res)
 *  line n: timers('stop',req,res)
 */

async function timers(action,req,res){
    let result;
    try {
        if(action=='start'){
            let initTime = new Date()
            req.timerStart = initTime
            let message = `Timer started @ ${initTime}`
            return await Promise.resolve(message)
        }
        if((action == 'stop') && req.timerStart){
            let stopTime = new Date()
            let startTime = new Date(req.timerStart)
            result = (stopTime.getTime() - startTime.getTime())/1000
            let message = `Timer stopped. Duration : ${result}`
            delete req.timerStart
            return await Promise.resolve(message)
        }
        else{
            let err = 'Invalid parameters or timer has not been set'
            throw new Error(err)
        }
    }
    catch(err){
        throw new Error(err)
    }
}


// simple function to handle trainings delete and add in session
async function trainingsHandle(action,req,res){

    try{
        if((action=='book') || (action=='delete')){
            if(action=='book'){
                if((!req.session.user.trainingsBooked)||(req.session.user.trainingsBooked == 0)){
                    req.session.user.trainingsBooked = 1
                 } else {
                    req.session.user.trainingsBooked = req.session.user.trainingsBooked + 1
                 }
            }else if(action=='delete'){
                if(req.session.user.trainingsBooked == 1){
                    req.session.user.trainingsBooked = 0
                 } else {
                    req.session.user.trainingsBooked = req.session.user.trainingsBooked - 1
                 }
            }
        }
    }
    catch(err){
        throw new Error(err)
    }
    return await Promise.resolve(`${action} OK!`)
}





module.exports = {
    calculateTrainings:getBookedTrainings,
    trainingsHandle:trainingsHandle,
    timers:timers
}