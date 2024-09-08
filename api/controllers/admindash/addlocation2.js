module.exports = {
    inputs: {
        location: {
            type: 'string'
        }
    },
    // exits: {
    //     success: {
    //         viewTemplatePath: 'pages/admindash/addlocation'
    //     }
    // },
    fn: async function({location}) {
        req = this.req;
        res = this.res;
        
        let _location = await Location.create({
            location: location
        })
        
    return res.successAction('Location Added!', {where:'new location'},'/users/list')
    }
}