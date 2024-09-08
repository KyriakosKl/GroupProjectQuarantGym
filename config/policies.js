/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */ 

const isLoggedIn = require("../api/policies/isLoggedIn");
const formCheck = require("../api/policies/formCheck");
const trainingCheck = require("../api/policies/trainingCheck");
const membershipAccess = require("../api/policies/membershipAccess");
const membershipForm = require("../api/policies/membershipForm");
const isAdmin = require('../api/policies/isAdmin');
const chatCheck = require('../api/policies/chatCheck');


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  'account/signup2':formCheck,
  'account/detailsuser':isLoggedIn,
  'account/userwallet': isLoggedIn,
  'account/trainer': ['isLoggedIn', 'membershipCheck'], // reminder to self <--- need to fix membershipCheck as well
  'account/trainer2':trainingCheck,
  'account/deletetraining':isLoggedIn,
  'membership/getmembership': membershipAccess,
  'membership/createmembership2': membershipForm,
  'admindash/addlocation': ['isLoggedIn', 'isAdmin'],
  'admindash/userlist': ['isLoggedIn', 'isAdmin'],
  'membership/createmembership': ['isLoggedIn', 'isAdmin'],
  'admindash/deletelocation': ['isLoggedIn', 'isAdmin'],
  'membership/editmembership': ['isLoggedIn', 'isAdmin'],
  'entrance/chat': ['isLoggedin','chatCheck'],
};
