const _Trainings = require('../../../classes/trainingsList')
const { strict } = require('assert');
const crypto = require('crypto-random-string');
const fs = require('fs')
const glob = require('glob')
const utils = require('../../../application/utilities');
const { async } = require('crypto-random-string');


module.exports = {
    inputs : { 
        bdate : {
            type:'string'
        },
        bio : {
            type:'string'
        },
        address : {
            type:'string'
        },
        fname: {
            type: 'string'
        },
        lname: {
            type: 'string'
        },
        email: {
                type: 'string'
         }
    },


    fn: async function(inputs) {
        let req = this.req
        let res = this.res 
        let method = await req.method
        let resizeProfile = utils.imgResize
        
        /* This controller will check for method type and redirect accordingly. 
            It handles POST/GET 
        */
       
            if(method ==='POST'){
            console.log('POST method : ' + method)
            let localPath = require('path').resolve(sails.config.appPath, 'assets/images/users')
            let bio = inputs.bio
            let bdate = inputs.bdate
            let address = inputs.address
            let fname = inputs.fname
            let lname = inputs.lname
            let email = inputs.email
            let postUser = await User.findOne({email:req.session.user.email}) // error check // session.email
            let currentUserDetails = await UserDetails.findOne({userId:postUser.id})
            let someOldImage = currentUserDetails.image

            let filename =  await postUser.email+crypto({length:5})+'.jpg'
            let imageLocation = await localPath + '\\' + filename

            /* 
                Upload image procedure : 
                    Check to see if user has entered a new image =>
                        a: look for similar images in folder => delete similar images
                        
            */

            req.file('avatar').upload({
                dirname:localPath,
                saveAs : filename

            },async function (err, uploadedFiles) { 
                if (err) return res.serverError(err) // error check ??? serverError 
                
                if (_.isEmpty(uploadedFiles)) {

                    //console.log('empty field', someOldImage)
                    await UserDetails.updateOne({userId:postUser.id}).set({bio:bio, address:address, birthDate:bdate})
                } else{
                    await UserDetails.updateOne({userId:postUser.id}).set({bio:bio, address:address, birthDate:bdate, image:imageLocation})
                    console.log(uploadedFiles)
                    let lookup = postUser.email;
                    
                    let globString = '**/' + lookup + '*.jpg'
                    
                    glob(globString, function (err, files){
                        
                        for (let file of files){
                            
                            let localFilename = file.split('images/users/')
                            console.log(filename, file, localFilename[1])
                            
                            if(filename !== localFilename[1] ){
                                fs.unlink(file, function(err){
                                    if(err){
                                        console.log(err)
                                    }
                                })
                            }
                        }
                    })
                    resizeProfile(filename,localPath)
                    
                    
                }
            })

            return res.successAction('Update success.', {where:'inside details user POST'},'/detailsuser')
            
        } else if(method==='GET'){
            let res = this.res
            let req = this.req
            let session = this.req.session
            let trainingPayloadFuture = [];
            let trainingPayloadPast = [];
            let fullurl;
            let sessionsLeft;
            // console.log('GET method : ' + method)
            // console.log('user model : ', session.user)
            var user = await User.findOne({email:req.session.user.email})
            var user_id = await user.id
            var fname = await user.firstName
            var lname = await user.lastName
            var email = req.session.user.email
            var details = await UserDetails.findOne({userId:user_id}) // error Check 
            var isTrainer = await details.isTrainer
            var imageLocation = await details.image
            // var bdate = await details.birthDate
            var GETlocalPath = require('path').resolve(sails.config.appPath, 'assets')
            var locations = await imageLocation.split(GETlocalPath)
            
            /**
             * @team Implemented here different methods for the user details table for the two different cases (customer/trainer)
             * this will redirect to the details page with all the trainings history. The comparison for upcoming or past trainings
             * should be done frontside. (ex : if (current date < trainings[training].startDate) return future)
             */
            
            if(isTrainer){
                console.log('Trainer ID : ' + user_id)
                var trainings = await Training.find({trainerId:user_id, isCancelled:0})
                for (let training in trainings){
                    let searchForLocation = trainings[training].locationId
                    let searchFor = trainings[training].customerId
                    let _customer = await User.find({where : {id:searchFor}}).limit(1)
                    let area = await Location.find({ where: {id: searchForLocation}}).limit(1);
                    let row = new _Trainings(_customer[0].email, _customer[0].firstName, _customer[0].lastName,trainings[training].startDate,trainings[training].endDate,area[0].location,trainings[training].id)
                    
                    let today = new Date()
                    let trainingDate = new Date(row.startDate)
                    sessionsLeft = session.user.trainingsBooked;
                    if(trainingDate > today){
                        trainingPayloadFuture.push(row)
                    } else if (trainingDate < today){
                        trainingPayloadPast.push(row)
                    }
                }
            } else if (!isTrainer){
                var userTrainings = await Training.find({customerId:user_id, isCancelled:0})
                sessionsLeft = await utils.calculateSessions(req,res)
                for (training in userTrainings){
                    let searchForTrainer = userTrainings[training].trainerId
                    let searchForLocation = userTrainings[training].locationId
                    let _trainer = await User.find({where : {id:searchForTrainer}}).limit(1);
                    // find location
                    let area = await Location.find({ where: {id: searchForLocation}}).limit(1);
              
                    let row = new _Trainings(_trainer[0].email, _trainer[0].firstName, _trainer[0].lastName, userTrainings[training].startDate, userTrainings[training].endDate, area[0].location   ,userTrainings[training].id)
                    //console.log('printing training details class : ' + Object.values(row))

                    

                    let today = new Date()
                    let trainingDate = new Date(row.startDate)

                    if(trainingDate > today){
                        trainingPayloadFuture.push(row)
                    } else if (trainingDate < today){
                        trainingPayloadPast.push(row)
                    }
                
                }

            }
            


            return this.res.view('pages/account/detailsuser', {
                                                            data:method,
                                                            address:details.address,
                                                            sessionsLeft:sessionsLeft, 
                                                            address:details.address, 
                                                            bio:details.bio, 
                                                            birthDate:details.birthDate, 
                                                            location:locations[1], 
                                                            url:fullurl, 
                                                            payloadFuture:trainingPayloadFuture,
                                                            payloadPast:trainingPayloadPast,  
                                                            firstName:fname, 
                                                            lastName: lname,
                                                            balance: session.user.balance,
                                                            membershipName : session.user.membershipName, 
                                                            email: email
                                                        })
        } else {
            console.log('no post or get. current method : ' + method)
        }

    }
}

