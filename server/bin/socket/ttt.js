var io = require('../socket').io


// 在Persons中使用newPerson方法创建
var Person = function(id,name){
  this.id = id
  this.name = name
  this.player = null
  this.roomid = null
  this.tryAgain = false
}

var Persons = {
  data:{
    // socketid:person
  },
  newPerson(socketid, name){
    let person = new Person(socketid,name)
    this.data[socketid] = person
    return person
  },
  getPerson(socketid) {
    let person = this.data[socketid]
    if (person) {
      return person
    } else {
      return false
    }
  },
  deletePerson(socketid){
    let p = this.data[socketid]
    delete this.data[socketid]
    p = null
  }
}


var Room = function(roomid){
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
  this.persons = []
  this.winIndex = null
  this.winPlayer = null
  this.roomid = roomid
}

var Cell = function(x,y,room){
  this.x = x
  this.y = y
  this.player = null
  this.room = room
}

Room.prototype = {
  addPerson(person){

    if (this.persons.length===0) {
      this.persons.push(person)
      person.player = 1
      person.roomid = this.roomid
      return 'wait'
    } else if (this.persons.length===1) {
      this.persons.push(person)
      person.player = 2
      person.roomid = this.roomid
      return 'start'
    } else {
      return 'full'
    }
  },
  start(){
    this.stage = 'playing'
    this.init()
  },
  init(){
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let cell = new Cell(i,j,this)
        this._cells[i+'_'+j] = cell
      }
    }
  },
  getCell(x,y){
    return this._cells[x+'_'+y]
  },
  move(player,x,y){
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
  test(){
    var cells = this._cells
    var indexs = this.indexs
    for (var i = 0; i <indexs.length; i++) {
      var arr = []
      indexs[i].forEach(function(j){
        arr.push(cells[j].player)
      })
      // 一方获胜
      if (arr[0] !== null && arr[0] === arr[1] && arr[1] === arr[2] ) {
        this.stage = 'end'
        this.winPlayer = arr[0]
        return 'end'
      }
    }

    // 全部空格落完,平局
    if (Object.values(cells).every(a=>a.player!==null)) {
      this.stage = 'end'
      this.winPlayer = 0
      return 'end'
    }
    
    return 'continue'
  },
  reset(){
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let cell = new Cell(i,j,this)
        this._cells[i+'_'+j].player = null
      }
    }
    this.nowPlayer = 1,
    this.stage = 'playing'
    this.persons.forEach(p=>{
      p.tryAgain = false
      p.player === 1 ? p.player = 2 : p.player = 1
    })
    this.winIndex = null
    this.winPlayer = null
  }


}


const Rooms = {
  roomid: 101,
  rooms:{

  },
  //分配房间
  allotRoom(){
    var room
    // 若当前房间为空，则创建新房间并返回
    if (!this.rooms[this.roomid]) {
      var room = new Room(this.roomid)
      Rooms.rooms[this.roomid] = room
      return room
    } else {
      // 若当前房间有一人，则返回这个房间
      var room = Rooms.rooms[this.roomid]
      if (room.persons.length===1) {
        return room
      } else {
      // 若当前房间已满，房间号+1
        this.roomid++
        return this.allotRoom(this.roomid)
      }
    }
  },
  getRoom(roomid) {
    let room = this.rooms[roomid]
    if (room) {
      return room
    } else {
      return false
    }
  },
  deleteRoom(roomid) {
    let room = this.getRoom(roomid)
    if (room.persons) {
      room.persons.forEach(p=>Persons.deletePerson(p.id))
    }
    room = null
    delete this.rooms[roomid]
  }
}

let iot = io.of('ttt')
iot.on('connection', function (socket) {


  console.log('connection ',socket.id)

  socket.on('info',(text)=>{

    console.log(text)

  })

  socket.on('ready',(name)=>{

    // 分配房间
    var room = Rooms.allotRoom()
    var roomid = room.roomid
    socket.join(roomid)

    // 创建新人物
    let person = Persons.newPerson(socket.id, name)


    // 房间加入这个人物
    var msg = room.addPerson(person)

    console.log('ready',socket.id, name,roomid,msg)

    if(msg==="start") {
      room.start()
      iot.to(roomid).emit('start',room.persons,roomid)
    } else {
      iot.to(roomid).emit('info',msg)
    }

  })






  socket.on('tryMove',(x,y)=> {

    let person = Persons.getPerson(socket.id)

    if (!person) {
      socket.emit('info','not found socket.id')
      return 
    }

    let roomid = person.roomid
    var room = Rooms.getRoom(roomid)
    var player = person.player
    var moveMsg = room.move(player,x,y)

    console.log('tryMove',roomid,player,moveMsg,x,y)

    switch (moveMsg) {
      case 'continue':
        iot.to(roomid).emit('move',player,x,y)
        break;
      case 'end':
        iot.to(roomid).emit('end',player,x,y,room.winPlayer)
        break;
      case 'err':
        iot.to(roomid).emit('info','moveError')
        break;
      default:
        // statements_def
        break;
    }

  })

  socket.on('tryAgain',()=>{
    let person = Persons.getPerson(socket.id)
    person.tryAgain = true
    let roomid = person.roomid
    var room = Rooms.getRoom(roomid)

    if (room.stage === 'end') {
      if(room.persons.every(p=>p.tryAgain)) {
        room.reset()
        iot.to(roomid).emit('reset',room.persons,roomid)
        console.log('room reset',room)
      }
    } else {
      socket.emit('info','tryAgain error: stage is not end')
    }

  })


  

  let exitEvent = () => {
    let person = Persons.getPerson(socket.id)

    if (person) {
      let roomid = person.roomid
      var room = Rooms.getRoom(roomid)

      if (room.stage !== 'wait') {
        let otherPerson = room.persons.filter(p=>p!==person)
        socket.leave(roomid)
        socket.broadcast.to(roomid).emit('otherExit',roomid)
        Rooms.deleteRoom(roomid)
        console.log('exit\n',person.name,roomid,Rooms.rooms,Persons.data)
      } else {
        socket.leave(roomid)
        Rooms.deleteRoom(roomid)
        console.log('abandon\n',person.name,roomid,Rooms.rooms,Persons.data)
      }

    }

  }

  socket.on('exit',exitEvent)
  socket.on('disconnect',exitEvent)

  socket.on('leaveroom',roomid=>{
    socket.leave(roomid)
  })

  // 放弃匹配
  socket.on('abandonReady',() => {
    let person = Persons.getPerson(socket.id)
    let roomid = person.roomid
    var room = Rooms.getRoom(roomid)
    socket.leave(roomid)
    Rooms.deleteRoom(roomid)
    console.log('abandon\n',person.name,roomid,Rooms.rooms,Persons.data)
  }
)

});