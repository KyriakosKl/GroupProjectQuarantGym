/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET /': { action: 'entrance/homepage' }, 
  '/categories': { view: 'pages/categories' }, 
  '/locations': {view: 'pages/locations'},



  // About page
  '/aboutus': {view: 'pages/aboutus'},

  // signup section 
  'GET /signup' : {action : 'account/signup'},
  'POST /signup': { action: 'account/signup2'},

   // login section
  'GET /login' : {action : 'account/login2'},
  'POST /login' : {action : 'account/login'},

  // membership creation from admin
  'GET /newmembership': {action: 'membership/createmembership'}, 
  'POST /newmembership': {action: 'membership/createmembership2'},
  'GET /membership/edit/:id': {action: 'membership/editmembership'},
  'POST /membership/update': {action: 'membership/updatemembership'}, 

  // membership purchase from customer
  '/memberships/special/:hash' : {action : 'dev/populatememberships'},
  'GET /memberships': {action: 'dev/populatememberships'},
  'POST /memberships': {action: 'membership/getmembership'},  

  // special offer membership 
  'POST /memberships/special/:hash': {action: 'membership/getmembership'},


  // select trainer section
  'GET /trainers' : {action : 'dev/populatetrainers'},
  'GET /trainers/book/:id': {action: 'account/trainer'},
  'POST /trainers/book/:id': {action: 'account/trainer2'},

  
  //delete a training
  'GET /trainings/cancel/:id': {action: 'account/deletetraining'},
  
  // delete a location
  'GET /locations/delete/:id': {action: 'admindash/deletelocation'},
  
  // customer/trainer personal page info
  '/detailsuser' : {action :'account/detailsuser'},
  
  //wallet services
  '/wallet' : {action:'account/userwallet'},

  // logout section
  'POST /goodbye' : {action : 'account/logout'},

  // admin user dashboard
  'GET /users/list': {action: 'admindash/userlist'},
  'POST /users/list': {action: 'admindash/userlist2'},
  'GET /addlocation': {action: 'admindash/addlocation'}, 
  'POST /addlocation': {action: 'admindash/addlocation2'},

  // chat route
  'GET /chat': {action: 'entrance/chat'},
  'POST /chatlogout' : {action : 'entrance/chatlogout'},

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
