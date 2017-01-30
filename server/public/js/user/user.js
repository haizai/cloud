jQuery(function($){
  $('#user-logoff').on('click',function(){
    $.get('ajax/user/logoff',function(){
      window.location.pathname = 'login'
    })
  })
  $('#user-sign-span').on('click',function(){
    $(this).hide().next().show().val($(this).text()).focus().select()
  })
  $('#user-sign-input').on('keydown', function(e){
    if (e.keyCode == 13) $(this).blur()
  })
  $('#user-sign-input').on('blur', function(e){
    var val = $(this).val().trim()
    if (val !== ''){
      $(this).hide().prev().show().text(val)
      $.post('ajax/user/changeSign',{sign: val})
    } else {
      $(this).hide().prev().show().text('修改失败，请输入非空签名！')
    }
  })
})