<template>
  <div class="pic" :style="tran">
    {{text}}
  </div>
</template>

<script>
export default {
  name: 'pic',
  props: ['tran','text'],
}
</script>

<style scoped>
  .pic{
    position: absolute;
    width: 188px;
    height: 266px;
    border: 2px solid #42b983;
    border-radius: 4px;
    z-index: 0;
    text-align: center;
    background: url(../assets/pic.jpg) no-repeat;
    background-size: cover;
    opacity: 0.8;
  }
</style>
