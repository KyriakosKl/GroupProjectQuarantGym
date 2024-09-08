/**
 * The user list component.
 *
 * This component comprises the user list.
 * It handles adding new users to the list as they are created, and
 * updating the status (online/offline) of users as they change.
 *
 */

/**
 * Constructor
 * @param {object} app A reference to the main chat page app.
 */
function UserList (app) {

  this.users = app.users;
  // this.users = []

}

/**
 * Initialize the user list component.
 * @param  {array} messages The initial list of users to put in the list.
 */
UserList.prototype.init = function () {

  // Add each user to the list.
  _.each(this.users, this.addNewUserToList.bind(this));

};


/**
 * Add a new user to the list
 * @param {object} user The user object.
 */
UserList.prototype.addNewUserToList = function(user) {

  // Get the user list element.
  var userListEl = $('.chat-page .user-list');

  // Create the new user item.
  var userEl = $('<li data-id="' + user.id + '">'+ user.firstName +'</li>');

  // If the new user is offline, add the "offline" class.
  if (!user) {
    userEl.addClass('offline');
  }

  // Add the new user item to the list.
  userListEl.append(userEl);

};

//  * Remove  new user from the list
// UserList.prototype.removeUserFromList = function(user, loggedInUserId) {

//   // Get the user item element.
//   var userEl = $('.chat-page .user-list [data-id=' + loggedInUserId + ']');

//   if(!user) {
//     userEl.remove();
//   }

// }

/**
 * Update a user's status
 * @param  {number}  userId   The ID of the user to update.
 * / @param  {Boolean} isOnline Whether or not the user is currently online.
 * @param {Boolean} loggedInUserId
 */

// UserList.prototype.updateUserStatus = function(userId) {

//   // Get the user item element.
//   var userEl = $('.chat-page .user-list [data-id=' + userId + ']');

//   // Add or remove the "offline" class depending on the user's status.
//   if (userId) {
//     userEl.removeClass('offline');
//   } else {
//     userEl.addClass('offline');
//   }

// };
