import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

Roles.createRole('user');
Roles.createRole('admin');

/*const SEED_USERNAME = 'admin';
const SEED_PASSWORD = 'admin';

const SEED_USERNAME1 = 'user';
const SEED_PASSWORD1 = 'user';

Meteor.startup(() => {
  // code to run on server at startup
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
    Roles.addUsersToRoles(SEED_USERNAME, 'admin', null);
  }
  if (!Accounts.findUserByUsername(SEED_USERNAME1)) {
    Accounts.createUser({
      username: SEED_USERNAME1,
      password: SEED_PASSWORD1,
    });
    Roles.addUsersToRoles(SEED_USERNAME1, 'user', null);
  }
});*/

var users = [
      {name:"admin",email:"admin@example.com",roles:['admin']},
      {name:"backoffice",email:"backoffice@example.com",roles:['user']},
    ];

users.forEach(function (user) {
  var id;

  id = Accounts.createUser({
    email: user.email,
    password: "password",
    profile: { name: user.name }
  });

  if (Meteor.roleAssignment.find({ 'user._id': id }).count() === 0) {
    import { Roles } from 'meteor/alanning:roles';

    user.roles.forEach(function (role) {
      Roles.createRole(role, {unlessExists: true});
    });
    // Need _id of existing user record so this call must come after `Accounts.createUser`.
    Roles.addUsersToRoles(id, user.roles);
  }

});
