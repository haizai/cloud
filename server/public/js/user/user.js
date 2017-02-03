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
      $.post('ajax/user/setSign',{sign: val},function(obj){
        obj.state == 1 ? tip('个性签名修改成功') : tip('个性签名修改失败','err')
      })
    } else {
      $(this).hide().prev().show()
      tip('个性签名修改失败，请勿输入空值','err')
    }
  })
  $('#user-sex').on('change',function (e) {
    $.post('ajax/user/setSex',{sex:$(this).val()},function(obj){
      obj.state == 1 ? tip('性别修改成功') : tip('性别修改失败','err')
    })
  })


  provinces.forEach(function(pro){
    $('#user-pro').append('<option value="' + pro.proID + '">'+ pro.name +'</option>')
  })
  $('#user-pro').on('change',function(e){
    var proID = $(this).val()
    cityByProID(proID)
    $.post('ajax/user/setProID',{proID: proID},function(obj){
      if (obj.state == 1) {
        proID == 0 ? tip('请选择省份','info') : tip('省份修改成功')
      } else {
        tip('省份修改失败','err')
      }
    })
  })
  $.get('ajax/user/getProAndCity',function(obj){
    if (obj.state == 1) {
      $('#user-pro').val(obj.proID)
      cityByProID(obj.proID,obj.cityID)
    }
  })
  function cityByProID(proID,cityID) {
    if (proID == 0 || proID == 1 || proID == 2 || proID == 9 || proID == 27 || proID == 33 || proID == 34 ) {
      $('#user-city').hide()
      return
    } 
    $('#user-city').show().empty().append('<option value="0">请选择城市</option>')
    citys.forEach(function(city){
      if(city.proID == proID) {
        $('#user-city').append('<option value="' + city.cityID + '">'+ city.name +'</option>')
      }
    })
    cityID !== void 0 ? $('#user-city').val(cityID) : $('#user-city').val(0)
  }

})