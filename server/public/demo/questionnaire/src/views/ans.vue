<template>
<div>
  <h3 class="content-title">填写问卷</h3>
  <div class="ans content">
    <h2 class="ans-title">
      <span>{{naire.title}}</span>
    </h2>
    <div class="ans-que" v-for="(queIndex, que) in naire.ques">
      <h4 class="ans-que-title" :class="{'warning':queTitleClass[queIndex]}">
        <span>{{queIndex + 1}}. </span>
        <span>{{que.title}}</span>
        <small v-text="que.type | typeToRead"></small>
      </h4>
      <p 
        class="ans-que-rc"
        v-if="que.type == 'radio' || que.type == 'checkbox'" 
        v-for=" (valIndex, val) in que.values"
        track-by="$index">
        <input 
          :type="que.type" 
          :name="queIndex" 
          :value="valIndex" 
          v-model="models[queIndex]">
        <label class="ans-que-val" @click="previousClick">{{val}}</label>
      </p>
      <div class="ans-que-textarea" v-if="que.type == 'textarea'">
        <textarea v-model="models[queIndex]"></textarea>
      </div>
      <hr>
    </div>
    <div class="ans-button">
      <div><button v-link="{name:'list'}">返回</button></div><!--
   --><div><button @click="testAns" class="info">提交问卷</button></div>
    </div>
    <modal-ans v-show="modalShow" :ans="ans"></modal-ans>
  </div>
</div>
</template>

<script>
  import modalAns from '../components/modalAns.vue'
  export default {
    components: {
      modalAns
    },
    vuex: {
      getters: {
        naires: state => state.naires
      }
    },
    data() { return {
      queTitleClass: [],
      models: [],
      modalShow: false
    }},
    computed: {
      naire() {
        return this.naires[this.$route.params.id]
      },    
      ans() {
        return this.models.map( item => {
          if (typeof item == 'string' && !item.trim()) {
            return null
          } else {
            return item
          }
        })
      }
    },
    created() {
      //初始化queTitleClass 和 models
      let queTitleClass = [], models = []
      for (let i = 0; i < this.naire.ques.length; i++) {
        queTitleClass.push(false)
      }
      this.$set('queTitleClass',queTitleClass)

      this.naire.ques.forEach( que => {
        if (que.type == "checkbox") {
          models.push([])// checkbox 的 v-model必须是[]
        } else if (que.type == "radio") {
          models.push(null)
        } else {
          models.push('')
        }
      })
      this.$set('models',models)
    },
    methods: {
      //测试是否填完整
      testAns() {
        let isScroll = false
        this.models.forEach((item,index)=>{
          if ( (item === null) || ( Array.isArray(item) && item.length === 0) ) {
            if (!isScroll) {
              document.body.scrollTop = document.getElementsByClassName('ans-que')[index].offsetTop - 50
              document.documentElement.scrollTop = document.getElementsByClassName('ans-que')[index].offsetTop - 50
              isScroll = true
            }
            this.queTitleClass.$set(index, true)
          } else {
            this.queTitleClass.$set(index, false)
          }
        }) 
        if(!isScroll) {
          this.modalShow = true
        }
      },
      previousClick(e) {
        e.target.previousElementSibling.click()
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