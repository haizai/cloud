jQuery(function($){
  $('#user-logoff').on('click',function(){
    $.get('ajax/user/logoff',function(obj){
      if(obj.state == 1) {
        tip('注销成功，即将自动转跳')
        setTimeout(function(){
          window.location.pathname = 'login'
        }, 1000)
      } else {
        tip('注销失败','err')
      }
    })
  })
  var lastSignVal = ''
  $('#user-sign-span').on('click',function(){
    lastSignVal = $(this).text()
    $(this).hide().next().show().val(lastSignVal).focus().select()
  })
  $('#user-sign-input').on('keydown', function(e){
    if (e.keyCode == 13) $(this).blur()
  })
  $('#user-sign-input').on('blur', function(e){
    var val = $(this).val().trim()
    if (val === lastSignVal) {
      $(this).hide().prev().show()
      tip('个性签名尚未修改','info')
      return
    }
    if (val !== ''){
      $(this).hide().prev().show().text(val)
      $.post('ajax/user/changeSign',{sign: val},function(obj){
        if (obj.state == 1) {
          tip('个性签名修改成功')
        } else {
          tip('个性签名修改失败','err')
        }
      })
    } else {
      $(this).hide().prev().show()
      tip('个性签名修改失败，请勿输入空值','err')
    }
  })
  $('#user-sex').on('change',function (e) {
    $.post('ajax/user/changeSex',{sex:$(this).val()},function(obj){
        if (obj.state == 1) {
          tip('性别修改成功')
        } else {
          tip('性别修改失败','err')
        }
      })
  })
})