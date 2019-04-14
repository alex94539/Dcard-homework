import { Template } from 'meteor/templating';
import './task.html';

Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('tasks.remove', this._id);
  },
  'click .update'() {
    let s = prompt("update this todo-list element", this.text);
    if(s!==null){
      Meteor.call('update',[this._id, s]);
    }
  },
});