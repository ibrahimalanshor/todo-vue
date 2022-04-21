<template>
  <form class="todo-form" v-on:submit.prevent="save">
    <input type="text" class="text-input"  :class="{ 'error-input': validation !== '' }" placeholder="New Todo" v-model="name">
  </form>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['save'])

const name = ref('')
const validation = ref('')

const validate = name => {
  return new Promise((resolve, reject) => {
    if (name === '') {
      reject('Todo cannot empty')
    }

    resolve(name)
  })
}

const save = () => {
  validation.value = ''

  validate(name.value)
    .then(name => {
      emit('save', name)
      
      validation.value = ''
    })
    .catch(err => {
      validation.value = err
    })
    .finally(() => {
      name.value = ''
    })
}
</script>

<style>
.todo-form {
  @apply mt-4;
}
.text-input {
  @apply block px-3 py-2 w-full border rounded-lg focus:outline-none focus:border-gray-700;
}
.error-input {
  @apply border-red-400 focus:border-red-400;
}
</style>