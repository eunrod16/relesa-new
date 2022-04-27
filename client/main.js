import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '@fortawesome/fontawesome-free/js/all.js'
import { $ } from 'jquery'
import '../imports/ui/App.js';
import '../imports/ui/sb-admin-2.min.css';
import './bootstrap.bundle.js';
import './sb-admin-2.min.js';
import './jquery.min.js';
import './main.html';






Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});



Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
