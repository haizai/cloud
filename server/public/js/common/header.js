jQuery(function($){
  if (this.location.pathname == '/user') {
    $('.header-user').html("<span class='item'>用户</span>")
  } else {
    $.get('ajax/user/checkLogin',function(data){
      if (data.state == 2001 ) {
        $('.header-user').html("<a href='user#/register'>注册</a><span style='color:#f25d8e'> / </span><a href='user#/login'>登录</a>")
      } else {
        $.get('ajax/user/getUserInCenter',function(user){
          console.log(user)
        })
      }
    })
  }
})