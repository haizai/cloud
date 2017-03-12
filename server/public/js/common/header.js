jQuery(function($){
  if (this.location.pathname == '/user') {
    $('.header-user').html("<span class='item'>用户</span>")
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
            $('.header-user').html("<div class='face'><a href='user#/center'><img class='small-img' src=" + src +"></img></a></div>")
          }
        })
      }
    })
  }
})