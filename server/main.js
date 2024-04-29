import {Meteor} from "meteor/meteor";
import {TaskCollections} from "../imports/db/TaskCollections";
import '../imports/api/tasksPublications';
import "../imports/api/taskMethods"

const insertTask = taskText => TaskCollections.insert({text: taskText});

Meteor.startup(() => {
  if (TaskCollections.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach(insertTask)
  }
});