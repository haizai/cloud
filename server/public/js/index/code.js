
jQuery(function ($) {

  
  var bH = $('body').height() 
  $('.code-warp').css({height:bH - 220 + 'px'})
  $('code[class*="language-"]').parent().css({height: bH - 320 + 'px'})

  //不同code转换
  $('.code-slide li').each(function(index) {
    $(this).on('click', function(){
      $('.code-slide li').removeClass('code-slide-in')
      $(this).addClass('code-slide-in')
      $('.code-body li').hide()
      $('.code-body li').eq(index).show()
    })
  })


  $('.part-demos-warp [code="jquery-calendar"]').on('click', function() {
    _isAllowedMousewheel = false
    var $code = $('.code-all[code="jquery-calendar"]')
    $code.show()
    $code.find('.code-del').on('click', function(){
      _isAllowedMousewheel = true
      $code.hide()
    })
  })

})