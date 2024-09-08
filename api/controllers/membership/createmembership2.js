const MembershipType = require("../../../classes/membershipType");


module.exports = {
    inputs: {
        name: {
            type: 'string',
        },
        typeCount: {
            type: 'number'
        },
        description: {
            type: 'string'
        },
        isOffer: {
            type: 'boolean'
        }
    },
    fn: async function({name, typeCount, description, isOffer}) {
        let res = this.res;
        let req = this.req;


        let _membership = new MembershipType( name, typeCount, description, isOffer);


        var membership = await Membership.create({
            name: _membership.name,
            typeCount: _membership.typecount,
            description: _membership.description,
            isOffer: _membership.isoffer
            // price: _membership.price
        }).fetch()

        //console.log(membership)

        // <-- debug mode -->
        // console.log(_membership)
        // console.log(typeof(_membership.price))


        return res.successAction('Membership created!', {where:'new membership'},'/memberships')


    }
}