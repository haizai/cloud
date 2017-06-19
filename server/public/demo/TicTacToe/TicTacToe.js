window.onload = function(){


  function lengthInresize(){
    var outerHeight = document.body.offsetHeight
    var outerWidth = document.body.offsetWidth
    var unit = Math.min(outerHeight,outerWidth,600)
    document.getElementById('board').style.width = unit + 'px'
    document.getElementById('board').style.height = unit + 'px'
  }
  lengthInresize()

  var nowPlayer = 1
  var myPlayer = null
  var stage = 'wait'
  var scoket 

   function reset(){
    nowPlayer = 1
    myPlayer = null
    stage = 'wait'
    document.getElementById('tip').innerHTML = 'reset'
    Array.prototype.slice.apply(document.getElementsByClassName('cell')).forEach(function(dom){
      dom.className = 'cell'
    })
   }



  scokeConnect()
  function scokeConnect(){
    if (scoket) {
      socket.close()
    }
    // socket = io('http://localhost/ttt');
    socket = io('/ttt');
    socket.on('connect', function(){
      // console.log(socket.id);
    });

    socket.on('info', function (data) {
      console.info('info',data);
      switch (data) {
        case 'wait':
          document.getElementById('tip').innerHTML = '等待他人中...'
          break;
        case 'disconnect':
          alert('对方离开或重置游戏')
          reset()
          scokeConnect()
          break;
      }
    });

    socket.on('start', function (p1,p2,room) {
      if (p1 === socket.id) {
        myPlayer = 1
      } else if (p2 === socket.id) {
        myPlayer = 2
      }
      stage = 'playing'
      var myPlayerChinese = myPlayer == 1 ? '你先落子' : '等待对方落子';
      document.getElementById('tip').innerHTML = '游戏开始，'+myPlayerChinese
      document.getElementById('room').innerHTML = '房间 '+room
    });

    socket.on('move', function (player,x,y) {
      document.getElementById(x+'_'+y).classList.add('_'+player)
      nowPlayer == 1 ? nowPlayer = 2 : nowPlayer = 1;
      if (nowPlayer === myPlayer) {
        document.getElementById('tip').innerHTML = '请落子'
      } else {
        document.getElementById('tip').innerHTML = '等待对方落子'
      }
    });
    socket.on('end', function (player,x,y,winPlayer,ids) {
      document.getElementById(x+'_'+y).classList.add('_'+player)
      ids.forEach(function(id){
        document.getElementById(id).classList.add('win')
      })
      if (winPlayer === myPlayer) {
        document.getElementById('tip').innerHTML = '你赢了，可以下方点击「重置游戏」'
      } else {
        document.getElementById('tip').innerHTML = '你输了，可以下方点击「重置游戏」'
      }
    });

  }

  document.addEventListener('click', function(e){
    if (stage!=='playing') return 
    if (myPlayer!==nowPlayer) return
    var tg = e.target
    if(tg.classList.contains('cell') && !tg.classList.contains('_1')&& !tg.classList.contains('_2')){
      var arr = tg.id.split('_')
      var x = +arr[0]
      var y = +arr[1]
      socket.emit('tryMove',x,y)
    }
  })
  window.addEventListener('resize',function(e){
    lengthInresize()
  })
  document.getElementById('reset').addEventListener('click', function(e){
    location.reload(true)
  })
    
}