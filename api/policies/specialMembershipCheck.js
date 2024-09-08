
module.exports = async function(req, res, proceed,next) {
    const utils = require('../../application/utilities')
    

    let currentUser = req.session.user;
    console.log('inside membershipAccess', currentUser)
    
    if(!req.session.user){
        console.log('user does not exist redirecting to signup')
        return res.redirect('/signup')
    } 
    
    if(!req.session.user.hasActiveMembership){
        console.log('user exists but no membership')

        return res.redirect('/memberships')
    }
 
    
    if(req.session.user.hasActiveMembership && req.session.user.membershipName == 'Bronze'){
      console.log('user exists, is active, and has a bronze membership, updating to special offer')
        await utils.updateMembership(req,next)
        return res.successAction(`Membership upgraded to ${req.body.name}!`, {where:'membership update policy'},'/detailsuser')
    }

} 

