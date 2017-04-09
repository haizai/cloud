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
  addPerson(user) {
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

    console.log('AGAIN: \n\n', this)
  }
}

let iog = io.of('gomoku')

// socket.broadcast.to(num).emit() 对房间内他人广播
// iog.to(num).emit() 对房间内所有人广播

iog.on('connection', function (socket) {
  console.log('gomoku connection')

  // 中间件: 未登录&未进入房间
  socket.use((packet, next) => {
    console.log('use',packet)
    if (!socket.request.session.isLogin) {
      socket.emit('err', {
        name: packet[0],
        text: 'not login'
      })
    } else if (packet[0] !=='tryRoomEnter' && !socket.request.session.gomokuRoomNum) {
      socket.emit('err', {
        name: packet[0],
        text: 'not enter room'
      })
    } else {
      next()
    }
  })

  socket.on('tryRoomEnter', num => {

    let user = socket.request.session.user
    if (num != 100) {
      socket.emit('err', {name: 'tryRoomEnter',text: 'num is not 1'})
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
      console.log('ready',room.stage)
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
    console.log('move',room.color,r,c)

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
    console.log('givein',room)
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
    console.log('agreeDraw',room)
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

  socket.on('log',()=>{
    console.log(
      'socket.request.session:\n\n',
      socket.request.session
    );
  })
  socket.on('join',()=>{
    socket.join('roomtest')
  })

  socket.on('seesion', (a)=>{
    console.log('seesion:\n\n',a);
  })

});


module.exports = server;