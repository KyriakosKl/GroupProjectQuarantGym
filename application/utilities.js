/**
 * Utilities module. Include your most used function in here and export accordingly.
 * No spam *
 */
 const sharp = require('sharp')
 const _dateFormat = require('dateformat')
 const fs = require('fs')
 const tree = require('treeify')
 const config = require('./config')
 const { util } = require('grunt')


 function debugPrint(params){
    try{
        console.log('\n')
        if(arguments.length > 0){
            for(let arg in arguments){
                if(typeof(arguments[arg])=='object'){
                    console.log('\n',tree.asTree(arguments[arg], true))
                } else {
                    process.stdout.write(arguments[arg])
                }
            }
        } else {
            let err = new Error(' you need more than one arguments')
            throw err
        }
    }
    catch(err){
        console.log(err)
    }
    finally{
        console.log('\n')
    }
};

 //Function to check subscription validity 
 function validSubscription(now,compare){
     let _date1 = new Date(now)
     let _date2 = new Date(compare)
     let oneDay = 24 * 60 * 60 * 1000
     const diffDays = Math.round(Math.abs((_date2 - _date1) / oneDay));
     if(_date2>_date1){
         console.log(`subscription valid, ${diffDays} days left.`)
         return [true,diffDays]
     } else {
         console.log(`subscription expired, ${diffDays} days due.`)
         return [false,diffDays]
     }    
 };

 function formatDate(date){
     let newDate = new Date(date)
     let _date = _dateFormat(newDate,"yyyy-mm-dd HH:MM")
     return _date
 };

 // Function to return Capitalized Names
 function nameEntry(name) {
     var splitStr = name.toLowerCase().split(' ');
     for (var i = 0; i < splitStr.length; i++) {
         splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
     }
     return splitStr.join(' '); 
 };

 // Function to resize images to profile pic ready format 
 async function mkProfile(fName, dirToFile){
    let dir = dirToFile+'\\'
    let filename = fName
    let originalfile = dir+filename
    let renamefile = dir+'_'+filename
    console.log(renamefile)
    await sharp(originalfile)
        .resize(253,169,{
            fit:'contain'
        })
        .toFile(renamefile)
        .then(() => {
            console.log('Done!')
            fs.unlink(originalfile, function(err) {
                if(err){
                    console.log(err)
                }
            })
            fs.renameSync(renamefile, originalfile)
        })
        return message = await Promise.resolve('Is OKE')
};

// Function to build a session user model boilerplate
async function constructUserModel(user,details){
    let userModel = {
        email : await user.email,
        fname:await user.firstName,
        lname:await user.lastName,
        id:await user.id,
        balance: await user.money,
        isAdmin:await details.isAdmin,
        isTrainer:await details.isTrainer,
        isCustomer:await details.isCustomer

    }
    return model = await Promise.resolve(userModel)
};

// Function to update/create membership
async function updateMembership(req,res,next){
    let eligibleForOffer = config.eligibleForOffers;
    const NewUserMembership = require('../classes/newuserMembership');
    console.log('Now updating membership.')
    
    let id = await req.body.id;
    let startDate = await req.body.startDate;
    let price = await req.body.price;
    let isCancelled = await req.body.isCancelled;
    let userId = await req.session.user.id;
    let membershipId = await req.body.id;
    let remainingSessions;

    /**
     * updated with Class corrections 
     */
    
    let _newMembership = new NewUserMembership(id,startDate, price, isCancelled, userId, membershipId);
    console.log('Updating with :' ,_newMembership);
    let newEndDate = new Date();
    newEndDate = formatDate(newEndDate)
    
    if(!req.session.user.hasActiveMembership){
        console.log('User has no active membership. Subscribing to ',req.body.name)
    }else {
        console.log('User has active membership. Cancelling previous...')
        remainingSessions = calculateSessions(req,res)
        let updatedMembership  = await UserMembership.updateOne({id:req.session.user.lastMembershipId})
            .set({isCancelled:1, endDate:newEndDate})
    }
    var newUserMembership = await UserMembership.create({
        startDate: _newMembership.startDate,
        endDate: _newMembership.endDate,
        price: _newMembership.price,
        isCancelled: _newMembership.isCancelled,
        userId: _newMembership.userId,
        membershipId: _newMembership.id
    }).fetch()
    
    const [isActive, days] =  validSubscription(newEndDate, newUserMembership.endDate)

    req.session.user.lastMembershipId = await newUserMembership.id
    req.session.user.hasActiveMembership = await isActive
    req.session.user.dueDays = await days
    req.session.user.membershipName =  await req.body.name
    req.session.membershipEndDate = await newUserMembership.endDate
    
    if(req.session.user.membershipName == eligibleForOffer.membershipName){
        req.session.user.eligibleForOffer = true
    } else {
        req.session.user.eligibleForOffer = false
    }
    
    return message = await Promise.resolve('Updated OK.')
};

