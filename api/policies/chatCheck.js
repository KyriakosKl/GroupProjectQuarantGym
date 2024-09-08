module.exports = async function(req, res, proceed) {
    

    if (!req.session.user){
        return res.permissions('You need to first sign in to enter the chat', {when:'isloggedIn policy'},'/login')
    } 
    
    else  {
        let messages = await ChatMessage.destroy({userId: req.session.user.id})
        return proceed();
    } 
    // let messages = await ChatMessage.destroy({userId: req.session.user.id})
    // return proceed();
    
}
 
