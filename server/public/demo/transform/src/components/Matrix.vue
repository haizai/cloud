<template>
<div class="matrix">
  <span class="matrix-corner left top"></span>
  <span class="matrix-corner left bottom"></span>
  <span class="matrix-corner right top"></span>
  <span class="matrix-corner right bottom"></span>
  <div v-for="line in matrix">
    <div class="matrix-item" v-for="item in line" :style="{width:width + 'px'}">{{round(item)}}</div>
  </div>
</div>
</template>
<script>
export default {
  name: 'matrix',
  props: ['matrix','width'],
  data () {
    return {

    }
  },
  methods: {
    round(val){
      if (typeof val == 'number') {
        return +val.toFixed(2)
      }
      return val
    }
  },
}
</script>

<style>
.matrix {
  font-family: consolas,"Liberation Mono",courier,monospace;
  position: relative;
  display: inline-block;
  border-left: 2px solid #000;
  border-right: 2px solid #000;
  vertical-align: top;
}
.matrix-corner {
  display: inline-block;
  width: 5px;
  height: 2px;
  position: absolute;
  background: #000;
}
.matrix-corner.top {top:0;}
.matrix-corner.left {left:0;}
.matrix-corner.bottom {bottom:0;}
.matrix-corner.right {right:0;}
.matrix-line {

}
.matrix-item {
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  display: inline-block;
}
</style>