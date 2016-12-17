<template>
  <div>
    <div class="header"></div>
    <div class="container">
      <div class="top">
        <span class="top-left">问卷管理</span>
        <span class="top-right" v-link="{name:'list'}">我的主页</span>
        <a class="top-author" href="https://github.com/haizai">Building by Haizai</a>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
	import store from './vuex/store'

	export default {
		store
	}
</script>