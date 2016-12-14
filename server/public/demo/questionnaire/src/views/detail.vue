<template>
<div>
  <h3 class="content-title">数据详情</h3>
  <div class="detail content">
    <h2 class="detail-title">
      <span>{{naire.title}}</span>
      <small>—已答{{naire.anss.length}}份</small>
    </h2>
    <div v-for="(index, que) in naire.ques" class="datail-chart">
      <chart-radio 
        v-if="que.type == 'radio'" 
        :data="chartDates[index]" 
        :title="chartTitles[index]" 
        :id="'chart'+index">
      </chart-radio>
      <chart-checkbox
        v-if="que.type == 'checkbox'" 
        :data="chartDates[index]" 
        :title="chartTitles[index]" 
        :id="'chart'+index"
        :maxvalue="naire.anss.length">        
      </chart-checkbox>
      <chart-textarea 
        v-if="que.type == 'textarea'" 
        :data="chartDates[index]" 
        :title="chartTitles[index]" 
        :id="'chart'+index">
      </chart-textarea>
      <hr>
    </div>
    <button class="detail-back" v-link="{name: 'list'}">返回</button> 
  </div>
<div>
</template>

<script>
  import chartRadio from "../components/chartRadio.vue";
  import chartCheckbox from "../components/chartCheckbox.vue"
  import chartTextarea from "../components/chartTextarea.vue"
  export default {
    components: {
      chartRadio,
      chartCheckbox,
      chartTextarea
    },
    vuex: {
      getters: {
        naires: state => state.naires
      }
    },
    computed: {
      naire() {
        return this.naires[this.$route.params.id]
      },
      //计算问卷数据
      results() {
        let arr = []
        this.naire.ques.forEach( (que, index) => {
          if (que.type == 'radio') {
            arr[index] = []
            this.naire.anss.forEach( ans => {
              if (!arr[index][ans[index]]) {
                arr[index][ans[index]] = 0
              }
              arr[index][ans[index]] ++
            })
          } else if (que.type == 'checkbox') {
            arr[index] = []
            this.naire.anss.forEach( ans => {
              ans[index].forEach( val => {
                if(!arr[index][val]) {
                  arr[index][val] = 0
                }
                arr[index][val] ++
              })
            })
          } else {
            arr[index] = 0
            this.naire.anss.forEach( ans => {
              if (ans[index] !== null) {
                arr[index] ++
              }
            })
          }
        })
        return arr
      },
      //计算符合i-chart的数据
      chartDates() {
        const randomColor = () => {
          return '#' + ('00000' + Math.floor(Math.random()*(0x1000000)).toString(16)).slice(-6)
        }
        let arr = []
        this.naire.ques.forEach((que, queIndex) => {
          if (que.type == 'radio' || que.type == 'checkbox') {
            que.values.forEach((val, valIndex) => {
              if(!arr[queIndex]) {arr[queIndex] = []}
              arr[queIndex][valIndex] = ({
                name: val, 
                value: this.results[queIndex][valIndex], 
                color: randomColor()
              })
            })
          } else {
            arr[queIndex] = [{
              name: '已答',
              value: this.results[queIndex],
              color: randomColor()
            },{
              name: '未答',
              value: this.naire.anss.length - this.results[queIndex]
            }]
          }
        })
        return arr
      },
      chartTitles() {
        let arr = []
        this.naire.ques.forEach((que, index) =>{
          arr.push( {
            text: (index + 1)  + '. ' + que.title,
            font: "microsoft yahei"
          })
        })
        return arr
      }
    }
  }
</script>