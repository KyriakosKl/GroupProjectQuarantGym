module.exports = {
    exits: {
        success: {
            viewTemplatePath: 'pages/membership/newmembership' // exit view to membership submission form
        }
    },
    fn: async function() {
          /* This is the GET controller for the membership submission page. 
            When initially called, it will redirect to the membership creation page with an object of empty errors.
            The object error *MUST* be passed even if empty.
            Only ADMIN users will have access to this page 
        */
        
        return {}
    }
}