import {Meteor} from "meteor/meteor";
import {TaskCollections} from "../db/TaskCollections";

Meteor.publish('tasks', function publishTasks() {
    return TaskCollections.find({userId: this.userId});
})