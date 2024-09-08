module.exports = {
    
    fn: async function() {
        
        /* This is the GET controller for the signup page. 
            When initially called, it will redirect to the sign up page with an object of empty errors.
            The object error *MUST* be passed even if empty.

        */
       let req = this.req
       let res = this.res
       let session = this.req.session
       
       if(session.user){
            return res.permissions('Sign out and sign up again', {when:'inside signup'},'/')
       } else if(!session.user) {
            
        let error = {generalError:'', fnameError:'', lnameError:'', addressError:'', passwordError:'', confirmPasswordError:'', emailError:''}
            res.status(400)
            return res.view('pages/account/signup', {errorList:error})
       }
        
        let error = {generalError:'', fnameError:'', lnameError:'', addressError:'', passwordError:'', confirmPasswordError:'', emailError:''}
        return {errorList:error}
    }
}