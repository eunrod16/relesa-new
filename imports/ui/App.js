import { Template } from 'meteor/templating';
import { ReactiveDict } from "meteor/reactive-dict";
import { ReactiveVar } from 'meteor/reactive-var'
import { Orders } from "../api/Orders";
import './App.html';
import "./Login.js";

// Template.mainContainer.helpers({
//   tasks: [
//     { text: 'This is task 1' },
//     { text: 'This is task 2' },
//     { text: 'This is task 3' },
//   ],
// });
const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();
var current_id_order = 0;


Template.mainContainer.onCreated(
    function () {
        this.current_order = new ReactiveVar(false);
    }
);

Template.mainContainer.helpers({

  isUserLogged() {
    return isUserLogged();
  },
  orders() {
    return Orders.find({});
  },
  current_order(){
    return Template.instance().current_order.get();
  }
});



Template.mainContainer.events({
  'click .logout'() {
    Meteor.logout();
  },
  'click .crearsave'() {
    Orders.insert({
       fecha: $('#fecha_creacion').val(),
       no_orden: $('#no_orden_creacion').val(),
       tipo_os: $('#tipo_os').val(),
       cliente: $('#cliente').val(),
       direccion:$('#direccion').val(),
       region: $('#region').val(),
       tecnologia:$('#tecnologia').val(),
       tecnico:$('#tecnico').val(),
       auxiliar:$('#auxiliar').val(),
       cobro:$('#cobro').val(),
       no_boleta:$('#no_boleta_creacion').val(),
       observaciones:$('#observaciones').val(),
       estado:"Registrado"

     });
     $('#fecha_creacion').val("");
     $('#no_orden_creacion').val("");
     $('#tipo_os').val("");
     $('#cliente').val("");
     $('#direccion').val("");
     $('#region').val("");
     $('#tecnologia').val("");
     $('#tecnico').val("");
     $('#auxiliar').val("");
     $('#cobro').val("");
     $('#no_boleta_creacion').val("");
     $('#observaciones').val("");
 },
  'click .open'() {
    current_id_order= this._id;
    Template.instance().current_order.set(Orders.findOne({ _id: current_id_order }));
    console.log(Template.instance().current_order.get()['hora_inicio'])
  },
  'click .cierresave'() {
   Orders.update(current_id_order, {
     $set: {
       estado: "CERRADO",
       motivo_cierre:$('#motivocierre').val()
     }
   });
   $('#motivocierre').val("");
 },
 'click .seguimientosave'() {
  Orders.update(current_id_order, {
    $set: {
      no_orden:$('#no_orden').val() ,
      seguimiento:$('#seguimiento').val()
    }
  });
  $('#no_orden').val("");
  $('#seguimiento').val("");
},
  'click .cargasave'() {
   Orders.update(current_id_order, {
     $set: {
       no_eta:$('#no_eta').val() ,
       codigo_inventario:$('#codigo_inventario').val()
     }
   });
   $('#no_eta').val("");
   $('#codigo_inventario').val("");
  },
  'click .liquidacionsave'() {
   Orders.update(current_id_order, {
     $set: {
       no_boleta:$('#no_boleta').val() ,
       fecha_liquidacion:$('#fecha_liquidacion').val()
     }
   });
   $('#no_boleta').val("");
   $('#fecha_liquidacion').val("");
  },
  'click .instalacionsave'() {
   Orders.update(current_id_order, {
     $set: {
       hora_inicio:$('#hora_inicio').val() ,
       hora_fin:$('#hora_fin').val()
     }
   });
   $('#hora_inicio').val("");
   $('#hora_fin').val("");
  },


});
