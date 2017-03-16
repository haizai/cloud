var express = require('express');
var router = express.Router();

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



function Room(num) {
  this.num = num
  this.b= null
  this.w= null
  this.color='b'
  this.wing= null
  this.stage= 'notfull' // notfull wait playing end
  this.wingChess=[]
  this.history= []

  AllRooms.addRoom(this)
}
Room.prototype = {
  addPerson(user) {
    if (this.b === null) {
      this.b = user
      return {
        bool: true,
        text: 'b'
      }
    }
    if (this.w === null) {
      if (this.b.account !== user.account) {
        this.w = user
        this.stage = 'wait'
        return {
          bool: true,
          text: 'w',
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
  allReady() {
    if (this.b.ready && this.w.ready) {
      this.stage = 'playing'
      console.log(this)
      return true
    }
  }
}


router.get('*', (req,res,next) => {
  if (!req.session.isLogin) {
    res.send({
      bool: false,
      text: 'not login?'
    })
    return
  }
  next()
})


router.get('/roomEnter',(req,res)=>{

  let user = req.session.user
  if (req.query.num != 1) {
    res.send({
      bool: false,
      text: 'no num'
    }) //room非法值
    return
  }

  let room = AllRooms.getRoom(1)
  if (!room) {
    room = new Room(1)
  }
  
  let obj = room.addPerson(user)
  if (obj.text == 'w') {
    req.session.gomokuRoomNum = 1
  }
  res.send(obj)


})

router.get('/getRoomStage', (req, res) => {

  if (!req.session.gomokuRoomNum) { //若无gomokuRoomNum则赋值req.query.num
    if (req.query.num != 1) {
      res.send({
        bool: false,
        text: 'no num'
      }) //room非法值
      return
    }
    req.session.gomokuRoomNum = req.query.num
  }

  let room = AllRooms.getRoom(req.session.gomokuRoomNum)

  if (!room) {
    res.send({
      bool: false,
      text: 'no room'
    }) 
    return
  }

  res.send({
    bool: true,
    stage: room.stage
  })


})

router.get('/checkGomoku', (req, res) => {

  if (!req.session.gomokuRoomNum) {
    res.send({
      bool: false,
      text: 'not in gomoku romm'
    })
    return
  }

  var room = AllRooms.getRoom(req.session.gomokuRoomNum)
  if (req.session.user.account == room.b.account) {
    res.send({
      bool: true,
      text: 'in gomoku',
      color: 'b',
      other: room.w,
      me: room.b,
    })
  }
  if (req.session.user.account == room.w.account) {
    res.send({
      bool: true,
      text: 'in gomoku',
      color: 'w',
      other: room.b,
      me: room.w,
    })
  }
})

router.get('/ready', (req, res) => {
  let user = req.session.user
  let room = AllRooms.getRoom(req.session.gomokuRoomNum)
  let obj = room.personReady(user, true)
  obj.isAllReady = room.allReady()
  res.send(obj)
})



module.exports = router;