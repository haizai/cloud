<template>
<div>
  <h3 class="content-title">新建问卷</h3>
  <div class="new content">
    <div class="new-toggle new-title" :class="{'warning':!title}">
      <input 
        type="text" 
        @blur="hideInput" 
        @keydown.enter="hideInput"
        v-model="title">
      <span @click="showInput">点我输入标题</span>
    </div>
    <div class="new-que" v-for="(queIndex, que) in ques" transition="fade">
      <button 
        type="button" 
        class="new-que-btn" 
        v-show="que.step === 0" 
        @click="createNewQue(queIndex)">+ 新建题目</button>
        
        <div class="new-que-type" v-show="que.step === 1" transition="scaleY">
          <div @click="typeSelect(queIndex, 'radio')">+ 单选题</div><!--
       --><div @click="typeSelect(queIndex, 'checkbox')">+ 多选题</div><!--
       --><div @click="typeSelect(queIndex, 'textarea')">+ 文本题</div>
        </div>

      <div class="new-que-body" v-show="que.step === 2" transition="fade">
        <p class="new-toggle new-que-title" :class="{'warning':!que.title}">
          <input 
            type="text" 
            @blur="hideInput" 
            @keydown.enter="hideInput"
            v-model="que.title">
          <span @click="showInput">{{que.title}}</span>
          <small v-text="que.type | typeToRead"></small>
          <i  @click="delQue(queIndex)">&times;</i>
        </p>
        <p 
          class="new-toggle new-que-rc"
          v-if="que.type == 'radio' || que.type == 'checkbox'"
          v-for="(valueIndex, value) in que.values"
          track-by="$index"
          :class="{'warning':!value}">
          <input 
            type="text" 
            @blur="hideInput" 
            @keydown.enter="hideInput"
            v-model="value">
          <span @click="showInput">{{value}}</span>
          <i v-show="que.values.length > 2" @click="delValue(queIndex, valueIndex)">&times;</i>
        </p>
        <p v-if="que.type == 'radio' || que.type == 'checkbox'" 
          class="new-que-add" 
          @click="addValue(queIndex)">+ 添加选项</p>
      </div>   
      <hr>    
    </div>
    <div class="new-date">
      <span :class="{'warning':dateClass}">截止日期:</span>
      <input type="text" v-model="modelYear" maxlength="4">
      <label :class="{'warning':dateClass}">年</label>
      <input type="text" v-model="modelMonth" maxlength="2">
      <label :class="{'warning':dateClass}">月</label>
      <input type="text" v-model="modelDate" maxlength="2">
      <label :class="{'warning':dateClass}">日</label>
    </div>
    <hr>
    <div class="new-button">
      <div><button v-link="{name:'list'}">返回</button></div><!--
   --><div><button @click="tryCreate" class="info">确认</button></div>
    </div> 

    <modal-new v-show="modalShow" :naire="naire"></modal-new>
  </div>
</div>
</template>

<script>
  import modalNew from '../components/modalNew.vue'
  export default {
    components: {
      modalNew
    },
    vuex: {
      getters: {
        naires: state => state.naires
      }
    },
    data() { return {
      modalShow  : false,
      dateClass  : false,
      title      :'点我输入标题',
      modelYear  : '',
      modelMonth : '',
      modelDate  : '',
      ques: [{
        step: 0, //0->点击btn之前, 1->选择type之前，2->正式的题目
        type: '',
        title: '点我输入题目',
        values: ['选项1','选项2','选项3','选项4']
      }]
    }},
    watch: {
      //每当step为2时，出现新的btn
      ques: {
        handler(ques){ 
          if (ques[ques.length-1].step === 2) {
            ques.push({
              step   : 0,
              type   : '',
              title  : '点我输入题目',
              values : ['选项1','选项2','选项3','选项4']              
            })
          }
        },
        deep: true
      }
    },
    computed: {
      //计算要提交的问卷
      naire() {
        let title = this.title.trim()
        let ques = this.ques.map( que => {
          if (que.step === 2) {
            if (que.type === 'radio' || que.type === 'checkbox') {
              return {title: que.title.trim(), type: que.type, values: que.values}
            } else {
              return {title: que.title.trim(), type: que.type}
            }
          }
        })
        ques.pop()
        let endTime = +new Date(this.modelYear, this.modelMonth-1, this.modelDate)
        return {
          anss: [],
          endTime,
          title,
          ques
        }
      }
    },
    methods: {
      //点击div,显示后面的input
      showInput(e) {
        e.stopPropagation()
        if (e.target.tagName === "INPUT") return
        let input = e.target.previousElementSibling
        input.style.display = 'inline-block'
        input.value = e.target.firstChild.data
        input.focus()
        input.select()
      },
      //隐藏input
      hideInput(e) {
        let input = e.target
        input.style.display = 'none'
        input.value.trim() ?
          input.nextElementSibling.firstChild.data = input.value.trim() :
          input.nextElementSibling.firstChild.data = '请输入非空值'   
      },
      createNewQue(index) {
        this.ques[index].step = 1
      },
      typeSelect(index,type) {
        this.ques[index].step = 2
        this.ques[index].type = type
      },
      delQue(index) {
        this.ques.splice(index, 1)
      },
      addValue(index) {
        this.ques[index].values.push('新选项')
      },
      delValue(queIndex, valueIndex) {
        this.ques[queIndex].values.splice(valueIndex, 1)
      },
      testTime() {
        if (this.modelYear && +this.modelYear > 2015 &&
            this.modelMonth && +this.modelMonth > 0 && + this.modelMonth < 13 && 
            this.modelDate && +this.modelDate > 0 && this.modelDate < 32 &&
            /^[0-9]+$/.test(this.modelYear + this.modelMonth + this.modelDate)) {
          let d = new Date(this.modelYear, this.modelMonth-1, this.modelDate)
          if (d > new Date()) {
            this.dateClass = false
            return d
          }
        }
        this.dateClass = true
        return false
      },
      tryCreate() {
        let d = this.testTime()
        if (!d) return
        if (this.naire.ques.length === 0 ) return
        let warnings1 = document.getElementsByClassName('new-title')[0].getElementsByClassName('warning')
        let warnings2 = document.getElementsByClassName('new-que')[0].getElementsByClassName('warning')
        if (warnings1.length + warnings2.length === 0) {
          this.modalShow = true
        } else {
          document.body.scrollTop = warnings[0].offsetTop - 50
          document.documentElement.scrollTop = warnings[0].offsetTop - 50
        }
      }
    },
    events: {
      //隐藏弹出框
      modalHide() {
        this.modalShow = false
      }
    }
  }
</script>