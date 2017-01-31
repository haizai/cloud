jQuery(function($){
  $('#user-logoff').on('click',function(){
    $.get('ajax/user/logoff',function(){
      window.location.pathname = 'login'
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
    if (val === lastSignVal) return
    if (val !== ''){
      $(this).hide().prev().show().text(val)
      $.post('ajax/user/changeSign',{sign: val})
    } else {
      $(this).hide().prev().show().text('修改失败，请输入非空签名！')
    }
  })
  $('#user-sex').on('change',function (e) {
    $.post('ajax/user/changeSex',{sex:$(this).val()})
  })
})