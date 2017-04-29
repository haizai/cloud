new Vue({
  el:'#app',
  created: function(){
    var obj = {}
    for (var name in this.partAllStyle) {
      obj[name] = this.partAllStyle[name][0]
    }
    this.parts.push(JSON.parse(JSON.stringify(obj)))
    this.parts.push(JSON.parse(JSON.stringify(obj)))
    this.parts.push(JSON.parse(JSON.stringify(obj)))
  },
  data:{
    selected:0,
    parentStyle: {
      'flex-direction': 'row',
      'flex-wrap': 'nowrap',
      'justify-content':'flex-start',
      'align-items':'stretch',
      'align-content':'stretch',
    },
    parentAllStyle: {
      'flex-direction': ['row','row-reverse','column','column-reverse'],
      'flex-wrap': ['nowrap','wrap','wrap-reverse'],
      'justify-content':['flex-start','flex-end','center', 'space-between','space-around'],
      'align-items':['stretch','flex-start','flex-end','center', 'baseline'],
      'align-content':['stretch','flex-start','flex-end','center','space-between', 'space-around'],
    },
    parts: [],
    partAllStyle: {
      'flex-grow': [0,1,2,5],
      'flex-shrink': [1,0,2,5],
      'flex-basis': ['auto',0,'40px','100px','400px'],
      'order':[0,1,-1],
      'align-self':['auto','flex-start','flex-end','center','baseline','stretch'],
      'height':['auto','40px','100px'],
      'width':['auto','100px','400px'],
    }
  },
  methods:{
    changeParentStyle: function(name,val){
      this.parentStyle[name] = val
    },
    changePartStyle: function(index,name,val){
      this.parts[index][name] = val
    },
    changeSelected: function(index){
      this.selected = index
      this.$forceUpdate()
    },
    addPart:function(){
      var obj = {}
      for (var name in this.partAllStyle) {
        obj[name] = this.partAllStyle[name][0]
      }
      this.parts.push(JSON.parse(JSON.stringify(obj)))
    },
    removePart: function(){
      if (this.parts.length>1)
      this.parts.shift()
    }
  }
})