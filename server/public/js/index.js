jQuery(function($){

  // 禁止拖动
  // document.body.onmousedown = function() {
  //   return false
  // }


  var bH = $('body').height()
  var sel = 0
  var len = $('.part').length
  var onMove = false

  //出现侧栏
  for (var i = 0; i < len; i++) {
    if (i==0) {
      $('<div class="slide-item slide-item-in"></div>').appendTo($('.slide-items'))
    } else {
      $('<div class="slide-item"></div>').appendTo($('.slide-items'))
    }
    
  }


  // 读取背景  
  var Img = {
    smallSrcs: [
      "../img/index/p1_s.jpg",
      "../img/index/p2_s.jpg",
      "../img/index/p0_s.jpg",
      "../img/index/p3_s.jpg",
      "../img/index/p4_s.jpg"
    ],
    bigSrcs: [
      "../img/index/p1.jpg",
      "../img/index/p2.png",
      "../img/index/p0.png",
      "../img/index/p3.jpg",
      "../img/index/p4.jpg"
    ]
  }
  loadImg(0, false)
  function loadImg(index, isBig) {
    var newImg = new Image()
    newImg.src = isBig ? Img.bigSrcs[index] :Img.smallSrcs[index]
    newImg.onload = function() {
      $('.part').eq(index).css({'backgroundImage': "url('" + newImg.src + "')"})
      if (!isBig) {
        index < len - 1 ? loadImg(++index, false) : loadImg(0, true)
      } else {
        if (index < len - 1) {
          loadImg(++index, true)
        }
      }
    }
  }


  // 设置高度
  setItemHeight()
  function setItemHeight() {
    $('.part').each(function(){
      $(this).css({
        height:bH+'px'
      })
    })
  }
 
  // 窗口大小重置 
  $(window).resize(function(e){
    if (bH !== $('body').height()) {
      bH = $('body').height()
      setItemHeight()
      $('body').scrollTop(bH*sel)
    }
  });





  moveTo(0, true)

  // 核心移动方法
  function moveTo(index, isInit) {
    // console.log('moveTo',bH,index)
    onMove = true
    $('.part-tips').css({opacity: 0,marginRight: '0px'})

    $('.part-anime-warp').css({opacity: 0})
    $('.part-anime-search').css({opacity: 0}) // ie

    $('html,body').animate({scrollTop : bH*index},isInit?10:500,function(){
       onMove = false,
      $('.part').eq(index).find('.part-tips').animate({opacity: 1,marginRight: '30px'},500)

      if (index == 1) {
        $('.part-anime-warp').animate({opacity: 1}, 500, function(){
          $('.part-anime-keyword').focus()
        })
        $('.part-anime-search').animate({opacity: 1}, 500) // ie
      }
    })
    $('.slide-item').each(function(i){
      if (i===index) {
        $(this).addClass('slide-item-in')
      } else {
        $(this).removeClass('slide-item-in')
      }
    })
  }

  // 侧栏点击
  $('.slide-item').each(function(index){
    $(this).on('click', function() { 
        sel = index
        moveTo(sel)
    })
  })



  // 滚轮滚动
  $(document).on('mousewheel',function (e) {
    if (!onMove) {
      if(sel == 0 && e.deltaY == -1) {
        moveTo(++sel)
      } else if (sel == len-1 && e.deltaY == 1) {
        moveTo(--sel)
      }else if (sel > 0 && sel < len-1) {
        sel-=e.deltaY
        moveTo(sel)
      }
    }
  })

  // 按下移动
  // $('.part').on('mousedown', function(e1) {
  //   if (!onMove) {
  //     var startY = e1.clientY
  //     var $this = $(this)
  //     $this.on('mousemove', function(e2) { 
  //       // console.log(e2.clientY-startY)
  //       if (e2.clientY-startY < -20) {
  //         if (sel < len-1) {
  //           moveTo(++sel)
  //           $this.off('mousemove')
  //           $this.off('mouseup')
  //         }
  //       }
  //       if (e2.clientY-startY > 20) {
  //         if (sel > 0) {
  //           moveTo(--sel)
  //           $this.off('mousemove')
  //           $this.off('mouseup')
  //         }
  //       }
  //     })
  //     $this.on('mouseup', function(){
  //       $this.off('mousemove')
  //       $this.off('mouseup')
  //     })
  //   }
  // })


  //滑块上下
  $('.slide-top').on('click', function() {
    if (sel > 0 && !onMove) {
      moveTo(--sel)
    }
  })

  $('.slide-bottom').on('click', function() {
    if (sel < len-1 && !onMove) {
      moveTo(++sel)
    }
  })


  //anime 搜索
  $('.part-anime-search').on('click', function() {
    location = location.href + 'animes#/?keyword=' + $('.part-anime-keyword').val().trim() +'&page=1&range=default&sort=count'
  })
  $('.part-anime-keyword').on('keydown', function(e){
    if(e.keyCode==13) {
      location = location.href + 'animes#/?keyword=' + $('.part-anime-keyword').val().trim() +'&page=1&range=default&sort=count'
    }
  })

  $('.part-anime-img').hover(function(){
    $(this).animate({marginLeft: '390px'}, 300)
  }, function(){
    $(this).animate({marginLeft: '380px'}, 300)
  })

})