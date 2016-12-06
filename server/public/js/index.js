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




  var carouselTimer = null
  var lastCarouselTime = Date.now()


  /**
   * 汉字打字机效果
   * @param  {[obj]} $DOM  要插入的dom节点
   * @param  {[str]} text  要插入的汉字
   * @return {[underfined]}
   */
  function typewriter($DOM,text) {
    $DOM.css({display:'block'})
    var len = text.length
    var finArr = text.split('')
    var arr = []
    for (var i = 0; i < len; i++) {
      arr.push('')
    }
    run(false, 0)
    function run(is_,index) {
      setTimeout(function(){
      if (!is_) {
        arr[index] = '__'
        $DOM.text(arr.join(''))
        run(true, index)
      } else {
        arr[index] = finArr[index]
        $DOM.text(arr.join(''))
        if (index < len - 1) {
          run(false, ++index)
        }
      }
      },80)
    }
  }


  moveTo(0)

  // 核心移动方法
  function moveTo(index) {
    onMove = true
    $('.part-tips').css({display:'none'}).text(' ')

    $('.part-anime-warp').css({opacity: 0})
    $('.part-anime-search').css({opacity: 0}) // ie

    $('html,body').animate({scrollTop : bH*index},500,function(){
      
      onMove = false
      carouselTimer = null
      
      switch (index) {
        case 0:
          typewriter($('.part-tips').eq(0),"苟利国家生死以，岂因祸福避趋之。——林则徐")
          break;
        case 1:
          typewriter($('.part-tips').eq(1),"我们所经历的每一个平凡的日常，也许就是连续发生的奇迹。——「日常」")
          $('.part-anime-warp').animate({opacity: 1}, 500)
          $('.part-anime-search').animate({opacity: 1}, 500) // ie
          // carousel自动移动
          lastCarouselTime = Date.now()
          carouselTimer = setInterval(function(){
            if (!onCarousel && Date.now() - lastCarouselTime > 4000) {
              carousel(true)
            }
          }, 1000) 
          break;
        case 2:
          typewriter($('.part-tips').eq(2),"我自横刀向天笑，去留肝胆两昆仑。——谭嗣同")
          break
        case 3:
          typewriter($('.part-tips').eq(3),"引刀成一快，不负少年头。——汪精卫")
          break
        case 4:
          typewriter($('.part-tips').eq(4),"仰天大笑出门去，我辈岂是蓬蒿人。——李白")
          break
        default:
          // statements_def
          break;
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

  // ie9 transition
  if (/MSIE 9\.0;/.test(navigator.userAgent)) {
    $('.part-anime-img').removeClass('part-anime-img-noie9')
    $('.part-anime-img').hover(function(){
      $(this).animate({marginLeft: '390px'}, 300)
    }, function(){
      $(this).animate({marginLeft: '380px'}, 300)
    })
  }

  var Animes = [
    {id: 1998799, title: '灌篮高手'},
    {id: 1463371, title: '名侦探柯南'},
    {id: 1457573, title: '新世纪福音战士'},
    {id: 5397537, title: '未闻花名'},
    {id: 2043155, title: '反叛的鲁路修'},
    {id: 3681349, title: '轻音少女 k-on!'},
    {id: 5349275, title: '魔法少女小圆'},
    {id: 4925398, title: '命运石之门'},
    {id: 24857860, title: '命运之夜 无限剑制'},
    {id: 10001418, title: '氷菓'},
  ]


  var animeSel = 1
  var animeCount = Animes.length
  var animeTime = 500
  var onCarousel = false


  //生成carousel每一个item
  for (var i = 0; i < animeCount; i++) {
    if (i == 1) {
      $('.carousel-items').append('<div class="carousel-item"><div class="carousel-item-div"></div><img src="/img/animes/id/' + Animes[i].id + '.jpg"><a href="/animes#/' + Animes[i].id + '" class="part-anime-title"  style="display: inline-block;">' + Animes[i].title + '</a>')
    } else {
      $('.carousel-items').append('<div class="carousel-item"><div class="carousel-item-div"></div><img src="/img/animes/id/' + Animes[i].id + '.jpg"><a href="/animes#/' + Animes[i].id + '" class="part-anime-title">' + Animes[i].title + '</a>')
    }
  }

  //生成carousel的slide
  for (var i = 0; i < animeCount; i++) {
    if (i == 1) {
      $('<div class="part-anime-slide part-anime-slide-in"></div>').appendTo($('.part-anime-slides'))
    } else {
      $('<div class="part-anime-slide"></div>').appendTo($('.part-anime-slides'))
    }
  }

  //slide绑定点击事件
  $('.part-anime-slide').each(function (index) {
    $(this).on('click', function (e) {
      if (!$(this).hasClass('part-anime-slide-in') && !onCarousel) {
        if (index > animeSel) {
          carousel(true, index - animeSel)
        } else {
          carousel(false, animeSel - index)
        }
      }
    })
  })


  //lefta和right按钮绑定点击事件
  $('.part-anime-left,.part-anime-left-b').on('click', function(){
    if (!onCarousel) {
      carousel(false)
    }
  })
  $('.part-anime-right,.part-anime-right-b').on('click', function () {
    if (!onCarousel) {
      carousel(true)
    }
  })


  //carousel 初始状态
  $('.carousel-item').each(function(index){
    switch (index) {
      case 0:
        $(this).css({
          width:'200px',
          height: '300px',
          top:'75px',
          left: '0px',
          zIndex: 11
        })
        $(this).children('.carousel-item-div').css({opacity: 0.5})
        break;
      case 1:
        var $title = $(this).children('.part-anime-title')
        $(this).css({
          width: '300px',
          height:'450px',
          left: '150px',
          top: '0px',
          zIndex: 12
        }).hover(function(){
          $title.animate({height: '414px', lineHeight: '780px',fontSize:'24px'},200)
        },function(){
          $title.animate({height: '24px',lineHeight: '24px',fontSize:'16px'},200)
        })
        $(this).children('.carousel-item-div').css({opacity: 0})
        break;
      case 2:
        $(this).css({
          width:'200px',
          height: '300px',
          top:'75px',
          left: '400px',
          zIndex: 11
        })
        $(this).children('.carousel-item-div').css({opacity: 0.5})
        break;
      case animeCount-1:
      case animeCount-2:
        $(this).css({
          width:'100px',
          height: '150px',
          top:'150px',
          opacity: 0,
          zIndex: 10
        })
        $(this).children('.carousel-item-div').css({opacity: 0})
        break
      default : 
        $(this).css({
          width: '100px',
          height: '150px',
          top:'150px',
          left: '500px',
          opacity: 0,
          zIndex: 10
        })
        $(this).children('.carousel-item-div').css({opacity: 0})
        break;
    }
  })



  /** 
   * @direction  {[bool]} 方向 true为右，false为左
   * @times  {[int]} 循环次数
   * @time  {[int]} 每次时间 循环时计算得，无需给出
   * @return {[undefined]}
   */
  function carousel(direction, times, time) {
    var times = times || 1
    var time = time || (animeTime+100*times - 100)/times

    if (direction == true) {
      animeSel++
    } else {
      animeSel--
    }
      onCarousel = true
      if (animeSel >= animeCount) {
        animeSel -= animeCount
      }
      if (animeSel < 0) {
        animeSel += animeCount
      }
      
    $('.part-anime-slide-in').removeClass('part-anime-slide-in')
    $('.part-anime-slide').eq(animeSel).addClass('part-anime-slide-in')

    $('.part-anime-title').css({display:'none'})

    setTimeout(function() {
      lastCarouselTime = Date.now()
      if (times > 1) {
        carousel(direction, --times, time)
      } else {
        onCarousel = false
        $('.carousel-item').eq(animeSel).find('.part-anime-title').css({display:'inline-block'})
      }
    }, time)

    $('.carousel-item').each(function(index){
      var con = index-animeSel
      if (con == -3 || con == animeCount-3 || con == -animeCount-3) {
        $(this).css({
          width:'100px',
          height: '150px',
          top:'150px',
          left:'0px',
          opacity: 0,
          zIndex: 10
        })
        $(this).children('.carousel-item-div').css({opacity: 0})
      } else if (con == -2 || con == animeCount-2 || con == -animeCount-2) {
        $(this).css({zIndex: 10}).animate({
          width:'100px',
          height: '150px',
          top:'150px',
          opacity: 0
        },time)
        $(this).children('.carousel-item-div').animate({opacity: 0,},time)
      } else if (con == -1 || con == animeCount-1 || con == -animeCount-3) {
        $(this).children('.part-anime-title').stop(true,true)
        $(this).css({zIndex: 11}).animate({
          width:'200px',
          height: '300px',
          top:'75px',
          left: '0px',
          opacity: 1
        },time).off('mouseenter mouseleave')
        $(this).children('.carousel-item-div').animate({opacity: 0.5},time)
      } else if (con == 0 || con == animeCount || con == -animeCount) {
        var $title = $(this).children('.part-anime-title')
        $(this).css({zIndex: 12}).animate({
          width: '300px',
          height:'450px',
          left: '150px',
          top: '0px'
        },time).hover(function(){
          $title.animate({height: '414px', lineHeight: '780px',fontSize:'24px'},200)
        },function(){
          $title.animate({height: '24px',lineHeight: '24px',fontSize:'16px'},200)
        })
        $(this).children('.carousel-item-div').animate({opacity: 0},time)
      } else if (con == 1 || con == animeCount+1 || con == -animeCount+1) {
        $(this).children('.part-anime-title').stop(true,true)
        $(this).css({zIndex: 11}).animate({
          width:'200px',
          height: '300px',
          top:'75px',
          left: '400px',
          opacity: 1
        },time).off('mouseenter mouseleave')
        $(this).children('.carousel-item-div').animate({opacity: 0.5},time)
      } else if (con == 2 || con == animeCount+2 || con == -animeCount+2) {
        $(this).css({zIndex: 10}).animate({
          width: '100px',
          height: '150px',
          top:'150px',
          left: '500px',
          opacity: 0
        },time)
        $(this).children('.carousel-item-div').animate({opacity: 0},time)
      } else if (con == 3 || con == animeCount+3 || con == -animeCount+3) {
        $(this).css({
          width: '100px',
          height: '150px',
          top:'150px',
          left: '500px',
          opacity: 0,
          zIndex: 10
        })
        $(this).children('.carousel-item-div').css({opacity: 0})
      }
    })
    
  }

})