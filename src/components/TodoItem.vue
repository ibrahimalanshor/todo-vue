<template>
  <div class="todo-item">          
    <input type="checkbox" class="todo-checkbox checkbox-input" :checked="todo.done" v-on:change="handleCheck" :id="`todo-${todo.id}`">
    <div class="todo-content">
      <label :for="`todo-${todo.id}`" class="todo-text">{{ todo.name }}</label>
      <button class="todo-delete" v-on:click="handleDelete">
        <x />
      </button>
    </div>
  </div>
</template>

<script setup>
import { X } from './icons'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['check', 'delete'])

const handleCheck = e => {
  emit('check', {
    id: props.todo.id,
    done: e.target.checked
  })
}

const handleDelete = () => {
  emit('delete', props.todo.id)
}
</script>

<style>
.todo-item {
  @apply flex items-start mb-2;
}
.todo-text {
  @apply block;
}
.todo-delete {
  @apply hidden text-xs text-red-400;
}
.todo-item:hover .todo-delete {
  @apply block;
}
.todo-checkbox {
  @apply mt-1;
}
.todo-content {
  @apply flex flex-grow items-center justify-between;
}
.checkbox-input {
  @apply appearance-none w-4 h-4 flex items-center justify-center bg-white border rounded mr-3 focus:outline-none focus:border-gray-700;
}
.checkbox-input:checked {
  @apply bg-gray-700 border-gray-700;
}
.checkbox-input:checked:after {
  content: '';
  width: 8px;
  height: 5px;
  @apply block border-l-2 border-b-2 border-white -rotate-45;
}
.checkbox-input:checked ~ .todo-content .todo-text {
  @apply line-through text-gray-400;
}
</style>