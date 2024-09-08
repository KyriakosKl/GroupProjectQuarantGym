module.exports = {


    fn: async function() {
        if (!this.req.session){
            this.res.redirect('/login')
        } else {
            console.log(`Requested logout of user : ${this.req.session.user.id}` )
            this.req.session.destroy(function (err) {
                if(err){
                    console.log(err)
                } 
            })
            
        }
        // I changed the '/' route to listen to an action controller instead
        // Tried a redirect here to homepage in order to have a clean exit and be able to 
        // dynamically render the login/signup button on the homepage without an error
        this.res.status(200)
        this.res.redirect('/');

    }
}