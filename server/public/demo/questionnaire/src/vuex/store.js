import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const NAME = 'vue-questionnaire-0.1.0-haizai'

const defaultNaires = [
  {
    title: "这是一份已截止的测试问卷",
    endTime: +new Date(2016,6,8),
    ques: [{
      title  :'这是单选题目1',
      type   :'radio',
      values :['选项1','选项2','选项3',"选项4",'选项5']
    },{
      title  :'这是多选题目2',
      type   :'checkbox',
      values :['选项1','选项2','选项4',"选项4","选项5"] 
    },{
      title  :'这是文本题目3',
      type   :'textarea'
    }],
    anss:[
      [1, [1, 3], '你千万要记住了，不要见到风是得雨，'],
      [3, [1, 0], null],
      [2, [1, 3, 0], '香港记者不只跑得快，本身也要学会判断'],
      [1, [1, 3, 2], '无中生有的东西，你再说一遍，等于你也有责任吧？'],
      [1, [1, 2], null],
      [0, [1, 2, 3, 0], '你们啊，不要想搞个大新闻，'],
      [0, [1], null],
      [1, [1], null],
      [2, [1, 2], 'naive!'],
      [1, [1, 3], '编不下去了'],
      [4, [3, 4], '真的编不下去了']
    ]
  },
  {
    title   : "关于大学生夜生活的调查问卷",
    endTime : +new Date(2020, 10 ,5),
    ques    : [{
      title  :'你的年级是?',
      type   :'radio',
      values :['大一','大二','大三',"大四"]
    },{
      title  :'你的性别是?',
      type   :'radio',
      values :['男','女']  
    },{
      title  :'你周一到周五一般几点睡觉?',
      type   :'radio',
      values :['22:00以前','22:00-23:00','23:00-0:00','0:00-1:00','1:00以后']
    },{
      title  :'你周一到周五点晚上都干什么?',
      type   :'checkbox',
      values :['玩电脑','玩手机','聊天','学习','其他'] 
    },{
      title  :'你周末一般几点睡觉?',
      type   :'radio',
      values :['22:00以前','22:00-23:00','23:00-0:00','0:00-1:00','1:00以后']
    },{
      title  :'你周末晚上都干什么?',
      type   :'checkbox',
      values :['玩电脑','玩手机','聊天','学习','其他']
    },{
      title  :'你觉得你睡眠不好的原因是什么?',
      type   :'textarea'
    }],
    anss:[]
  }
]

const state = JSON.parse(window.localStorage.getItem(NAME)) || {naires: defaultNaires}

const mutations = {
  //提交答卷
  SUBMIT_ANS (state, index, ans) {
    state.naires[index].anss.push(ans)
  },
  //创建新问卷
  CREATE_NAIRE (state, naire) {
    state.naires.push(naire)
  }
}

const store = new Vuex.Store({
  state,
  mutations  
})

store.watch( state => window.localStorage.setItem(NAME, JSON.stringify(state)) )

export default store