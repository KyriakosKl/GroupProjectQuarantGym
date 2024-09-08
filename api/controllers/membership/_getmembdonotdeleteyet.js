const NewUserMembership = require('../../../classes/newuserMembership');
const utils = require('../../../application/utilities')
const config = require('../../../application/config')

module.exports = {
    inputs: {
        id: {
            type: 'number'
        },
        startDate: {
            type: 'string'
        },
        endDate: {
            type: 'string'
        },
        price: {
            type: 'number'
        },
        userId: {
            type: 'number'
        },
        // membershipId: {
        //     type: 'number'
        // }
    },
    // exits: {
    //     success: {
    //         viewTemplatePath: 'pages/account/successTemp' // exit view to membership submission form
    //     }
    // },

    fn: async function(inputs) {
        let res = this.res;
        let req = this.req;    
        let session = this.req.session;
        //console.log(session.user_id);
        //console.log(req.body);
        await utils.updateMembership(req,res)
        await utils.fundManagement('subtract', req,res)
        await utils.calculateSessions(req,res)
        // let id = req.body.id;
        // let startDate = req.body.startDate;
        // let price = req.body.price;
        // let isCancelled = req.body.isCancelled;
        // let userId = session.user.id;
        // let membershipId = req.body.id;
        // let eligibleForOffers = config.eligibleForOffers.membershipName

        // /**
        //  * updated with Class corrections 
        //  */
        // let _newMembership = new NewUserMembership(id,startDate, price, isCancelled, userId, membershipId);
        // console.log(_newMembership.endDate);

        // var newUserMembership = await UserMembership.create({
        //     startDate: _newMembership.startDate,
        //     endDate: _newMembership.endDate,
        //     price: _newMembership.price,
        //     isCancelled: _newMembership.isCancelled,
        //     userId: _newMembership.userId,
        //     membershipId: _newMembership.id
        // }).fetch()


        // const [isActive, days] =   utils.validSub(req.body.startDate, newUserMembership.endDate)
        // req.session.user.lastMembershipId = await newUserMembership.id
        // req.session.user.hasActiveMembership = await isActive
        // req.session.user.dueDays = await days
        // req.session.user.membershipName =  req.body.name
        // req.session.user.membershipEndDate = await newUserMembership.endDate
        
        // if(req.session.user.membershipName == eligibleForOffers.membershipName){
        //     req.session.user.eligibleForOffer = true
        // } else {
        //     req.session.user.eligibleForOffer = false
        // }
        // console.log(req.session.user);


        return res.successAction('Membership created!', {where:'new membership'},'/trainers')
    }
}