/**
 * 
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    firstName: { 
        type: 'string',
        required: true,
        maxLength: 120
    },

     lastName: { 
        type: 'string',
        required: true,
        maxLength: 120
    },

    email: { 
        type: 'string', 
        required: true,
        unique: true,
        isEmail: true,
        maxLength: 200
    },

    password: { 
        type: 'string',
        required: true 
    },
    money: {
        type: 'number'
    },
    

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    //  membership: {
    //     model: 'UserMembership'
    // }
     membership: {
        collection: 'UserMembership',
        via: 'userId'
    },
     trainingTrainer: {
        collection: 'Training',
        via: 'trainerId',
    },
    trainingCustomer: {
        collection: 'Training',
        via: 'customerId'
    }, 
     userDetails: {
        collection: 'UserDetails',
        via: 'userId' 
    }
  },

};

