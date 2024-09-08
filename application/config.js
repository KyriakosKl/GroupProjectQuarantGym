
let eligibleForOffers = {
    membershipName :'Bronze',
    daysDue : 365
}



let memberships = {
    1:{
        name:'Bronze',
        price:100,
        trainings:10,
        isOffer:false
    },
    2:{
        name:'Silver',
        price:200,
        trainings:20,
        isOffer:false
    },
    3:{
        name:'Gold',
        price:300,
        trainings:30,
        isOffer:false
    },
    4:{
        name:'Special Offer 1',
        price:100,
        trainings:10,
        isOffer:true
    },
}

module.exports = {
    eligibleForOffers : eligibleForOffers,
    memberships : memberships
}

