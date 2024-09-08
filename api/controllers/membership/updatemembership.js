module.exports = {
      inputs: {
        id: {
              type: 'number'
          },
        name: {
            type: 'string',
        },
        typeCount: {
            type: 'number'
        },
        description: {
            type: 'string'
        },
        isOffer: {
            type: 'boolean'
        }
    },
    fn: async function({id, name, typeCount, description, isOffer}){

        let membership = await Membership.updateOne({id}).set({
            name: name,
            typeCount: typeCount,
            description: description,
            isOffer: isOffer
        });

         return this.res.successAction('Membership updated!', {where:'updated membership'},'/users/list')
    }
}