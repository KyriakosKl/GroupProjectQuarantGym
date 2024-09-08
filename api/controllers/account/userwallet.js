/*
* Wallet controller 
* this controller will server GET & POST for the wallet functionality
*/
let utils = require('../../../application/utilities')

module.exports = {

    inputs:{

    },
    
    fn:async function(){
        let req = this.req
        let res = this.res
        let session = this.req.session
        let method = await req.method
        let funds = utils.fundManagement

        if(method == 'POST'){
            console.log('inside post wallet')
            const [walletStatus,message] = await funds('add',req,res)
            //console.log(walletStatus, message)
            if(walletStatus){
                res.successAction(`${message} : ${session.user.balance}`, {where:'wallet POST'},'/detailsuser')
            }else if(!walletStatus){
                res.permissions(`${message}`, {when:'while updating wallet'},'/detailsuser')
            }
            
        
        
        } else if (method == 'GET') {
            let data = 'some data'
            res.status(200)
            res.view('pages/account/wallet', {data:data})
        
        
        
        } else {
            console.log('No post no get this is what you get')
        }

    },
}