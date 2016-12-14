<template>
  <div 
      class="body-item"
      transition="fade"
      @mouseenter="toggleMouseEnter(true)"
      @mouseleave="toggleMouseEnter(false)">
    <i 
      class="round" 
      :class="{'round-selected':todo.selected}" 
      @click="toggle(index)"></i>
    <div 
      class="body-label"
      :class="{'body-label-selected':todo.selected}"
      @click="tryEdit">{{todo.text}}</div>
    <input 
      type="text" 
      class="body-input"
      :class="{'body-input-show':isInputShow}"
      @keydown.enter="submitEdit"
      @blur="submitEdit">
    <i 
      class="body-del" 
      v-show="isMouseEnter"
      @click="delTodo(index)">&times;</i>
  </div>
</template>

<script>
  import { delTodo, toggle, changeText } from '../vuex/actions'
  export default {
    props: ['todo', 'index'],
    data() { return {
      isMouseEnter: false,
      isInputShow: false
    }},
    vuex: {
      getters: {
        todos: state => state.todos
      },
      actions: {
        delTodo, 
        toggle,
        changeText
      }
    },
    methods: {
      toggleMouseEnter (bool) {
        this.isMouseEnter = bool
      },
      tryEdit (e) {
        this.isInputShow = true
        this.$nextTick(() => {
          var input = e.target.nextElementSibling
          input.value = this.todo.text
          input.focus()
          input.select()
        })
      },
      submitEdit (e) {
        if (e.target.value.trim()) {
          this.changeText(this.index, e.target.value.trim())
          this.isInputShow = false
        } else {
          this.delTodo(this.index)
        }
      }
    }
  }
</script>
