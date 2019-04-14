import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import { status } from '../api/status.js'
import './task.js';
import './body.html';

Template.body.helpers({
  tasks() {
    let state;
    let temp = status.find({"flag": {"$exists": true}});
    temp.forEach((mumi)=>{
        state = mumi.state;
    });
    switch(state){
      case 'a':
        return Tasks.find({}, { sort: { createdAt: -1} });
      case 'b':
        return Tasks.find({"checked": true}, { sort: { createdAt: -1} });
      case 'c':
        return Tasks.find({"checked": false}, { sort: { createdAt: -1} });
    }
  },
});

Template.body.events({
    'click #statea'(){
        let temp = status.find({"flag": {"$exists": true}});
        let id;
        temp.forEach((mumi)=>{
            id = mumi._id;
        });
        status.update(id, {
          $set: {state: "a"},
        })
    },
    'click #stateb'(){
      let temp = status.find({"flag": {"$exists": true}});
      let id;
      temp.forEach((mumi)=>{
          id = mumi._id;
      });
      status.update(id, {
        $set: {state: "b"},
      })
      
    },
    'click #statec'(){
        let temp = status.find({"flag": {"$exists": true}});
        let id;
        temp.forEach((mumi)=>{
            id = mumi._id;
        });
        status.update(id, {
          $set: {state: "c"},
        })
    },
    'click #clear'(){
        console.log("click");
        Meteor.call('clear');
    },
    'click #reset'(){
        Meteor.call('reset');
    },
    'submit .new-task'(event) {
      // Prevent default browser form submit
      event.preventDefault();
  
      // Get value from form element
      const target = event.target;
      const text = target.text.value;
  
      // Insert a task into the collection
      Meteor.call('tasks.insert', text);

  
      // Clear form
      target.text.value = '';
    },
  });