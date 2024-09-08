module.exports = {
    inputs:{
        id : {
            type:'number'
         }
     },
 
     fn: async function({id}) {
         
         let deleteLocation = await Location.destroyOne({id:id})
         
         if(deleteLocation){
            return this.res.successAction('Location deleted.', {where:'inside delete location'},'/users/list')
         } else {
            return this.res.permissions('Location not deleted',{where:'inside delete location'},'/users/list')
         }
     }
 }
 