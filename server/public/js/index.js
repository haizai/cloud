jQuery(function($){

  document.body.onmousedown = function() {
    return false
  }

  var bH = $('body').height()
  $(window).resize(function(e){
    if (bH !== $('body').height()) {
      bH = $('body').height()
      setItemHeight()
      $('body').scrollTop(bH*sel)
    }
  });
  var sel = 0
  var len = $('.part').length
  var onMove = false

  setItemHeight()

  function setItemHeight() {
    $('.part').each(function(){
      $(this).css({
        height:bH+'px'
      })
    })
  }
  for (var i = 0; i < len; i++) {
    if (i==0) {
      $('<div class="slide-item slide-item-in"></div>').appendTo($('.slide'))
    } else {
      $('<div class="slide-item"></div>').appendTo($('.slide'))
    }
  }
  $('.slide-item').each(function(index){
    $(this).on('click', function() {
      moveTo(index)
    })
  })

  moveTo(0, true)

  function moveTo(index, isInit) {
    // console.log('moveTo',bH,index)
    onMove = true
    $('.part').find('.part-hasAnime').each(function(){
      this.style = null
    })
    $('html,body').animate({scrollTop : bH*index},isInit?10:500,function(){
        onMove = false,
        $('.part').eq(index).find('.part-text').animate({opacity: 1,marginRight: '30px'},500,function(){
      })
    })
    $('.slide-item').each(function(i){
      if (i===index) {
        $(this).addClass('slide-item-in')
      } else {
        $(this).removeClass('slide-item-in')
      }
    })

  }

  $(document).on('mousewheel',function (e) {
    if (!onMove) {
      if(sel == 0) {
        if(e.deltaY == -1) {
          sel++
          moveTo(sel)
        }
      }else if (sel == len-1) {
        if(e.deltaY == 1) {
          sel--
          moveTo(sel)
        }
      }else if (sel > 0 && sel < len-1) {
        sel-=e.deltaY
          moveTo(sel)
      }
    }
  })

  $('.part').on('mousedown', function(e1) {
    if (!onMove) {
      var startY = e1.clientY
      var $this = $(this)
      $this.on('mousemove', function(e2) { 
        // console.log(e2.clientY-startY)
        if (e2.clientY-startY < -15) {
          if (sel < len-1) {
            sel++
            moveTo(sel)
            $this.off('mousemove')
            $this.off('mouseup')
          }
        }
        if (e2.clientY-startY > 15) {
          if (sel > 0) {
            sel--
            moveTo(sel)
            $this.off('mousemove')
            $this.off('mouseup')
          }
        }
      })
      $this.on('mouseup', function(){
        $this.off('mousemove')
        $this.off('mouseup')
      })
    }
  })

  $('.part-img-big').on('load', function(){
    $(this).siblings('.part-img-small').css({display:'none'})
    $(this).css({display:'block'})
  })


})