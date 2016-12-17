<template>
	<div class="container">
    <div class="title">
      <p>Vuex Todos</p>
      <p class="author">
        <a href="https://github.com/haizai" target="_black">By Haizai</a>
      </p>
    </div>
		<todos></todos>	
	</div>
</template>

<script>
	import store from './vuex/store'
  import todos from './components/todos.vue'
	export default {
    components:{
    	todos
    },
		store
	}
</script>