<template>
  <div class="wrapper">
    <div class="content">
      <div class="box">
        <header class="header">
          <h1 class="title">Todo App</h1>
        </header>
        <div class="todo-list">
          <div v-if="todos.length">
            <todo-item v-for="(todo, key) in todos" :key="key" :todo="todo" v-on:check="handleCheck" v-on:delete="handleDelete" />
          </div>
          <span class="todo-empty" v-else>Todo Empty</span>
        </div>
        <todo-form v-on:save="handleSave" />
      </div>
      <footer class="footer">
        <a href="https://github.com/ibrahimalanshor/todo-vue" target="_blank">Source Code</a>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { TodoItem, TodoForm } from './components'
import { useTodo } from './store'

const { todos, get, create, update, remove } = useTodo()

onMounted(() => {
  get()
})

const handleSave = name => {
  create(name)
}
const handleCheck = val => {
  update(val)
}
const handleDelete = id => {
  remove(id)
}
</script>

<style>
.wrapper {
  @apply w-full min-h-screen py-20 px-4 overflow-auto flex justify-center bg-gray-100 text-gray-700;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.content {
  @apply w-full sm:w-96 mx-auto;
}
.box {
  @apply bg-white w-full p-5 rounded-md;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 10px 50px;
}
.header {
  @apply mb-3;
}
.title {
  @apply font-bold text-xl text-gray-800;
}
.todo-empty {
  @apply text-gray-400;
}
.footer {
  @apply py-4 text-right text-sm text-gray-500;
}
</style>