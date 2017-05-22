
jQuery(function($){

  function defalutUser() {
    $('.header-user').html("<a href='user#/register'>注册</a><span style='color:#f25d8e'> / </span><a href='user#/login'>登录</a>")
  }

  function getUser() {
    $.get('ajax/user/getUserInCenter',function(msg){
      if (msg.state == 1) {
        var face = msg.user.face
        var src = 'img/face/' + face.style + '/' + face.name + '.png'
        var $face = $("<div class='face'><a href='user#/center'><img class='small-img' src=" + src +"></img></a><div class='face-cont'><p class='account'></p><a href='javascript:;' class='logoff'>退出</a><a href='user#/center' class='enter'>个人中心</a></div></div>")
        $('.header-user').html($face)
        $face.find('.account').text(msg.user.account)
        $face.find('.logoff').on('click',function() {
          $.get('ajax/user/logoff', function(msg2) {
            if (msg2.state === 1) {
              tip('退出成功')
              window.localStorage.removeItem('haizai_password')
              defalutUser()
            }
          })
        })
      }
    })
  }


  function autoLogin() {
    var account = window.localStorage.getItem('haizai_account')
    var password = window.localStorage.getItem('haizai_password')
    if (account && password) {
      $.get('/ajax/user/login',{account: account, password: password}, function(res) {
        if (res.state == 1) {
          getUser()
          tip('自动登录成功')
        } else {
          window.localStorage.removeItem('haizai_password')
        }
      })
    }
  }

  if (this.location.pathname == '/user') {
    $('.header-user').addClass('header-active').html("<span  class='item'>用户</span>")
  } else {
    $.get('ajax/user/checkLogin',function(data){
      if (data.state == 2001 ) {
        defalutUser()
        autoLogin()
      } else {
        getUser()
      }
    })
  }



  var _isHeaderItemGameULShow = false
  $('#header-item-game').hover(function(){
    $('#header-item-game-ul').fadeIn(100)
  },function(){
    setTimeout(function(){
      if (!_isHeaderItemGameULShow) $('#header-item-game-ul').fadeOut(100)
    }, 100)
  })
  $('#header-item-game-ul').hover(function(){
    _isHeaderItemGameULShow = true
  },function(){
    _isHeaderItemGameULShow = false
    setTimeout(function(){
      if (!_isHeaderItemGameULShow) $('#header-item-game-ul').fadeOut(100)
    }, 100)
  })
})


