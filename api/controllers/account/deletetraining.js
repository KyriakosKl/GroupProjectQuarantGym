module.exports = {
    inputs:{
        id : {
            type:'number'
         }
     },
 

     fn: async function({id}) {
         let trainingsHandle = require('./../../../application/tools').trainingsHandle

         let deletedTraining = await Training.updateOne({id:id}).set({isCancelled:1})
         
         await trainingsHandle('delete',this.req,this.res)
         //console.log('deleted a training, new user object : ', this.req.session.user)
         if(deletedTraining){
            return this.res.successAction('Training deleted.', {where:'inside delete training'},'/detailsuser')
         } else {
            return this.res.permissions('Training not deleted',{where:'inside delete training'},'/detailsuser')
         }
     }
 }
 