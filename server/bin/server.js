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


var events = require('events')
let emitterRoom = new events.EventEmitter(); //full,ready

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
  this.color ='b'
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
      this.b = user
      this.score[user.account] = 0
      return {
        bool: true,
        text: 'wait'
      }
    }
    if (this.w === null) {
      if (this.b.account !== user.account) {
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
  again() {
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

iog.on('connection', function (socket) {
  console.log('gomoku connection')

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

    if (socket.request.session.user.account == room.b.account) {
      socket.emit('user', {
        color: 'b',
        other: room.w,
        me: room.b,
      })
      return
    }
    if (socket.request.session.user.account == room.w.account) {
      socket.emit('user', {
        color: 'w',
        other: room.b,
        me: room.w,
      })
      return
    }

    socket.emit('err',{name: 'checkGomoku', text: 'session account !== room account'})

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



// router.get('*', (req,res,next) => {
//   if (!req.session.isLogin) {
//     res.send({
//       bool: false,
//       text: 'not login?'
//     })
//     return
//   }
//   next()
// })




// router.get('/roomEnter',(req,res)=>{

//   let user = req.session.user
//   if (req.query.num != 1) {
//     res.send({
//       bool: false,
//       text: 'no num'
//     }) //room非法值
//     return
//   }

//   let num = req.query.num
//   let room = AllRooms.getRoom(num)
//   if (!room) {
//     room = new Room(num)
//   }
  
//   let obj = room.addPerson(user)
//   if (obj.bool) {
//     req.session.gomokuRoomNum = num

//     if (obj.text == 'wait') {
//       emitterRoom.once('full' + num, () => res.send({bool: true}) )
//     } else {
//       emitterRoom.emit('full' + num)
//       res.send({bool: true})
//     }

//   } else {
//     res.send(obj)
//   }
// })


// router.get('*', (req,res,next) => {
//   if (!req.session.gomokuRoomNum) {
//     res.send({
//       bool: false,
//       text: 'not in gomoku room'
//     })
//     return
//   }
//   next()
// })


// router.get('/checkGomoku', (req, res) => {

//   let room = AllRooms.getRoom(req.session.gomokuRoomNum)
//   if (req.session.user.account == room.b.account) {
//     res.send({
//       bool: true,
//       text: 'in gomoku',
//       color: 'b',
//       other: room.w,
//       me: room.b,
//     })
//   }
//   if (req.session.user.account == room.w.account) {
//     res.send({
//       bool: true,
//       text: 'in gomoku',
//       color: 'w',
//       other: room.b,
//       me: room.w,
//     })
//   }
// })

// router.get('/ready', (req, res) => {
//   let user = req.session.user
//   let room = AllRooms.getRoom(req.session.gomokuRoomNum)
//   let obj = room.personReady(user, true)
//   if (!obj.bool) {
//     res.send(obj)
//     return
//   }
//   emitterRoom.once('ready' + room.num, () => res.send({bool: true}))

//   if (room.isAllReady()) {
//     emitterRoom.emit('ready' + room.num)
//   }
// })

// router.post('/move', (req, res) => {

//   if (!req.body.r) {
//     res.send({
//       bool: false,
//       text: 'no r'
//     })
//     return
//   }
//   if (!/^\d+$/.test(req.body.r)) {
//     res.send({
//       bool: false,
//       text: 'r is not all number'
//     })
//     return
//   }
//   let r = +req.body.r
//   if (r < 1 || r > 15) {
//     res.send({
//       bool: false,
//       text: 'r is not in (1 to 15)'
//     })
//     return
//   }

//   if (!req.body.c) {
//     res.send({
//       bool: false,
//       text: 'no c'
//     })
//     return
//   }
//   if (!/^\d+$/.test(req.body.c)) {
//     res.send({
//       bool: false,
//       text: 'c is not all number'
//     })
//     return
//   }
//   let c = +req.body.c
//   if (c < 1 || c > 15) {
//     res.send({
//       bool: false,
//       text: 'c is not in (1 to 15)'
//     })
//     return
//   }

//   let room = AllRooms.getRoom(req.session.gomokuRoomNum)

//   if (room.stage !== 'playing') {
//     res.send({
//       bool: false,
//       text: 'not playing'
//     })
//     return
//   }


//   if (room.chessmen[r][c].color !== null) {
//     res.send({
//       bool: false,
//       text: 'repeat move' //已有落子
//     })
//     return
//   }
//   room.history.push([r,c])
//   room.chessmen[r][c].color = room.color
//   console.log('move',room.color,r,c)

//   room.test()

//   let obj = {
//     bool: true,
//     r,
//     c
//   }

//   if (room.stage == 'end') {
//     obj.text = 'end'
//     obj.wing = room.wing
//     obj.wingChess = room.wingChess
//     obj.score = room.score
//   } else {
//     obj.text = 'continue'
//   }

//   emitterRoom.emit('move' + room.num, obj)


//   if (room.stage == 'end') {
//     room.again()
//     res.send(obj)
//   } else {
//     room.color = toggleColor(room.color)
//     res.send({bool: true, text: 'continue'})
//   }

// })

// router.get('/waitMove', (req,res) => {
//   let room = AllRooms.getRoom(req.session.gomokuRoomNum)

//   emitterRoom.once('move' + room.num, obj => {

//     if (obj.text == 'continue') {
//       res.send({
//         bool: true,
//         text: 'continue',
//         r: obj.r,
//         c: obj.c,
//       })
//     } else {
//       res.send(obj)
//     }

//   })
// })

// router.get('/givein', (req,res) => {
//   let room = AllRooms.getRoom(req.session.gomokuRoomNum)
//   let user = req.session.user
//   let wing = room.getColor(user) + 'givin'
//   let obj = {
//     bool: true,
//     text: 'end',
//     wing,
//   }
//   emitterRoom.emit('move' + room.num, obj)
//   return {
//     bool: true
//   }
// })







module.exports = server;