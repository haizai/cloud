jQuery(function(){
  function login() {
    $('.login-text').text('登入中...')
    $.ajax({
      url: 'ajax/user/login',
      data: {
        account: $('#login-account').val(),
        password: $('#login-password').val()
      },
      success: function(doc){
        switch (doc.state) {
          case 1:
            $('.login-text').text('登入成功！ 2秒后自动转跳')
            setTimeout(function(){
              window.location = 'user'
            }, 2000)
            break;
          case 1001:
            $('.login-text').text('用户名为空')
            break;
          case 1002:
            $('.login-text').text('密码为空')
            break;
          case 1003:
            $('.login-text').text('用户名不存在')
            break;
          case 1004:
            $('.login-text').text('密码错误')
            break;
          case 3001:
            $('.login-text').text('数据库错误')
            break;
          default:
            $('.login-text').text('未知错误')
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