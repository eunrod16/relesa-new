import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Orders } from '/imports/api/Orders';
import { TabularTables } from '/imports/api/init-table.js';


TabularTables.Orders = new Tabular.Table({
  name: "Orders",
  collection:  Orders,
  columns: [
    {data: "no_orden", title: "No Orden"},
    {data: "cliente", title: "Cliente"},
    {data: "estado", title: "Estado"},
    {
     title: "Seguimiento",  tmpl: Meteor.isClient && Template.seguimiento
   },
   {
    title: "Carga",  tmpl: Meteor.isClient && Template.carga
   },
   {
    title: "Cierre",  tmpl: Meteor.isClient && Template.cierre
   },
   {
    title: "Instalación",  tmpl: Meteor.isClient && Template.instalacion
   },
   {
    title: "Liquididación",  tmpl: Meteor.isClient && Template.liquidacion
   },
   {
    title: "Mantenimiento",  tmpl: Meteor.isClient && Template.mantenimiento
   },
	]
});


//Roles.createRole('user');
//Roles.createRole('admin');

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
//Orders.rawCollection().drop();
// if (Orders.find().count() === 0) {
//    Orders.insert({
//       fecha: "2022-02-02",
//       no_orden: 874847,
//       tipo_os: "GP",
//       cliente: "Rosario Portillo",
//       direccion:"Casa Azul cerca del puente",
//       region: "Metro",
//       tecnologia:"GPON",
//       tecnico:"Ricardo Gonzales",
//       auxiliar:"Daniel Vicente",
//       cobro:"18.90",
//       no_boleta:9483948,
//       observaciones:"PENDIENTE",
//       estado:"Registrado"
//
//     });
//  }


var users = [
      {name:"admin",email:"admin@example.com",roles:['admin']},
      {name:"backoffice",email:"backoffice@example.com",roles:['user']},
    ];

users.forEach(function (user) {
  var id;
if (!Accounts.findUserByEmail(user.email)) {
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
}
});