// Payment system / fund management
async function fundManagement(action,req,res){
    let currentBalance = parseInt(req.session.user.balance)
    // let fundsToHandle = parseInt(req.body.funds)
    let fundsToHandle
    let totalFunds;
    let walletStatus;
    let message;
    
    if(!req.body.price){
        fundsToHandle = 0
    } else {
        
        if(req.body.price < 0){
            fundsToHandle = 0
            walletStatus = 0
            message = 'Funds can not be negative'
            return await Promise.resolve([walletStatus,message])
        };
        fundsToHandle = parseInt(req.body.price)
    }

    try {

        if ((action=='add') && (fundsToHandle >= 0)){
            
            totalFunds = await parseInt(Math.abs(currentBalance + fundsToHandle))
            let newFunds = await User.updateOne({id:req.session.user.id}).set({money:totalFunds})
            if(newFunds){
                //console.log(newFunds)
                req.session.user.balance = await newFunds.money
                walletStatus = 1
                message = 'Funds added!'
            } else {
                console.log('error adding funds')
                walletStatus = 0
                
            };

            
        } else if((action=='subtract')&&(fundsToHandle >= 0)){
            
            if (fundsToHandle > currentBalance){
                walletStatus = 0
                message = 'Insufficient balance!'
            
            } else if(fundsToHandle == currentBalance){
                totalFunds = 0
                let newFunds = await User.updateOne({id:req.session.user.id}).set({money:totalFunds});
                
                if(newFunds){
                    //console.log(newFunds)
                    req.session.user.balance = await newFunds.money
                    walletStatus = 1
                    message = 'Payment success! Wallet empty :('
                } else {
                    walletStatus = 0
                    message = 'something went wrong'
                };


            } else {
                totalFunds = parseInt(currentBalance - fundsToHandle)
                let newFunds = await User.updateOne({id:req.session.user.id}).set({money:totalFunds});
                
                if(newFunds){
                    //console.log(newFunds)
                    req.session.user.balance = await newFunds.money
                    walletStatus = 1
                    message = 'payment successful!'
                } else {
                    console.log('error during payment')
                    walletStatus = 0
                };

                
            }
        } else if(!action){
            walletStatus = 0
            message = 'Please provide "add" or "subtract" when calling'
        };
    }
    catch(err){
        console.log(err)
    }
    return await Promise.resolve([walletStatus,message])
};

// Function to calculate remaining sessions. NOT STORED ONLY SERVED DYNAMICALLY
async function calculateSessions(req,res){
    let totalTrainings;
    
    if(req.session.user.hasActiveMembership){
        console.log(req.session.user.membershipName)
        let membership = await Membership.find({name:req.session.user.membershipName}).limit(1)
        totalTrainings = await membership[0].typeCount
    } else {
        totalTrainings = 0
    }
    
    let message = 'beep';
    let trainingsLeft;
    console.log('inside utilities and calculating total trainigns:',totalTrainings)
    try {
        if(totalTrainings == 0){
            console.log('User has no membership. Setting total trainings to 0')
            message = 'User has no membership.'
            trainingsLeft = await totalTrainings
            
        } else {
            if(!req.session.user.trainingsBooked){
                trainingsLeft = await totalTrainings
            } else {
                trainingsLeft = (parseInt(totalTrainings) - parseInt(req.session.user.trainingsBooked))
            }
            

        }
    }
    catch(err){
        console.log(err)
    }
    return await Promise.resolve(trainingsLeft)
};

 module.exports = {  
                     _print:debugPrint,
                     validSub : validSubscription,
                     formatDate : formatDate,
                     nameFormat: nameEntry,
                     imgResize : mkProfile,
                     userModel : constructUserModel,
                     updateMembership : updateMembership,
                     fundManagement : fundManagement,
                     calculateSessions:calculateSessions
                 }