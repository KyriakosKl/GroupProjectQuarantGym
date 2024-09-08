const bcrypt = require('bcryptjs');
//const { exits } = require('./trainer2');

/**
 * Questions for pasp
 * Do we need returns? 
 * Because that's not how you get returns
 * Not a single return has been parsed inside this controller (yet it works flawlessly??)
 */



module.exports = {
    inputs: {
        email: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
        confirmPass: {
            type: 'string',
        },
        fname: {
            type: 'string',
        },
        lname: {
            type: 'string',
        },
        address : {
            type : 'string'
        },

    },


    fn: async function(inputs) {
        let res = this.res;
        let req = this.req;
        let checkExisting = await User.findOne({email:inputs.email});
        let pass = inputs.password;
        const hashedPass = await bcrypt.hash(pass,10);
        
        /*
        Uncomment for debugging purposes 
        console.log(inputs.email)
        console.log(hashedPass)
        console.log('User exists? : ' + checkExisting)
        */

        // Begin by checking if a user with the input email exists. If not continue with the record
        if(!checkExisting){
            if(inputs.fname=='Trainer'){
                var user = await User.create({firstName:inputs.fname,lastName:inputs.lname, password:hashedPass, email:inputs.email, money:'0'}).fetch()
                var userDetails = await UserDetails.create({address:inputs.address, userId:user.id, isCustomer:true, isAdmin:false, isTrainer:true})

                return res.successAction('Trainer created.', {where:'inside signup'},'/login')
                //console.log('created trainer')
            } if(inputs.fname=='Admin'){
                var user = await User.create({firstName:inputs.fname,lastName:inputs.lname, password:hashedPass, email:inputs.email, money:'0'}).fetch()
                var userDetails = await UserDetails.create({address:inputs.address, userId:user.id, isCustomer:true, isAdmin:true, isTrainer:false})

                return res.successAction('Admin created.', {where:'inside signup'},'/login')
                //console.log('created trainer')
            }  
            else {
                var user = await User.create({firstName:inputs.fname,lastName:inputs.lname, password:hashedPass, email:inputs.email, money:'0'}).fetch()
                var userDetails = await UserDetails.create({address:inputs.address, userId:user.id, isCustomer:true, isAdmin:false, isTrainer:false})
                //console.log('created customer')
                res.status(200)
                res.redirect('/login');
            }
        } else if(checkExisting){ // exit route if user exists

            return res.permissions('User already exists', {when:'inside signup'},'/login')

        }
    }
}
