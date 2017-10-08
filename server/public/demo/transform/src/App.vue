<template>
  <div id="app">
    <h1 @click="log" class="title">transform 矩阵变换</h1>
    <div class="container">
      
      <div class="pic-box">
        <Pic :tran="null" :text="'原始图片'"></Pic>
        <Pic :tran="_1Matrix" :text="'1'"></Pic>
        <Pic :tran="_2Matrix" :text="'2'"></Pic>
        <Pic :tran="_3Matrix" :text="'3'"></Pic>
        <Pic :tran="finMatrix" :text="'最终图片'"></Pic>
      </div>

      <div class="scroll-box">
        <div class="scroll-line">
          <span class="scroll-name">translate X</span>
          <span class="scroll-val">{{x}}px</span>
          <Scroll :min="-500" :max="500" :gap="10" v-on:changeVal="changeX"></Scroll>
        </div>
        <div class="scroll-line">
          <span class="scroll-name">Y</span>
          <span class="scroll-val">{{y}}px</span>
          <Scroll :min="-500" :max="500" :gap="10" v-on:changeVal="changeY"></Scroll>
        </div>
        <div class="scroll-line">
          <span class="scroll-name">scale X</span>
          <span class="scroll-val">{{scaleX}}</span>
          <Scroll :min="-1" :max="3" :gap="0.1" v-on:changeVal="changeScaleX"></Scroll>
        </div>
        <div class="scroll-line">
          <span class="scroll-name">Y</span>
          <span class="scroll-val">{{scaleY}}</span>
          <Scroll :min="-1" :max="3" :gap="0.1" v-on:changeVal="changeScaleY"></Scroll>
        </div>
        <div class="scroll-line">
          <span class="scroll-name">rotate</span>
          <span class="scroll-val">{{rotate}}deg</span>
          <Scroll :min="-180" :max="180" :gap="5" v-on:changeVal="changeRotate"></Scroll>
        </div>
        <div class="scroll-line">
          <span class="scroll-name">skew X</span>
          <span class="scroll-val">{{skewX}}deg</span>
          <Scroll :min="-90" :max="90" :gap="2" v-on:changeVal="changeSkewX"></Scroll>
        </div>
        <div class="scroll-line">
          <span class="scroll-name">Y</span>
          <span class="scroll-val">{{skewY}}deg</span>
          <Scroll :min="-90" :max="90" :gap="2" v-on:changeVal="changeSkewY"></Scroll>
        </div>
        <div class="scroll-line">
          <span class="scroll-name">transform-origin X</span>
          <span class="scroll-val">{{originH}}%</span>
          <Scroll :min="0" :max="100" :gap="1" v-on:changeVal="changeOriginH"></Scroll>
        </div>
        <div class="scroll-line">
          <span class="scroll-name">Y</span>
          <span class="scroll-val">{{originV}}%</span>
          <Scroll :min="0" :max="100" :gap="1" v-on:changeVal="changeOriginV"></Scroll>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="matrix-box">
        <div class="matrix-one" v-show="scaleX !== 1 || scaleY !== 1">
          <span class="matrix-title">缩放</span>
          <Matrix :matrix="scaleMatrix" :width="40"/>
        </div>
        <div class="matrix-one" v-show="rotate !== 0">
          <span class="matrix-title">旋转</span>
          <Matrix :matrix="rotateMatrixString" :width="85"/>
        </div>
        <div class="matrix-one" v-show="skewX !== 0 || skewY !== 0">
          <span class="matrix-title">拉伸</span>
          <Matrix :matrix="skewMatrixString" :width="75"/>
        </div>
        <div class="matrix-one" v-show="x !== 0 || y !== 0">
          <span class="matrix-title">平移</span>
          <Matrix :matrix="[['','',e],['','',f],[0,0,1]]" :width="40"/>
        </div>
        <div class="matrix-one">
          <span class="matrix-title">最终矩阵</span>
          <Matrix :matrix="matrix" :width="45"/>
        </div>
        
        
      </div>
    </div>
    <div class="style-box">
      <p>transform: matrix({{a}}, {{b}}, {{c}}, {{d}}, {{e}}, {{f}});</p>
      <p>transform-origin: {{originH}}% {{originV}}%;</p>
    </div>
    <div class="tip">
      2017 haizai
    </div>
  </div>
</template>

<script>


import Scroll from './components/Scroll'
import Pic from './components/Pic'
import Matrix from './components/Matrix'

