module.exports = {
    exits: {
        success: {
            viewTemplatePath: 'pages/admindash/addlocation'
        }
    },
    fn: async function() {
        req = this.req;
        res = this.res;
        //console.log(req.session.user.email)
        

        return { }
    }
}