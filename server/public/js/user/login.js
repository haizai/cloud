jQuery(function(){
  function login() {
    tip('登入中...','info',500)
    $.ajax({
      url: 'ajax/user/login',
      data: {
        account: $('#login-account').val(),
        password: $('#login-password').val()
      },
      success: function(doc){
        switch (doc.state) {
          case 1:
            tip('登入成功，即将自动转跳')
            setTimeout(function(){
              window.location = 'user'
            }, 1500)
            break;
          case 1001:
            tip('用户名为空','err')
            break;
          case 1002:
            tip('密码为空','err')
            break;
          case 1003:
           tip('用户名不存在','err')
            break;
          case 1004:
            tip('密码错误','err')
            break;
          case 3001:
            tip('数据库错误','err')
            break;
          default:
            tip('未知错误','err')
            break;
        }
      }
    })
  }
  $('#login-submit').on('click', login)
  $('#login-password').on('keydown', function(e){
    if (e.keyCode == 13) {
      $(this).blur()
      login()
    }
  })
})