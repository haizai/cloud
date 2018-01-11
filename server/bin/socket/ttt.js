var io = require('../socket').io


var TTTMission = function(room){
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
  this.stage = 'wait'
  this._1 = null
  this._2 = null
  this.winIndex = null
  this.winPlayer = null
  this.room = room
}

var TTTCell = function(x,y,mission){
  this.x = x
  this.y = y
  this.player = null
  this.mission = mission
}

TTTMission.prototype = {
  addPerson: function(id){
    if (this._1===null) {
      this._1 = id
      return 'wait'
    } else if (this._2 === null) {
      this._2 = id
      this.start()
      return 'start'
    } else {
      return 'full'
    }
  },
  personToPlayer(id){
    if(this._1===id) {
      return 1
    }else if(this._2===id) {
      return 2
    } else {
      return false
    }
  },
  start(){
    this.stage = 'playing'
    this.init()
  },
  init: function(){
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let cell = new TTTCell(i,j,this)
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
        this.nowPlayer == 1 ? this.nowPlayer = 2 : this.nowPlayer = 1;
        return this.test()
      }
    }
    return 'err'
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
        this.stage = 'end'
        this.winIndex = i
        this.winPlayer = arr[0]
        return 'end'
      }
    }
    return 'continue'
  },
}

let testMission = new TTTMission()


const TTTRooms = {
  num: 101,
  missions:{

  },
  allotRoom(id){
    var mission
    if (!this.missions[this.num]) {
      var mission = new TTTMission(this.num)
      TTTRooms.missions[this.num] = mission
      return mission
    } else {
      var mission = TTTRooms.missions[this.num]
      if (mission._2 === null) {
        return mission
      } else {
        this.num++
        return this.allotRoom(id)
      }
    }
  }
}

let iot = io.of('ttt')
iot.on('connection', function (socket) {

  console.log('connection ttt',socket.id)
  var mission = TTTRooms.allotRoom(socket.id)
  var room = mission.room
  socket.join(room)

  var msg = mission.addPerson(socket.id)

  if(msg==="start") {
    iot.to(room).emit('start',mission._1,mission._2,room)
  } else {
    iot.to(room).emit('info',msg)
  }


  socket.on('disconnect',()=>{
      // console.log('disconnect',socket.id)
    if (mission.stage === 'playing') {
      iot.to(room).emit('info','disconnect')
      if (TTTRooms.num === room) {
        TTTRooms.num++
      }
    }
  })

  socket.on('tryMove',(x,y)=> {
    var player = mission.personToPlayer(socket.id)
    var moveMsg = mission.move(player,x,y)

    // console.log('tryMove',moveMsg,player,x,y)

    switch (moveMsg) {
      case 'continue':
        iot.to(room).emit('move',player,x,y)
        break;
      case 'end':
        iot.to(room).emit('end',player,x,y,mission.winPlayer,mission.indexs[mission.winIndex])
        break;
      case 'err':
        iot.to(room).emit('info','moveError')
        break;
      default:
        // statements_def
        break;
    }

  })
});