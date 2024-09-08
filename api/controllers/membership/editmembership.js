module.exports = {
    inputs: {
        id: {
            type: 'number'
        }
    },
      exits: {
            success: {
                viewTemplatePath: 'pages/membership/editmembership'
            }
        },
    fn: async function({id}) {
        let membership = await Membership.findOne({id});
        console.log(membership.description)
        return { membership}
    }
}