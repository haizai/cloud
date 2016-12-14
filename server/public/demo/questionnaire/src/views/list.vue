<template>
<div>
  <h3 class="content-title">问卷列表</h3>
  <table class="list-table content">
    <thead>
      <tr>
        <th>标题</th>
        <th>截止时间</th>
        <th>状态</th>
        <th>已答数量</th>
        <th><button v-link="{name:'new'}" class="import">+ 新建问卷</button></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(index, naire) in naires">
        <td>{{naire.title}}</td>
        <td>{{naire.endTime | dateToRead}}</td>
        <td :class="{'list-import': +new Date(naire.endTime) > +new Date()}">{{naire.endTime | endTimeStatus}}</td>
        <td>{{naire.anss.length}}</td>
        <td>
          <button 
            type="button" 
            v-link="{name:'ans', params: {id: index}}" 
            class="info" 
            :disabled="+naire.endTime < +new Date()">填写问卷</button>
          <button 
            type="button" 
            v-link="{name:'detail', params: {id: index}}" 
            :disabled="naire.anss.length == 0">查看数据</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>

  export default {
    vuex: {
      getters: {
        naires: state => state.naires
      }
    }
  }
</script>
