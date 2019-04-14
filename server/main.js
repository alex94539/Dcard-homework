import { Meteor } from 'meteor/meteor';
import { status } from '../imports/api/status';
import { Tasks } from '../imports/api/tasks'
import '../imports/api/tasks.js';


Meteor.startup(() => {
  status.remove({});
  status.insert({
    state: "a",
    flag: "true"
  });

  
  // code to run on server at startup
});
