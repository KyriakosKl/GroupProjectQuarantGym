module.exports = async function(req, res, proceed) {

    let membName = req.body.name;
    let membCount = req.body.typeCount;
    let offer = req.body.isOffer;

    if((!membName)||(!membCount)){
        return res.permissions('You need to fill Name and count fields', {when:'form membership check'},'/newmembership')
    }
    if(!offer){
        req.body.isOffer = false
        proceed();
    } else {
        proceed();
    }
}
 
// refers to : createMembCheck.js