import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

export const Tasks = new Mongo.Collection('tasks');


Meteor.methods({
    'tasks.insert'(text) {
      check(text, String); // Make sure the user is logged in before inserting a task
      
      Tasks.insert({
        text,
        createdAt: new Date(),
        checked: false,
      });
    },
    'tasks.remove'(taskId) {
      check(taskId, String);
      Tasks.remove(taskId);
    },
    'tasks.setChecked'(taskId, setChecked) {
      check(taskId, String);
      check(setChecked, Boolean);
      Tasks.update(taskId, { $set: { checked: setChecked } });
    },
    'update'(arg){
      let taskId = arg[0], word = arg[1]
      Tasks.update(taskId, { $set: { text: word}});
    },
    'clear'(){
      Tasks.remove({checked: true});
    },
    'reset'(){
      Tasks.remove({});
    }
  });