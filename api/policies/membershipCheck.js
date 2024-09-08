
module.exports = async function(req, res, proceed) {
    if(req.session.user) {
        //console.log(req.session.user)
 
        if(req.session.user && req.session.user.hasActiveMembership) {
            return proceed()
        } else {
            return res.view('pages/membership/nomembership', {data: "You need to become a member to access this page!"})
            }
    } else {
        return res.view('pages/unauthorized', {data: "Please login to view this content"})
    }

}
