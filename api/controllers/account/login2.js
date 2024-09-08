
module.exports = {


    fn:async function () {
        console.log(this.req.session)
        
        if (this.req.session.user !== undefined){
            return this.res.successAction('Already logged in!', {where:'user tried to login again inside login2'},'/')
        } 
        if (this.req.session.user == undefined){
            this.res.status(400)
            return this.res.view('pages/account/login', {data:'please login'})
            
        }
    }
    
}