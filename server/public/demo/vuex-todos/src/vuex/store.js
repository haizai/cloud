import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const NAME = 'todo-vuex-haizai'

//若localStorage有此值则取出
const state = JSON.parse( window.localStorage.getItem(NAME) ) || {
  todos: [{text: "默认todo1", selected: false}, {text: "默认todo2", selected: true}],
  visibility: "all"
}

const mutations = {
  //增加todo
  ADD_TODO (state, text) {
    state.todos.push({
      text,
      selected: false
    })
  },
  //删除todos
  DEL_TODO (state, index) {
    state.todos.splice(index, 1)
  },
  //切换选中
  TOGGLE (state, index) {
    state.todos[index].selected = !state.todos[index].selected
  },
  //删除选中的todos
  DEL_SELECTED_TODOS (state) {
    state.todos = state.todos.filter( todo => !todo.selected )
  },
  //改变visibility
  CHANGE_VISIBILITY (state, visibility) {
    state.visibility = visibility
  },
  //全选或解除全选
  TOGGLE_ALL (state) {
    state.todos.some( todo => !todo.selected)
      ? state.todos.forEach( todo => todo.selected = true)
      : state.todos.forEach( todo => todo.selected = false)
  },
  //修改todo的文本
  CHANGE_TEXT (state, index, text) {
    state.todos[index].text = text
  }
}

const store = new Vuex.Store({
  state,
  mutations  
})

//观测state,将其json化存在localStorage中
store.watch( (state) => window.localStorage.setItem( NAME, JSON.stringify(state) ) )

export default store



