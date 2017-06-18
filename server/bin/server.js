var app = require('../app').app;
var port = require('./port');
app.set('port', port);

var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server)
var sessionMiddleware = require('../app').sessionMiddleware;

io.use(function(socket, next) {
  sessionMiddleware(socket.request, socket.request.res, next);
});



const AllRooms = {
  rooms: {},
  addRoom(room) {
    this.rooms[room.num] = room
  },
  getRoom(num) {
    if (this.rooms[num]) {
      return this.rooms[num]
    } else {
      return false
    }
  }
}

function toggleColor(color) {
  if (color == 'b') {
    return 'w'
  } else {
    return 'b'
  }
}

function Room(num) {
    this.num = num
    this.b = null
    this.w = null
    this.color ='b' // 前台为nowColor
    this.wing = null
    this.stage = 'notfull' // notfull wait playing end
    this.wingChess = []
    this.chessmen = {}
    this.history = []
    this.score = {
      _draw: 0
    }


    for (let a = 1; a < 16; a++) { // 将15*15个子都预设好

      if (!this.chessmen[a]) this.chessmen[a] = {}

      for (let b = 1; b < 16; b++) {
        this.chessmen[a][b] = {color: null}
      }
    }

  AllRooms.addRoom(this)
}

Room.prototype = {
  init() {
    this.b = null
    this.w = null
    this.color ='b' // 前台为nowColor
    this.wing = null
    this.stage = 'notfull' // notfull wait playing end
    this.wingChess = []
    this.chessmen = {}
    this.history = []
    this.score = {
      _draw: 0
    }
    for (let a = 1; a < 16; a++) { // 将15*15个子都预设好

      if (!this.chessmen[a]) this.chessmen[a] = {}

      for (let b = 1; b < 16; b++) {
        this.chessmen[a][b] = {color: null}
      }
    }
  },
  addPerson(user) {
    // console.log('addperson'+ user.account)
    if (this.b === null) {
      user.ready = false
      this.b = user
      this.score[user.account] = 0
      return {
        bool: true,
        text: 'wait'
      }
    }
    if (this.w === null) {
      if (this.b.account !== user.account) {
        user.ready = false
        this.w = user
        this.score[user.account] = 0
        this.stage = 'wait'
        return {
          bool: true,
          text: 'enter'
        }
      } else {
        return {
          bool: false,
          text: 'repeat'
        }
      }
    }
    return {
      bool: false,
      text: 'full'
    }
  },
  personReady(user, isReady) {
    if (this.b.account == user.account) {
      this.b.ready = isReady
      return {
        bool: true,
        text: 'b',
        type: isReady
      }
    }
    if (this.w.account == user.account) {
      this.w.ready = isReady
      return {
        bool: true,
        text: 'w',
        type: isReady
      }
    }
    
    return {
      bool: false,
      text: 'unknown account'
    }
  },

  isAllReady() {
    if (this.b.ready && this.w.ready) {
      this.stage = 'playing'
      return true
    }
  },
  getColor(user) {
    if (this.b.account === user.account) {
      return 'b'
    }
    if (this.w.account === user.account) {
      return 'w'
    }
    return false
  },
  test() {
    let chessmen = this.chessmen

    for (let r in chessmen) {
      r = (+r)
      for (let c in chessmen[r]) {
        c = (+c)

        let color = chessmen[r][c].color

        if (color !== null) {

          // 横五个
          if (c < 12 && color == chessmen[r][c+1].color && color == chessmen[r][c+2].color && color == chessmen[r][c+3].color && color == chessmen[r][c+4].color) {
            this.wing = color
            this.wingChess = [[r,c],[r,c+1],[r,c+2],[r,c+3],[r,c+4]]
            this.score[this[color].account]++
            this.stage = 'end'
          }

          //竖五个
          if ( r < 12 && color == chessmen[r+1][c].color&& color == chessmen[r+2][c].color&& color == chessmen[r+3][c].color&& color == chessmen[r+4][c].color) {
            this.wing = color
            this.wingChess = [[r,c],[r+1,c],[r+2,c],[r+3,c],[r+4,c]]
            this.score[this[color].account]++
            this.stage = 'end'
          }


          //左上斜五个
          if (c < 12 && r < 12 && color == chessmen[r+1][c+1].color&& color == chessmen[r+2][c+2].color&& color == chessmen[r+3][c+3].color && color == chessmen[r+4][c+4].color) {
            this.wing = chessmen[r][c].color
            this.wingChess = [[r,c],[r+1,c+1],[r+2,c+2],[r+3,c+3],[r+4,c+4]]
            this.score[this[color].account]++
            this.stage = 'end'
          }

          //左下斜五个
          if (r < 12 && c > 4 && chessmen[r+4] && chessmen[r+4][c-4] &&  color == chessmen[r+1][c-1].color&& color == chessmen[r+2][c-2].color&& color == chessmen[r+3][c-3].color && color == chessmen[r+4][c-4].color) {
            this.wing = color
            this.wingChess = [[r,c],[r+1,c-1],[r+2,c-2],[r+3,c-3],[r+4,c-4]]
            this.score[this[color].account]++
            this.stage = 'end'
          }
          
        } 
      }

    }

    if (this.history.length === 225) {
      this.wing = 'draw_225'
      this.score[_draw]++
      this.stage = 'end' 
    }
  },
  reset() {
    this.color ='b'
    this.wing = null
    this.stage = 'wait'
    this.wingChess = []
    this.chessmen = {}
    this.history = []

    let _b = this.b
    let _w = this.w
    delete this.b
    delete this.w
    this.b = _w
    this.w = _b
    this.b.ready = false
    this.w.ready = false


    for (let a = 1; a < 16; a++) { // 将15*15个子都预设好

      if (!this.chessmen[a]) this.chessmen[a] = {}

      for (let b = 1; b < 16; b++) {
        this.chessmen[a][b] = {color: null}
      }
    }

  }
}

