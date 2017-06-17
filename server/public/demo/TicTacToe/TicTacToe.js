var outerHeight = document.body.offsetHeight
var outerWidth = document.body.offsetWidth

document.getElementById('board').style.width = outerWidth + 'px'
document.getElementById('board').style.height = outerWidth + 'px'


var Mission = function(){
  this._cells = {}
  this.indexs = [
    ['0_0','0_1','0_2'],
    ['1_0','1_1','1_2'],
    ['2_0','2_1','2_2'],
    ['0_0','1_0','2_0'],
    ['0_1','1_1','2_1'],
    ['0_2','1_2','2_2'],
    ['0_0','1_1','2_2'],
    ['0_2','1_1','2_0']
  ]
  this.nowPlayer = 1,
  this.stage = 'playing'
  this.el = {
    board: document.getElementById('board')
  }
  this.init()
  this.bindEvent()
}

var Cell = function(x,y,mission){
  this.x = x
  this.y = y
  this.player = null
  this.mission = mission
  this.dom = document.getElementById(x+'_'+y)
}
Cell.prototype = {
  render: function(){
    this.dom.classList.add('_'+this.player)
  }
}

Mission.prototype = {
  init: function(){
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let cell = new Cell(i,j,this)
          this._cells[i+'_'+j] = cell
        }
      }
  },
  getCell: function(x,y){
    return this._cells[x+'_'+y]
  },
  move: function(player,x,y){
    if (this.stage == 'playing' && player == this.nowPlayer) {
      var cell = this.getCell(x,y)
      if(cell.player === null){
        cell.player = player
        cell.render()
      }
      this.nowPlayer == 1 ? this.nowPlayer = 2 : this.nowPlayer = 1;
      this.test()
    }    
  },
  test: function(){
    var cells = this._cells
    var indexs = this.indexs
    for (var i = 0; i <indexs.length; i++) {
      var arr = []
      indexs[i].forEach(function(j){
        arr.push(cells[j].player)
      })
      if (arr[0] !== null && arr[0] === arr[1] && arr[1] === arr[2] ) {
        console.log('end',indexs[i])
        this.stage = 'end'
      }
    }
  },
  bindEvent: function(){
    var self = this
    this.el.board.addEventListener('click', function(e){
      document.getElementById('tip').innerHTML = e.target.id +','+ e.target.className
      if(e.target.classList.contains('cell')){
        var arr = e.target.id.split('_')
        var x = +arr[0]
        var y = +arr[1]
        var cell = self.getCell(x,y)
        cell.mission.move(cell.mission.nowPlayer,x,y)
      }
    })
  }
}



var mission = new Mission()
