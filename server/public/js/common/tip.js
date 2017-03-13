var _tip = [false,false,false]

function tip(msg,state,time){

  var time = time || 2000

  var index = _tip.indexOf(false)
  if (index==-1) {
    setTimeout(function(){
      tip(msg,state,time)
    }, 500)
    return
  }
  _tip[index] = true
  var bottom = 80 - index*35
  var $span = $('<span></span>')
  $span.css({
    position:'fixed',
    zIndex: 1000,
    bottom: bottom+'px',
    paddingLeft: '30px',
    paddingRight: '30px',
    paddingTop: '2px',
    paddingBottom: '2px',
    fontSize: '14px',
    borderRadius: '4px',
    color:'#fff'
  }).appendTo($('body'))
  
  switch (state) {
    case 'err':
      $span.css({backgroundColor:'#f25d8e'})
      break;
    case 'info': 
      $span.css({backgroundColor:'#76EE00'})  
      break;
    default:
      $span.css({backgroundColor:'#29AAD4'})
      break;
  }

  var outerWidth = $span.text(msg).outerWidth()
  $span.css({left: -outerWidth + 'px'}).animate({left:0},200).delay(time).animate({left: -outerWidth + 'px'},200,function(){
    $span.remove()
    _tip[index] = false
  })
}