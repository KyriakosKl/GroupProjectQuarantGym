const bcrypt = require('bcryptjs');
const utilities = require('../../../application/utilities')
const tools = require('../../../application/tools')
const _print = utilities._print
const crypto = require('crypto-random-string');
const config = require('../../../application/config')

module.exports = {
    inputs:{
        email:{type:'string'},
        password:{type:'string'}
    },

    fn:async function(inputs) {
        // import timer
        
         
        _print(this.req.session)
        let session = this.req.session;
        let user;
        let goOnMr;

        let eligibleForOffers = config.eligibleForOffers
        console.log('Eligible for offers : ', eligibleForOffers) 
        
        if (inputs.email && inputs.password) {
            goOnMr = true;
        } else {
            goOnMr = false;
            return this.res.permissions('Please enter all fields', {when:'inside login'},'/login')            
        }

        if(session == undefined) {
            this.res.status(400)
            return this.res.view('pages/account/login', {data:'please login'})
        }

        if(this.req.session.user == undefined && this.req.method == 'POST' && goOnMr){
            
            user = await User.findOne({email:inputs.email})

            if(!user){
                _print('User not found');
                return this.res.permissions('Invalid criteria', {when:'inside login'},'/login')
            
            } else if (user) {
                
                let userDetails = await UserDetails.findOne({userId:user.id})
                if(this.req.method == 'POST' && user) {
                    let match = await bcrypt.compare(inputs.password, user.password)
                    //console.log(`db pass ${user.password}, form pass ${inputs.password}` )
                    //_print(`db pass ${user.password}, form pass ${inputs.password}` )
                    
                    if (match) {
                        let successTimer = tools.timers
                        await successTimer('start',this.req,this.res) 
                        // Begin building the session user model
                        const todayIs = new Date();
                        let _userModel = utilities.userModel(user,userDetails);
                        const results = await UserMembership.find({userId:user.id});

                        session.user = await _userModel;
                        session.user.logTime = todayIs;

                        //assign unique hash to user for promos & offers
                        session.user.hash = crypto({length:10})
                      
                        
                        if (results.length < 1){ // case where user was never a customer (has never bought a subscription)
                            this.req.session.user.hasActiveMembership = false
                            _print('user has no membership record. set to : ' + session.user.hasActiveMembership)
                            
                        } else {

                            let checkSub = utilities.validSub;
                            
                            let membList = [];
                            let membId = [];
                            let lastStartDate =[];
                            //create an array of past memberships
                            for (let result in results){
                                let compare = results[result].endDate;
                                let membIdTemp = results[result].id
                                let startDate = results[result].startDate
                                membList.push(compare);
                                membId.push(membIdTemp);
                                lastStartDate.push(startDate);
                            }
                            //get the last ending date of the subscription
                            let lastDate = membList.pop();
                            let lastId = membId.pop();
                            let _lastStartDate = lastStartDate.pop();
                            session.user.lastMembershipId = lastId;
                            const [isActive, days] = checkSub(todayIs, lastDate)

                            if(isActive){ // case where the user has an active subscription and has X days left
                                this.req.session.user.hasActiveMembership = true;
                                this.req.session.user.dueDays = days;
                                

                                let query = `
                                SELECT m.name 
                                FROM membership m
                                JOIN usermembership um
                                ON m.id = um.membershipId
                                JOIN user u
                                ON u.id = um.userId
                                WHERE u.id = $1
                                `
                                let bookedTrainings = await tools.calculateTrainings(user.id,this.req,this.res)
                                var _membershipName = await sails.sendNativeQuery(query, [user.id]);
                                let allMemberships = _membershipName.rows;
                                let membershipName = allMemberships.pop();
                                this.req.session.user.membershipName = membershipName.name;
                                this.req.session.user.membershipStartDate = _lastStartDate;
                                this.req.session.user.membershipEndDate = lastDate;

                                if(this.req.session.user.membershipName == eligibleForOffers.membershipName){
                                    this.req.session.user.eligibleForOffer = true

                                } else {
                                    this.req.session.user.eligibleForOffer = false
                                }
                               _print('user has membership : ' +  this.req.session.user.hasActiveMembership )
                               console.log('user eligible for offer : ', this.req.session.user.eligibleForOffer)
                               
                        
                               if(bookedTrainings){
                                   session.user.trainingsBooked = await parseInt(bookedTrainings)
                               } else {
                                   session.user.trainingsBooked = 0
                               }
                            
                            } else { // case where the user has a subscription but has expired and it's been expired for X days
                                this.req.session.user.hasActiveMembership = false
                                this.req.session.user.daysDue = days
                            }
                            _print('Login complete user object: ',  this.req.session.user)
                        }
                    
                        
                        
                        
                        _print(_userModel)
                        //timer stop on success
                        console.log(await successTimer('stop',this.req,this.res))
                        this.res.status(200)
                        return this.res.redirect('/');
                    } else {
                        return this.res.permissions('Invalid criteria', {when:'inside Login'},'/')
                    }
                }
            }
        
        }
    }
};