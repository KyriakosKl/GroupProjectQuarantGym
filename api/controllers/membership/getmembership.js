// const NewUserMembership = require('../../../classes/newuserMembership');
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
    },

    fn: async function(inputs) {
        let res = this.res;
        let req = this.req;    
        let session = this.req.session;
        //console.log(session.user_id);
        //console.log(req.body);
        await utils.updateMembership(req,res)
        await utils.fundManagement('subtract', req,res)
        await utils.calculateSessions(req,res)



        return res.successAction('Membership created!', {where:'new membership'},'/trainers')
    }
}