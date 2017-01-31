jQuery(function($){
  $('body').append("<span id='tip' style='position:fixed;z-index:1000;bottom:50px;left:-100%;background:#29AAD4;color:#fff;padding: 2px 15px;font-size: 14px;border-radius: 4px;'><span>")
})
function tip(msg,state){

  switch (state) {
    case 'err':
      $('#tip').css({backgroundColor:'#f25d8e'})
      break;
    default:
      $('#tip').css({backgroundColor:'#29AAD4'})
      break;
  }

  var outerWidth = $('#tip').text(msg).outerWidth()
  $('#tip').stop(true).css({left: -outerWidth + 'px'}).animate({left:0},200).delay(3000).animate({left: -outerWidth + 'px'},200)
}