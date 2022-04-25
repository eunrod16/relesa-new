import { Template } from 'meteor/templating';
import { ReactiveDict } from "meteor/reactive-dict";
import { ReactiveVar } from 'meteor/reactive-var'
import { Orders } from "../api/Orders";
import { TabularTables } from "../api/init-table.js";
import './App.html';
import "./Login.js";
import { $ } from 'meteor/jquery';
import dataTablesBootstrap from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';

dataTablesBootstrap(window, $);



const getUser = () => Meteor.user();
const isUserLogged = () => !!getUser();
var current_id_order = 0;



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


Template.mainContainer.onCreated(
    function () {

      // datatables(window, $);
      // datatables_bs(window, $);
        this.current_order = new ReactiveVar(false);


    }
);

Template.mainContainer.onRendered(function(){


   //  var data = [
   //     ['Data 1', 'Data 2', 'Data 3', 'Data 4','','','','','',''],
   //     ['Data 1', 'Data 2', 'Data 3', 'Data 4','','','','','','']
   // ];
$("#dataTable").DataTable();
});

Template.mainContainer.helpers({

  tecnologia: [
      { text: 'COBRE' },
      { text: 'DTH' },
      { text: 'GPON' },
      { text: 'HFC' },
    ],
  tecnico: [
        { text: 'ANGEL MEJIA' },
        { text: 'DAVID GARCÍA' },
        { text: 'DAVID TUMAX' },
        { text: 'EMERSON MARROQUIN' },
        { text: 'ESTUARDO QUIÑONEZ' },
        { text: 'KENNET MARTINEZ' },
        { text: 'MANUEL GONZÁLEZ' },
        { text: 'RICARDO GONZÁLEZ' },
        { text: 'RODWELL ROSALES' },
        { text: 'TRIZTAN MOLINA' }
    ],
  auxiliar: [
        { text: 'IVAN SALIC' },
        { text: 'DANIEL MEJIA' },
        { text: 'LUIS QUIÑONEZ' },
        { text: 'TOBI REYES' },
        { text: 'FRANCISCO BELGARA' },
    ],
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
       estado:"REGISTRADO"

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
 'click .editarsave'() {
   Orders.update(current_id_order, {
     $set: {
       tipo_os: $('#tipo_os_edit').val(),
       cliente: $('#cliente_edit').val(),
       direccion:$('#direccion_edit').val(),
       region: $('#region_edit').val(),
       tecnologia:$('#tecnologia_edit').val(),
       tecnico:$('#tecnico_edit').val(),
       auxiliar:$('#auxiliar_edit').val(),
       cobro:$('#cobro_edit').val(),
       no_boleta:$('#no_boleta_creacion_edit').val(),
       observaciones:$('#observaciones_edit').val(),
     }
   });


    $('#tipo_os_edit').val("");
    $('#cliente_edit').val("");
    $('#direccion_edit').val("");
    $('#region_edit').val("");
    $('#tecnologia_edit').val("");
    $('#tecnico_edit').val("");
    $('#auxiliar_edit').val("");
    $('#cobro_edit').val("");
    $('#no_boleta_creacion_edit').val("");
    $('#observaciones_edit').val("");
},
  'click .open'() {
    current_id_order= this._id;
    Template.instance().current_order.set(Orders.findOne({ _id: current_id_order }));
    var current = Template.instance().current_order.get()
    $('#auxiliar_edit option[value="'+current.auxiliar+'"]').attr('selected','selected');
    $('#tecnologia_edit option[value="'+current.tecnologia+'"]').attr('selected','selected');
    $('#tecnico_edit option[value="'+current.tecnico+'"]').attr('selected','selected');
  },
  'click .delete'() {
    Orders.remove(current_id_order);
 },
  'click .cierresave'() {
    var ifcierre = $('#motivocierre').val();
    var estado = "NO CERRADO";
    if (ifcierre=='Completo') {
      estado = "CERRADO";
    }
   Orders.update(current_id_order, {
     $set: {
       estado: estado,
       motivo_cierre:$('#motivocierre').val()
     }
   });
   $('#motivocierre').val("");
 },
 'click .seguimientosave'() {
  Orders.update(current_id_order, {
    $set: {
      no_orden:$('#no_orden').val() ,
      seguimiento:$('#seguimiento').val(),
      estado:"EN SEGUIMIENTO"
    }
  });
  $('#no_orden').val("");
  $('#seguimiento').val("");
},
  'click .cargasave'() {
   Orders.update(current_id_order, {
     $set: {
       no_eta:$('#no_eta').val() ,
       codigo_inventario:$('#codigo_inventario').val(),
       estado:"CARGADO"
     }
   });
   $('#no_eta').val("");
   $('#codigo_inventario').val("");
  },
  'click .liquidacionsave'() {
   Orders.update(current_id_order, {
     $set: {
       no_boleta:$('#no_boleta').val() ,
       fecha_liquidacion:$('#fecha_liquidacion').val(),
       estado:"LIQUIDACIÓN"
     }
   });
   $('#no_boleta').val("");
   $('#fecha_liquidacion').val("");
  },
  'click .instalacionsave'() {
   Orders.update(current_id_order, {
     $set: {
       hora_inicio:$('#hora_inicio').val() ,
       hora_fin:$('#hora_fin').val(),
       estado:"INSTALADO"
     }
   });
   $('#hora_inicio').val("");
   $('#hora_fin').val("");
  },


});
