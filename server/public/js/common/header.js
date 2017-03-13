
jQuery(function($){
  if (this.location.pathname == '/user') {
    $('.header-user').addClass('header-active').html("<span  class='item'>用户</span>")
  } else {
    $.get('ajax/user/checkLogin',function(data){
      if (data.state == 2001 ) {
        $('.header-user').html("<a href='user#/register'>注册</a><span style='color:#f25d8e'> / </span><a href='user#/login'>登录</a>")
      } else {
        $.get('ajax/user/getUserInCenter',function(msg){
          console.log(msg)
          if (msg.state == 1) {
            var face = msg.user.face
            var src = 'img/face/' + face.style + '/' + face.name + '.png'
            var $face = $("<div class='face'><a href='user#/center'><img class='small-img' src=" + src +"></img></a><div class='face-cont'><p class='account'></p><a href='javascript:;' class='logoff'>退出</a><a href='user#/center' class='enter'>个人中心</a></div></div>")
            $('.header-user').append($face)
            $face.find('.account').text(msg.user.account)
            $face.find('.logoff').on('click',function() {
              $.get('ajax/user/logoff', function(msg2) {
                if (msg2.state === 1) {
                  tip('退出成功')
                  $('.header-user').html("<a href='user#/register'>注册</a><span style='color:#f25d8e'> / </span><a href='user#/login'>登录</a>")
                }
              })
            })
          }
        })
      }
    })
  }
})