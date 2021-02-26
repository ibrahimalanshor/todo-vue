<template>
  <div id="app">

    <div class="box">
      <div class="body">

        <div class="title">
          <h1>{{ title }}</h1>
          <button class="title-button" @click="toggleEditTitle">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>

        <div class="bar">
          <div class="fill">
            <div class="precentage" :style="{ width: precentage }"></div>
          </div>
          <span>
            {{ precentage }}
          </span>
        </div>

        <ul class="list" v-if="todos.length">
          <li v-for="(todo, index) in todos" :key="index">
            <label>
              <div class="checkbox">
                <input type="checkbox" v-model="todo.done" @change="storeTodo">
                <span class="check"></span>
                <span class="text">{{ todo.text }}</span>
              </div>
              <button class="list-button" @click="removeTodo(index)">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </label>
          </li>
        </ul>

        <ul class="list" v-else>
          <li>Empty</li>
        </ul>

      </div>

      <div class="foot">
        <button @click="toggleAddTodo">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

    </div>

    <modal title="Edit Title" :close="toggleEditTitle" v-if="editTitle">
      <form @submit.prevent="saveTitle">
        <label>Title</label>
        <input type="text" :class="{ 'error': errorTitle.error }" placeholder="Title" v-model="newTitle">
        <small class="error" v-if="errorTitle.error">{{ errorTitle.msg }}</small>
        <button>Save</button>
      </form>
    </modal>

    <modal title="Add Todo" :close="toggleAddTodo" v-if="addTodo">
      <form @submit.prevent="saveTodo">
        <label>Action</label>
        <input type="text" :class="{ 'error': errorAction.error }" placeholder="Action" v-model="action">
        <small class="error" v-if="errorAction.error">{{ errorAction.msg }}</small>
        <button>Save</button>
      </form>
    </modal>

  </div>
</template>

<script>
  import Modal from './components/Modal'

  export default {
    components: {
      Modal
    },
    data() {
      return {
        title: 'Work',
        newTitle: '',
        action: '',
        editTitle: false,
        addTodo: false,
        errorTitle: {
          error: false,
          msg: 'Field empty'
        },
        errorAction: {
          error: false,
          msg: 'Field empty or todo exist'
        },
        todos: []
      }
    },
    computed: {
      precentage() {
        const total = this.todos.length
        const done = this.todos.filter(todo => todo.done).length
        const precent = done / total * 100


        return `${Math.round(precent) || '0'}%`
      }
    },
    methods: {
      toggleEditTitle() {
        this.errorTitle.error = false
        this.editTitle = !this.editTitle
      },
      toggleAddTodo() {
        this.action = ''
        this.errorAction.error = false
        this.addTodo = !this.addTodo
      },
      saveTitle() {
        if (this.newTitle !== '') {
          localStorage.setItem('todo-title', this.newTitle)

          this.setTitle(this.newTitle)
          this.toggleEditTitle()
        } else {
          this.errorTitle.error = true
        }
      },
      saveTodo() {
        const check = this.todos.some(todo => todo.text === this.action)

        if (this.action !== '' && !check) {
          this.todos.push({
            text: this.action,
            done: false
          })

          this.storeTodo()
          this.toggleAddTodo()
        } else {
          this.errorAction.error = true
        }
      },
      storeTodo() {
        localStorage.setItem('todos', JSON.stringify(this.todos))
      },
      setTitle(title) {
        this.title = title
        this.newTitle = title
      },
      setTodo(todos) {
        this.todos = todos
      },
      removeTodo(id) {
        this.todos.splice(id, 1)

        this.storeTodo()
      },
      getTitle() {
        return new Promise((resolve, reject) => {
          const todoTitle = localStorage.getItem('todo-title')

          todoTitle ? resolve(todoTitle) : reject('Work')
        })
      },
      getTodo() {
        return new Promise((resolve, reject) => {
          const todos = localStorage.getItem('todos')

          todos ? resolve(JSON.parse(todos)) : reject([])
        })
      }
    },
    mounted() {
      this.getTitle().then(this.setTitle).catch(this.setTitle)
      this.getTodo().then(this.setTodo).catch(this.setTodo)
    }
  }
</script>

<style>
  #app {
    font-family: 'Ubuntu', sans-serif;
  }
</style>