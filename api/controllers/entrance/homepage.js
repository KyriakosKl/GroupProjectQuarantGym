const utils = require('../../../application/utilities')

module.exports = {
    exits: {
        success: {
            viewTemplatePath: 'pages/homepage'
        }
    },
    fn: async function() {
        req = this.req;
        res = this.res;
        let capIt = utils.nameFormat
        let trainers= []

        let path = require('path').resolve(sails.config.appPath, 'assets')
        
        var _query = `
        SELECT firstName, lastName, image, bio
        FROM user
        JOIN userdetails
        ON user.id = userdetails.userId
        WHERE isTrainer = $1
        `

        var query = await sails.sendNativeQuery(_query, [1]);

        for (let record in query.rows){

                let trainer={}
                trainer.image = await query.rows[record].image.split(path)[1]
                trainer.fName = await query.rows[record].firstName
                trainer.lName = await capIt(query.rows[record].lastName)
                trainer.bio = await capIt(query.rows[record].bio.split('.')[0])
                trainers.push(trainer)
            }
        

        return {trainerData:trainers}
    }
}