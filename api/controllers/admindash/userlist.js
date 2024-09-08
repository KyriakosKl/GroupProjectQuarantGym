const utils = require('../../../application/utilities');
module.exports = {
    // inputs: {
      
    // },
    exits: {
        success: {
            viewTemplatePath: 'pages/admindash/admindashboard'
        }
    },
    fn: async function() {
        let now = new Date();
        var today = utils.formatDate(now);


        var query1 = `
        SELECT id, startDate
        FROM training 
        WHERE startDate < $1 
        `

        var payload1 = await sails.sendNativeQuery(query1, [today]);
      

        //Here we find all memberships
        var query2 = `
        SELECT *
        FROM membership
        `
        var payload2 = await sails.sendNativeQuery(query2, [today]);
        

        // Here we select the current user who is loggedIn and has a membership

        let userId = this.req.session.user_id;

        var query3 = `
        SELECT *
        FROM user
        JOIN usermembership
        ON user.id = usermembership.userId
        WHERE $1 = usermembership.userId
        `;

        var payload3 = await sails.sendNativeQuery(query3, [userId]);

        // Here we select all active locations

        var query4 = `
        SELECT *
        FROM location
        `

        var payload4 = await sails.sendNativeQuery(query4, []);

        let data1 = JSON.stringify(payload1)
        let data2 = JSON.stringify(payload2)
        let data3 = JSON.stringify(payload3)
        let data4 = JSON.stringify(payload4)

        // debug mode
        // sails.log(data)
        // console.log(this.req.user_id)

        
        return { data1: data1, data2: data2, data3: data3, data4: data4}
    }
}