export default {
  name: 'app',
  components: {
    Scroll,
    Pic,
    Matrix,
  },
  data(){
    return {
      originH: 50,
      originV: 50,
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      rotate: 0,
      skewX: 0,
      skewY: 0,
      matrix: [
          [1,0,0],
          [0,1,0],
          [0,0,0]
      ],
    }
  },
  computed:{
    a(){return +this.matrix[0][0].toFixed(2)},
    b(){return +this.matrix[1][0].toFixed(2)},
    c(){return +this.matrix[0][1].toFixed(2)},
    d(){return +this.matrix[1][1].toFixed(2)},
    e(){return +this.matrix[0][2].toFixed(2)},
    f(){return +this.matrix[1][2].toFixed(2)},
    finMatrix(){
      return {
          'transform-origin' : `${this.originH}% ${this.originV}%`,
          transform:`matrix(${this.matrix[0][0]},${this.matrix[1][0]},${this.matrix[0][1]},${this.matrix[1][1]},${this.matrix[0][2]},${this.matrix[1][2]})`,
      }
    },
    _1Matrix(){
      return {
        'transform-origin' : `${this.originH}% ${this.originV}%`,
        transform: `matrix(1,0,0,1,${this.e},${this.f})`,
      }
    },
    _2Matrix(){
      return {
        'transform-origin' : `${this.originH}% ${this.originV}%`,
        transform: `matrix(${this.resolveMatrix(this.scaleMatrix)},${this.e},${this.f})`,
      }
    },
    _3Matrix(){
      return {
        'transform-origin' : `${this.originH}% ${this.originV}%`,
        transform: `matrix(${this.resolveMatrix(this.matrixMult(this.scaleMatrix,this.rotateMatrix))},${this.e},${this.f})`,
      }
    },
    scaleMatrix(){
      return [
        [this.scaleX,0],
        [0,this.scaleY]
      ]
    },
    rotateMatrix(){
        let {PI,cos,sin} = Math
        let r = PI/180*this.rotate //弧度
        return [
            [cos(r),-sin(r)],
            [sin(r),cos(r)]
        ]
    },
    rotateMatrixString(){
        return [
            [`cos(${this.rotate}°)`,`-sin(${this.rotate}°)`],
            [`sin(${this.rotate}°)`,`cos(${this.rotate}°)`]
        ]
    },
    skewMatrix(){
      let {PI,tan} = Math
      let ry = PI/180*this.skewY //弧度
      let rx = PI/180*this.skewX //弧度
      return [
        [1,tan(rx)],
        [tan(ry),1]
      ]
    },
    skewMatrixString(){
        return [
            [1,`tan(${this.skewX}°)`],
            [`tan(${this.skewY}°)`,1]
        ]
    },
  },
  methods: {
    resolveMatrix(m) {
      return `${m[0][0]},${m[1][0]},${m[0][1]},${m[1][1]}`
    },
    log(){
      console.log(this)
    },
    changeOriginH(originH) {this.originH = originH;this.transform()},
    changeOriginV(originV) {this.originV = originV;this.transform()},
    changeX(x) {this.x = x;this.transform()},
    changeY(y) {this.y = y;this.transform()},
    changeScaleX(scaleX) {this.scaleX = scaleX;this.transform()},
    changeScaleY(scaleY) {this.scaleY = scaleY;this.transform()},
    changeRotate(rotate) {this.rotate = rotate;this.transform()},
    changeSkewX(skewX) {this.skewX = skewX;this.transform()},
    changeSkewY(skewY) {this.skewY = skewY;this.transform()},
    matrixMult(m1,m2){
      return [
        [m1[0][0]*m2[0][0]+m1[0][1]*m2[1][0],m1[0][0]*m2[0][1]+m1[0][1]*m2[1][1]],
        [m1[1][0]*m2[0][0]+m1[1][1]*m2[1][0],m1[1][0]*m2[0][1]+m1[1][1]*m2[1][1]]
      ]
    },
    transform(){
      let cm = [
          this.scaleMatrix,
          this.rotateMatrix,
          this.skewMatrix,
      ].reduce((a,b)=>this.matrixMult(a,b))
      this.matrix = [
        [cm[0][0],cm[0][1],this.x],
        [cm[1][0],cm[1][1],this.y],
        [0,0,1]
      ]
    },
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
i {
  display: inline-block;
  position: absolute;
}
i:focus{
  outline: none;
};
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
}
.pic-box {
  height: 300px;
  float: left;
}
.title {
  text-align: center;
  background: #727f80;
  color: #fff;
  height: 100px;
  line-height: 100px;
  margin-bottom: 20px;
}
.container {
  margin: 0 auto;
  width: 1000px;
}
.style-box {
  font-family: consolas,monaco,"Andale Mono",monospace;
  margin-top: 50px;
  text-align: center;
  font-size: 16px;
  background: #f6f6f6;
  padding: 20px 0;
}
.style-box p {
  line-height: 40px;
}
.clearfix{*+height:1%;}
.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
.scroll-box {
  font-family: "Open Sans",arial,x-locale-body,sans-serif;
  position: relative;
  float: right;
  line-height: 28px;
  margin-right: 80px;
}
.scroll-line {
  height: 40px;
}
.scroll-name {
  position: absolute;
  text-align: right;
  left: -230px;
  display: inline-block;
  width: 130px;
}
.scroll-val {
  position: absolute;
  left: -85px;
  color: #0d91bc;
}
.matrix-one {
  display: inline-block;
  transition: all .5s;
  position:relative;
  height: 120px;
  margin: 40px 20px;
}
.matrix-title {
  position: absolute;
  bottom: -40px;
  width: 100%;
  text-align: center;
  margin-right: 10px;
}
.tip {
  background: #727f80;
  color: #fff;
  text-align: center;
  line-height: 60px;
}
@media (max-width: 1000px) {
  .container{
    width: 100%;
  }
}
@media (max-width: 768px) {
  .scroll-box {
    float: none;
  }
  .pic-box {
    float: none;
  }
  .scroll-name{
    left: 0;
  }
  .scroll-val {
    left: 150px;
  }
  .scroll {
    margin-left: 240px;
    vertical-align: 12px;
  }
  body,.style-box,.tip {
    font-size: 14px;
  }
}
</style>
