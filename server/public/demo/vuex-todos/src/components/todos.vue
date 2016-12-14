<template>
  <div class="head">
    <i 
      class="round" 
      :class="{'round-selected':isAllSelect}"
      @click="toggleAll"></i>
    <input 
      type="text" 
      class="head-input" 
      placeholder="输入新的todo，按Enter确认"
      autofocus
      @keydown.enter="tryAddTodo">
  </div>
  <div class="body">
    <todo v-for="(index, todo) in todosByVisibility" :todo="todo" :index="index"></todo>  
  </div>
  <foot v-show="todos.length"></foot>  
</template>

<script>
  import { addTodo, toggleAll } from '../vuex/actions'
  import todo from './todo.vue'
  import foot from './foot.vue'
  export default{
    vuex: {
      getters: {
        todos: state => state.todos,
        visibility: state => state.visibility
      },
      actions: {
        addTodo,
        toggleAll
      }
    },
    computed: {
      todosByVisibility () {
        return this.todos.filter( todo => {
          switch (this.visibility) {
            case 'all':
              return true
            case 'selected':
              return todo.selected
            case 'unselected':
              return !todo.selected
          }
        })
      },
      isAllSelect () {
        return this.todos.length > 0 && this.todos.every( todo => todo.selected )
      }
    },
    methods: {
      tryAddTodo (e) {
        if (e.target.value.trim()) {
          this.addTodo(e.target.value.trim())
          e.target.value = ''
        }
      }
    },
    components: {
      todo,
      foot
    }
  }
</script>