let iog = io.of('gomoku')

// socket.broadcast.to(num).emit() 对房间内他人广播
// iog.to(num).emit() 对房间内所有人广播

iog.on('connection', function (socket) {

  // 中间件: 未登录&未进入房间
  socket.use((packet, next) => {
    // console.log('use',packet)
    if (!socket.request.session.isLogin) {
      socket.emit('err', {
        name: packet[0],
        text: 'not login'
      })
    } else if (packet[0] !=='tryRoomEnter' && packet[0] !=='init' && !socket.request.session.gomokuRoomNum) {
      socket.emit('err', {
        name: packet[0],
        text: 'not enter room'
      })
    } else {
      next()
    }
  })

  // 完全重置房间
  socket.on('init', (num) => {

    let user = socket.request.session.user

    if (num != 100) {
      socket.emit('err', {name: 'init',text: 'num is not 100'})
      return
    }

    if (user.position === 'admin') {
      let room = AllRooms.getRoom(num)
      if (room) {
        room.init()
      }
      iog.to(num).emit('init')
    }
    
  })


  socket.on('tryRoomEnter', num => {

    let user = socket.request.session.user
    if (num != 100) {
      socket.emit('err', {name: 'tryRoomEnter',text: 'num is not 100'})
      return
    }

    let room = AllRooms.getRoom(num)
    if (!room) {
      room = new Room(num)
    }
    

    let obj = room.addPerson(user)


    if (obj.bool) {
      socket.request.session.gomokuRoomNum = num
      socket.join(num)

      if (obj.text == 'enter') {
        iog.to(num).emit('roomEnter', num)
      }

    } else {
      socket.emit('err', {name: 'tryRoomEnter',text: obj.text})
    }
  })




  socket.on('checkGomoku', () => {

    let num = socket.request.session.gomokuRoomNum
    let room = AllRooms.getRoom(num)
    let user = socket.request.session.user

    if (user.account == room.b.account) {
      socket.emit('user', {
        color: 'b',
        other: room.w,
        me: room.b,
      })
      return
    }
    if (user.account == room.w.account) {
      socket.emit('user', {
        color: 'w',
        other: room.b,
        me: room.w,
      })
      return
    }

    socket.emit('err',{name: 'checkGomoku', text: 'session account !== room account'})

  })

  socket.on('ready', () => {

    let num = socket.request.session.gomokuRoomNum
    let room = AllRooms.getRoom(num)
    let user = socket.request.session.user

    if (room.stage !== 'wait' && room.stage !== 'end') {
      // console.log('ready',room.stage)
      socket.emit('err',{name: 'ready', text: 'not (wait & end)'})
      return
    }

    let obj = room.personReady(user, true)
    if (!obj.bool) {
      socket.emit('err', {name: 'ready', text: obj.text})
      return
    }
    socket.broadcast.to(num).emit('otherReady')

    if (room.isAllReady()) {
      iog.to(num).emit('allReady')

    }
  })

  socket.on('move', o => {

    if (!o.r) {
      socket.emit('err',{name: 'move', text: 'no r'})
      return
    }
    if (!/^\d+$/.test(o.r)) {
      socket.emit('err',{name: 'move', text: 'r is not all number'})
      return
    }
    let r = +o.r
    if (r < 1 || r > 15) {
      socket.emit('err',{name: 'move', text: 'r is not in (1 to 15)'})
      return
    }

    if (!o.c) {
      socket.emit('err',{name: 'move', text: 'no c'})
      return
    }
    if (!/^\d+$/.test(o.c)) {
      socket.emit('err',{name: 'move', text: 'c is not all number'})
      return
    }

    let c = +o.c
    if (c < 1 || c > 15) {
      socket.emit('err',{name: 'move', text: 'c is not in (1 to 15)'})
      return
    }

    let num = socket.request.session.gomokuRoomNum
    let room = AllRooms.getRoom(num)
    let user = socket.request.session.user

    if (room.stage !== 'playing') {
      socket.emit('err',{name: 'move', text: 'not playing'})
      return
    }


    if (room.chessmen[r][c].color !== null) {
      socket.emit('err',{name: 'move', text: 'repeat move'}) //已有落子
      return
    }

    room.history.push([r,c])
    room.chessmen[r][c].color = room.color
    // console.log('move',room.color,r,c)

    room.test()

    if (room.stage == 'end') {
      iog.to(num).emit('end',{
        wing: room.wing,
        wingChess: room.wingChess,
        score: room.score,
        r,
        c
      })
      room.reset()
    } else {
      socket.broadcast.to(num).emit('otherMove', {r,c})
      room.color = toggleColor(room.color)
    }

  })


  socket.on('givein', () => {

    let num = socket.request.session.gomokuRoomNum
    let room = AllRooms.getRoom(num)
    let user = socket.request.session.user

    if (room.stage !== 'playing') {
      socket.emit('err',{name: 'givein', text: 'not playing'})
    }
    socket.broadcast.to(num).emit('otherGivein')

    room.score[room[toggleColor(user.color)].account]++

    room.reset()
    // console.log('givein',room)
  })


  socket.on('tryDraw', () => {

    let num = socket.request.session.gomokuRoomNum
    let room = AllRooms.getRoom(num)
    let user = socket.request.session.user

    if (room.stage !== 'playing') {
      socket.emit('err',{name: 'tryDraw', text: 'not playing'})
    }

    // if (room.history.length < 3) {
    //   socket.emit('err',{name: 'tryDraw', text: 'room.history.length < 3'})
    // }

    socket.broadcast.to(num).emit('otherTryDraw')

  })


  socket.on('agreeDraw', () => {

    let num = socket.request.session.gomokuRoomNum
    let room = AllRooms.getRoom(num)
    let user = socket.request.session.user

    if (room.stage !== 'playing') {
      socket.emit('err',{name: 'agreeDraw', text: 'not playing'})
    }
    socket.broadcast.to(num).emit('otherAgreeDraw')
    room.score._draw++

    room.reset()
    // console.log('agreeDraw',room)
  })

  socket.on('refuseDraw', () => {

    let num = socket.request.session.gomokuRoomNum
    let room = AllRooms.getRoom(num)
    let user = socket.request.session.user

    if (room.stage !== 'playing') {
      socket.emit('err',{name: 'refuseDraw', text: 'not playing'})
    }
    socket.broadcast.to(num).emit('otherRefuseDraw')

  })


  socket.on('tryRegret', color => {

    let num = socket.request.session.gomokuRoomNum
    let room = AllRooms.getRoom(num)
    let user = socket.request.session.user

    if (room.stage !== 'playing') {
      socket.emit('err',{name: 'tryRegret', text: 'not playing'})
    }
    socket.broadcast.to(num).emit('otherTryRegret', color)

  })


  socket.on('agreeRegret', color => {

    let num = socket.request.session.gomokuRoomNum
    let room = AllRooms.getRoom(num)
    let user = socket.request.session.user

    if (room.stage !== 'playing') {
      socket.emit('err',{name: 'agreeRegret', text: 'not playing'})
    }

    // 若同色，后退2步；若不同色，后退1步
    let regretCount = room.color == color ? 2 : 1;
    let regretChessmen = room.history.splice(-regretCount, regretCount)

    // 将后退的步重置颜色
    regretChessmen.forEach( item => {
      room.chessmen[item[0]][item[1]].color = null
    })

    // 当前颜色
    room.color = color

    socket.broadcast.to(num).emit('otherAgreeRegret', color)

  })

  socket.on('refuseRegret', () => {

    let num = socket.request.session.gomokuRoomNum
    let room = AllRooms.getRoom(num)
    let user = socket.request.session.user

    if (room.stage !== 'playing') {
      socket.emit('err',{name: 'refuseRegret', text: 'not playing'})
    }
    socket.broadcast.to(num).emit('otherRefuseRegret')

  })

});





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

  // console.log('connection',socket.id)
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
module.exports = server;