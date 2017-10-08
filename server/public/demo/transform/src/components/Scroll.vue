<template>
  <div class="scroll">
    <div 
      class="scroll-bar" 
      ref='bar'
      @click="clickBar"></div>
    <div 
      class="scroll-ball" 
      :style="{left:left +'px'}"
      @mousedown="ballDown"
      ref="ball"></div>
    <i class="icon-plus" @mousedown="plus" ></i>
    <i class="icon-minus" @mousedown="minus"></i>
    <i class="icon-close" @mousedown="close" v-show="isShowClose"></i>
  </div>
</template>

<script>
export default {
  name: 'scroll',
  props: ['gap','min','max'],
  data () {
    return {
      left: 100,
      val: (this.min + this.max) / 2,
      low: 0,
      isShowClose: false,
    }
  },
  mounted(){
    function getLeft(dom){ 
      var offset=dom.offsetLeft; 
      if(dom.offsetParent!=null) offset+=getLeft(dom.offsetParent); 
      return offset; 
    } 
    this.low = getLeft(this.$refs.bar)
  },
  watch: {
    left(val) {
      let len = -this.min + this.max
      let a = +(Math.round((this.min + val * len/200) / this.gap) * this.gap).toFixed(3)
      if (a!==this.val) {
        this.changeVal(a)
      }
    }
  },
  computed:{
    unit(){
      return 200 * this.gap / (this.max - this.min)
    },
  },
  methods: {
    ballDown(e){
      e.preventDefault()
      let ball = this.$refs.ball
      let onMousemove = (e2) => {
        e2.preventDefault()
        this.move(e2.clientX)
      }
      let onMouseup = (e2) => {
        e2.preventDefault()
        document.removeEventListener('mousemove',onMousemove,ball)
        document.removeEventListener('mouseup',onMouseup,document)
      }
      document.addEventListener('mousemove',onMousemove,ball)
      document.addEventListener('mouseup',onMouseup,document)
    },
    move(clientX){
      this.left = Math.min(Math.max(clientX - this.low,0),200)
    },
    changeVal(val) {
      this.val = val
      this.isShowClose = val !== (this.min + this.max) / 2
      this.$emit('changeVal',val)
    },
    clickBar(e){
      this.move(e.clientX)
    },
    plus(e){
      this.left = Math.min(this.left + this.unit ,200)
    },
    minus(){
      this.left = Math.max(this.left - this.unit ,0)
    },
    close(){
      this.left = 100
    },
  }
}
</script>

<style scoped>
.scroll {
  position: relative;
  margin-top: 7px;
  display: inline-block;
}
.scroll-bar{
  margin-left: 10px;
  width: 200px;
  height: 12px;
  border-radius: 6px;
  background: #ccc;
  cursor: pointer;
}
.scroll-ball {
  top: -4px;
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #e96900;
  cursor: pointer;
}
.icon-plus {
  cursor: pointer;
  right: -40px;
  top: -10px;
  width: 32px;
  height: 32px;
  background: url('../assets/scroll/plus.png') no-repeat;
}
.icon-plus:hover, .icon-plus:active {
  background-image: url(../assets/scroll/plus_fill.png);
}
.icon-minus {
  cursor: pointer;
  left: -30px;
  top: -10px;
  width: 32px;
  height: 32px;
  background: url('../assets/scroll/minus.png') no-repeat;
}
.icon-minus:hover, .icon-minus:active {
  background-image: url(../assets/scroll/minus_fill.png);
}
.icon-close {
  cursor: pointer;
  right: -70px;
  top: -8px;
  width: 28px;
  height: 28px;
  background: url('../assets/scroll/close.png') no-repeat;
}
.icon-close:hover, .icon-close:active {
  background-image: url(../assets/scroll/close_fill.png);
}
@media (max-width: 768px) {
  .scroll-bar,.scroll-ball {
    display: none;
  }
  .scroll-ball {
    float: none;

  }
}
</style>
