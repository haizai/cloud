
function tip(msg,state){
  var $span = $('<span></span>')
  $span.css({
    position:'fixed',
    zIndex: 1000,
    bottom: '50px',
    paddingLeft: '15px',
    paddingRight: '15px',
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
  $span.css({left: -outerWidth + 'px'}).animate({left:0},200).delay(2000).animate({left: -outerWidth + 'px'},200,function(){
    $span.remove()
  })
}