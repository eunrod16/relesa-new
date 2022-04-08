import { Template } from 'meteor/templating';
import { ReactiveDict } from "meteor/reactive-dict";
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


Template.mainContainer.helpers({
  isUserLogged() {
    return isUserLogged();
  }
});



Template.mainContainer.events({
  'click .logout'() {
    Meteor.logout();
  }
});
