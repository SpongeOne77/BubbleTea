<script setup>
import Task from "./components/Task.vue";
import {autorun, subscribe} from "vue-meteor-tracker";
import {TaskCollections} from "../db/TaskCollections";
import TaskForm from "./components/TaskForm.vue";
import {ref} from "vue";

const hideCompleted = ref(false);
const toggleHideCompleted = () => {
  hideCompleted.value = !hideCompleted.value;
}

subscribe('tasks');
const tasks = autorun(() => {
  let filteredTasks = TaskCollections.find({}, {sort: {createAt: -1}}).fetch();

  if (hideCompleted.value) {
    filteredTasks = filteredTasks.filter(task => !task.checked);
  }

  return filteredTasks;
}).result;

const incompleteTasksCount = autorun(() => {
  return TaskCollections.find({checked: {$ne: true}}).count();
}).result;
</script>

<template>
  <header class="flex items-center justify-between px-4 py-4 bg-gray-100 border-t border-b border-gray-200">
    <h1 class="text-4xl font-bold text-gray-800 my-4">Todo List
      <span v-if="incompleteTasksCount > 0" class="text-lg font-light text-gray-600">({{ incompleteTasksCount}})</span>
    </h1>
  </header>
  <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
    <div class="mb-8 md:w-96 md:mx-auto md:mb-0 md:mt-8 md:px-4 md:py-8 text-center md:bg-gray-100 md:rounded-lg">
      <TaskForm/>
      <div>
        <button class="text-sm font-semibold text-gray-600 hover:text-gray-800" @click="toggleHideCompleted">
          <span v-if="hideCompleted">Show All</span>
          <span v-else>Hide completed</span>
        </button>
      </div>
      <ul class="list-none list-inside pt-4 md:w-96">
        <Task v-for="task of tasks" :key="task._id" :task="task"/>
      </ul>
    </div>
  </div>
</template>
