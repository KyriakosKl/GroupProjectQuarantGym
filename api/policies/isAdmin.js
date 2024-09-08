module.exports = async function(req, res, proceed) {
    

    if (req.session.user.email && req.session.user.isAdmin == true) {
        console.log(req.session.user.email)
        return proceed();
    } else {
        return res.permissions('Only admins have access to this page', {when:'isAdmin policy'},'/')
    }
    
}
 
