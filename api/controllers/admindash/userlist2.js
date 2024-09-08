module.exports = {
    inputs: {
        usertype: {
            type: 'string'
        },
        userprop: {
            type: 'string'
        },
        userprop2: {
            type: 'string'
        },
        startDate: {
            type: "string"
        },
        endDate: {
            type: "string"
        }
    },
  

    fn: async function({usertype, userprop, userprop2, startDate, endDate}) {
        let list = [];

    

        if(usertype == "" && userprop == "" && userprop2 == "") {
        return this.res.view('pages/admindash/errorpage', {data: 'Please fill in all fields to proceed!'})

        } 

        else if(usertype == 'Customers' && userprop == "Training" && userprop2 == "Cancelled") {
            var query2 = `
            SELECT *
            FROM user
            JOIN training
            ON user.id = training.customerId
            JOIN location
            ON location.id = training.locationId
            WHERE training.isCancelled = $1
            
            `;

             var payload = await sails.sendNativeQuery(query2, [1]);
             var _results = [];
             var _results2 = [];
             var records = payload.rows
             for(let record in records) {
                 let _email = await records[record].email
                 _results.push(_email)

                 let _location = await records[record].location
                 _results2.push(_location)
             }

             console.log('records = ', _results)

             let chartData = _.countBy(_results);
             let chartData2 = _.countBy(_results2);
             console.log(chartData)

             let data = await JSON.stringify(payload);

             return this.res.view('pages/admindash/resultlists4', {data: data, chart: chartData, chart2: chartData2})
        }

        else if(usertype == 'Customers' && userprop == "Membership" && userprop2 == "Cancelled") {
             var query2 = `
            SELECT *
            FROM user
            JOIN usermembership
            ON user.id = usermembership.userId
            JOIN membership
            ON membership.id = usermembership.membershipId
            WHERE usermembership.isCancelled = $1
            
            `;

             var payload = await sails.sendNativeQuery(query2, [1]);

             let data = await JSON.stringify(payload);

             return this.res.view('pages/admindash/resultlists', {data: data})
        }

        else if(usertype == 'Trainers' && userprop == "Training" && userprop2 == "Cancelled") {
             var query2 = `
            SELECT *
            FROM user
            JOIN training
            ON user.id = training.trainerId
            JOIN location
            ON location.id = training.locationId
            WHERE training.isCancelled = $1
            
            `;

             var payload = await sails.sendNativeQuery(query2, [1]);
             var _results = [];
             var _results2 = [];
             var records = payload.rows
             for(let record in records) {
                 let _email = await records[record].email
                 _results.push(_email)

                 let _location = await records[record].location
                 _results2.push(_location)
             }

             console.log('records = ', _results)

             let chartData = _.countBy(_results);
             let chartData2 = _.countBy(_results2);
             console.log(chartData)

             let data = await JSON.stringify(payload);

             return this.res.view('pages/admindash/resultlists4', {data: data, chart: chartData, chart2: chartData2})
        }


        else if(usertype == 'Customers' && userprop == "" && userprop2 == "") {
            var query1 = `
            SELECT *
            FROM user
            
            `;

        var payload = await sails.sendNativeQuery(query1, []);
        let data = await JSON.stringify(payload);
        return this.res.view('pages/admindash/resultlists', {data: data})

        } 
        
        else if(usertype == 'Trainers' && userprop == "") {
             var query2 = `
            SELECT *
            FROM user
            JOIN userdetails
            ON user.id = userdetails.userId
            WHERE isTrainer = $1
            `;

             var payload = await sails.sendNativeQuery(query2, [1]);
             let data = await JSON.stringify(payload);
             return this.res.view('pages/admindash/resultlists', {data: data})
        }
        

        // trying to implement charts
        else if(usertype == 'Customers' && userprop == "Membership") {

             var query2 = `
            SELECT user.id, user.firstName, user.lastName, user.email, membership.name
            FROM user
            JOIN usermembership
            ON user.id = usermembership.userId
            JOIN membership
            ON membership.id = usermembership.membershipId
            WHERE user.id = usermembership.userId
            AND usermembership.isCancelled = $1
            `;

             var payload = await sails.sendNativeQuery(query2, [0]);
             var _results = []
             var records = payload.rows
             for (let record in records){
                 let _name = await records[record].name
                 _results.push(_name)
             }
             console.log('results = ', _results)
             //let uniqueName = [...new Set(_results)]
             let chartData = _.countBy(_results)
             console.log(chartData)
    
             let data = await JSON.stringify(payload);
           
             return this.res.view('pages/admindash/resultlists4', {data: data, chart:chartData, chart2:chartData})
        }  
         // end of trying to implement charts

        else if(usertype == 'Customers' && userprop == "Training" && userprop2 == "") {
             var query2 = `
            SELECT DISTINCT user.id, user.firstName, user.lastName, user.email, training.trainerId, training.startDate, location.location
            FROM user
            JOIN training
            ON user.id = training.customerId
            JOIN location
            ON location.id = training.locationId
            WHERE training.isCancelled = $1
            `;

             var payload = await sails.sendNativeQuery(query2, [0]);
             var _results = [];
             var _results2 = [];
             var records = payload.rows
             for(let record in records) {
                 let _email = await records[record].email
                 _results.push(_email)

                 let _location = await records[record].location
                 _results2.push(_location)
             }

             console.log('records = ', _results)

             let chartData = _.countBy(_results);
             let chartData2 = _.countBy(_results2);
             console.log(chartData)


             let data = await JSON.stringify(payload);
             return this.res.view('pages/admindash/resultlists4', {data: data, chart: chartData, chart2: chartData2})
        }

        else if(usertype == 'Trainers' && userprop == "Training" && userprop2 == "") {
             var query2 = `
            SELECT user.id, user.firstName, user.lastName, user.email, training.startDate,
            training.customerId, location.location
            FROM user
            JOIN training
            ON user.id = training.trainerId
            JOIN location
            ON location.id = training.locationId
            WHERE user.id = training.trainerId
            AND training.isCancelled = $1
            `;

             var payload = await sails.sendNativeQuery(query2, [0]);
             var _results = [];
             var _results2 = [];

             var records = payload.rows
             for(let record in records) {
                let _fullName = await records[record].firstName + " " + records[record].lastName
                _results.push(_fullName )

                 let _location = await records[record].location
                 _results2.push(_location)
             }
            
             console.log('records = ', _results)

             let chartData = _.countBy(_results);
             let chartData2 = _.countBy(_results2);

             console.log(chartData)
             let data = await JSON.stringify(payload);
             return this.res.view('pages/admindash/resultlists4', {data: data, chart: chartData, chart2: chartData2})
        }

        else if(usertype == "" && userprop == "Training") {
            
            return this.res.view('pages/admindash/errorpage', {data: 'This query is not a valid one!'})

        }

         else if(usertype == "" && userprop == "Membership") {
            
            return this.res.view('pages/admindash/errorpage', {data: 'This query is not a valid one!'})

        }
        

        else if(usertype == 'Trainers' && userprop == "Membership" && userprop2 == "Cancelled") {
           return this.res.view('pages/admindash/errorpage', {data: 'This query is not a valid one!'})
        }

         else if(usertype == 'Trainers' && userprop == "Membership") {
        return this.res.view('pages/admindash/errorpage', {data: 'This query is not a valid one!'})
        }

         if(usertype == "" && userprop == "" && userprop2 == "Cancelled") {
        return this.res.view('pages/admindash/errorpage', {data: 'This query is not a valid one!'})
        } 

        if(usertype == "Customers" && userprop == "" && userprop2 == "Cancelled") {
        return this.res.view('pages/admindash/errorpage', {data: 'This query is not a valid one!'})
        } 

        // Here we select a date range to find sum total of bookings

        if(startDate == "" || endDate == "") {
            return this.res.view('pages/admindash/errorpage', {data: 'Please select a date range to proceed'})
        } else {
             var queryDate = `
                SELECT t.customerId, COUNT(t.id) AS total_sessions, u.email
                FROM training t
                JOIN user u
                ON u.id = t.customerId
                WHERE t.isCancelled = $1 AND t.startDate > $2 AND t.endDate < $3
                GROUP BY t.customerId
                ORDER BY total_sessions DESC
                `

                var query2 = `
                SELECT *
                FROM training t
                JOIN user u
                ON u.id = t.customerId
                WHERE t.isCancelled = $1 AND t.startDate > $2 AND t.endDate < $3
                `

        var payload1 = await sails.sendNativeQuery(queryDate, [0, startDate, endDate]);
        var payload2 = await sails.sendNativeQuery(query2, [0, startDate, endDate]);
            var _results = [];
         
             var records = payload2.rows
             for(let record in records) {
                 let _fullName = await records[record].firstName + " " + records[record].lastName
                 _results.push(_fullName )
             }
             console.log('records = ', _results)

             let chartData = _.countBy(_results)
   
             let data1 = await JSON.stringify(payload1);
     
        return this.res.view('pages/admindash/resultlists2', {data1: data1, startDate:startDate, endDate: endDate, chart: chartData})
      
        }
       
        
    }
}