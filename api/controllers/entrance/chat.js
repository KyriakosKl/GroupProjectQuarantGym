module.exports = {


  friendlyName: 'Chat',


  description: 'Display the login page or the chat page, depending on whether there is a logged-in user.',


  inputs: {
    
  },


  exits: {

    // loginPage: {
    //   responseType: 'view',
    //   viewTemplatePath: 'pages/account/_login'
    // },

    chatPage: {
      responseType: 'view',
      viewTemplatePath: 'pages/chatview/chat'
    }

  },


  fn:  function (inputs, exits) {
    
    // If there is no user ID in the session, show the login page.
    if (!this.req.session.user) {
    //   return exits.loginPage({});
        return this.res.redirect('/login');
    }

    // Attempt to find the user whose ID is in the session.
    let newUser = User.findOne({id: this.req.session.user.id}).exec(function(err, user) {
      if (err) { return exits.error(err); }

      if(user){
         // Create an admin chat message.                      
            ChatMessage.create({
                text: this.req.session.user.fname + ' joined the room.',
                userId: this.req.session.user.id,
            })
                .meta({fetch: true})
                .exec(function(err, message) {
                    if (err) { return exits.serverError(err); }
                    // Blast the message to all connected sockets.
                    sails.sockets.blast('chatmessage', {
                        verb: 'created',
                        id: message.id,
                        data: {
                                text: message.text,
                                // userId: this.req.session.user.id
                                userId: message.userId
                            }
                        });
                    });
                    
              }

                   // End of Create an admin chat message.

      // Looks like this is a valid, logged-in user, so show the chat page.
      return exits.chatPage({
        loggedInUserId: this.req.session.user.id,
        email: this.req.session.user.email,
        fname: this.req.session.user.fname,
        
        // username: user.username
      });
    });

  }

};
