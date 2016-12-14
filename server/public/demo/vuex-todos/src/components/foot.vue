<template>
  <div class="foot">
    <i class="foot-del" @click="delSelectedTodos">&times; </i>
    <span class="foot-info">
      <span class="foot-count">{{selectedLength}}</span> 项被选中
    </span>
    <span class="foot-visibility">
      <span :class="{'foot-visibility-in': visibility==='all'}" @click="changeVisibility('all')">全部</span>
      <span :class="{'foot-visibility-in': visibility==='selected'}" @click="changeVisibility('selected')">被选中的</span>
      <span :class="{'foot-visibility-in': visibility==='unselected'}" @click="changeVisibility('unselected')">未被选中的</span>      
    </span>
  </div>
</template>

<script>
  import { delSelectedTodos, changeVisibility} from '../vuex/actions'
  export default{
    vuex: {
      getters: {
        todos: state => state.todos,
        visibility: state => state.visibility,
      },
      actions: {
        delSelectedTodos,
        changeVisibility
      }
    },
    computed: {
      selectedLength () {
        return this.todos.filter( todo => todo.selected ).length
      }
    }
  }
</script>
