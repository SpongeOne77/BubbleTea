import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import {TaskCollections} from "../db/TaskCollections";

Meteor.methods({
    'tasks.insert'(text) {
        check(text, String);

        TaskCollections.insert({
            text,
            createAt: new Date,
            userId: this.userId
        })
    },

    'tasks.remove'(taskId) {
        check(taskId, String);
        TaskCollections.remove(taskId);
    },

    'tasks.setIsChecked'(taskId, checked) {
        check(taskId, String);
        check(checked, Boolean);

        TaskCollections.update(taskId, {
            $set: {
                checked
            }
        })
    }
})