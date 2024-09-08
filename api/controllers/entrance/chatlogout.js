module.exports = {
    
    // exits : {
    //     success : {
    //         viewTemplatePath : 'pages/homepage2'
    //     }
    // },

    fn: async function() {
        if (!this.req.session.user){
            return this.res.redirect('/');
        } else {
            let user = await ChatMessage.destroy({userId: this.req.session.user.id});
           
            // Create an admin chat message.
            ChatMessage.create({
                text: this.req.session.user.fname + ' left the room.',
                userId: this.req.session.user.id,
            })
            .meta({fetch: true})
            .exec(function(err, message) {
                if (err) { return exits.serverError(err); }

                // Blast that message out to all sockets (except the sender).
                sails.sockets.blast('chatmessage', { 
                verb: 'created',
                id: message.id,
                data: { 
                    text: message.text,
                    userId: this.req.session.user.id,
                }
                }, this.req);
            });
            // chat message end  
            this.res.redirect('/');
        }
        // return {}
    }
}