
"use strict"

var _isAllowedMousewheel = true



jQuery(function($){

  // 禁止拖动
  // document.body.onmousedown = function() {
  //   return false
  // }

  function Haizai(o){
    this.bH = $('body').height()
    this.sel = 0
    this.onMove = false
    this.len = 5
    this.Img = o.Img

    this.Animes = o.Animes
    this.animeSel = 1
    this.animeCount = o.Animes.length
    this.animeTime = 500
    this.onCarousel = false
    this.CarouselStatus = o.CarouselStatus
    this.carouselTimer = null
    this.lastCarouselTime = Date.now()

    this.isStopTypewriter = false
    this.init()
  }


  Haizai.prototype = {
    init: function(){
      this.setItemHeight()
      this.setPartPosition()
      this.slideInit()
      this.carouselInit()
      this.bindEvents()
      this.moveTo(0)
      this.loadImg(0, false)
    },
    setItemHeight: function() {
      var self = this
      $('.part').each(function(){
        $(this).css({
          height:self.bH+'px'
        })
      })
    },
    setPartPosition: function() {
      var bH = this.bH
      if (bH < 670) {
        $('.part-anime-img').hide()
        $('.part-anime-warp').css({marginTop: '50px'})
        $('.part-tips-a').eq(0).hide()
      } else if(bH < 770 && bH >= 670) {
        $('.part-anime-img').hide()
        $('.part-anime-warp').css({marginTop: (bH-666)/2 + 50 + 'px'})
        $('.part-tips-a').eq(0).show()
      } else {
        $('.part-anime-img').show()
        $('.part-anime-warp').css({marginTop: (bH-750)/4 + 50 + 'px'})
      }
      $('.part-chart-warp').css({marginTop: (bH-650)/4 + 50 + 'px'})
      $('.part-demos-warp').css({marginTop: (bH-474)/4 + 50 + 'px'})
      $('.part-aboutme-warp').css({marginTop: (bH-372)/4 + 50 + 'px'})
      $('pre[class*="language-"]').css({height:(bH - 270) +'px'})
    },
    slideInit: function() {
      //出现侧栏
      for (var i = 0; i < this.len; i++) {
        $('<div class="slide-item"><span class="slide-item-text"></span><div class="slide-item-round"></div></div>').appendTo($('.slide-items'))
        switch (i) {
          case 0:
            $('.slide-item').eq(0).addClass('slide-item-in')
            $('.slide-item-text').eq(0).text('主页').css({opacity:1})
            break;
          case 1:
            $('.slide-item-text').eq(1).text('动漫')
            break
          case 2:
            $('.slide-item-text').eq(2).text('小项目')
            break
          case 3:
            $('.slide-item-text').eq(3).text('数据分析')
            break
          case 4:
            $('.slide-item-text').eq(4).text('关于我')
            break
          default:
            break
        }
      }
    },
    carouselInit: function(){
      var self = this
      //生成carousel每一个item
      for (var i = 0; i < self.animeCount; i++) {
        if (i == 1) {
          $('.carousel-items').append('<div class="carousel-item"><div class="carousel-item-div"></div><img><a href="/animes#/' + self.Animes[i].id + '" class="part-anime-title"  style="display: inline-block;">' + self.Animes[i].title + '</a>')
        } else {
          $('.carousel-items').append('<div class="carousel-item"><div class="carousel-item-div"></div><img><a href="/animes#/' + self.Animes[i].id + '" class="part-anime-title">' + self.Animes[i].title + '</a>')
        }
      }

      //生成carousel的slide
      for (var i = 0; i < self.animeCount; i++) {
        if (i == 1) {
          $('<div class="part-anime-slide part-anime-slide-in"></div>').appendTo($('.part-anime-slides'))
        } else {
          $('<div class="part-anime-slide"></div>').appendTo($('.part-anime-slides'))
        }
      }

      $('.carousel-item').each(function(index){
        switch (index) {
          case 0:
            $(this).css(self.CarouselStatus.left1).css({zIndex: 11})
            $(this).children('.carousel-item-div').css({opacity: 0.5})
            break;
          case 1:
            var $title = $(this).children('.part-anime-title')
            $(this).css(self.CarouselStatus.middle).css({zIndex: 12}).hover(function(){
              $title.animate(self.CarouselStatus.titleEnter,200)
            },function(){
              $title.animate(self.CarouselStatus.titleLeave,200)
            })
            $(this).children('.carousel-item-div').css({opacity: 0})
            break;
          case 2:
            $(this).css(self.CarouselStatus.right1).css({zIndex: 11})
            $(this).children('.carousel-item-div').css({opacity: 0.5})
            break;
          case self.animeCount-1:
          case self.animeCount-2:
            $(this).css(self.CarouselStatus.left2).css({zIndex: 10})
            $(this).children('.carousel-item-div').css({opacity: 0})
            break
          default : 
            $(this).css(self.CarouselStatus.right2).css({zIndex: 10})
            $(this).children('.carousel-item-div').css({opacity: 0})
            break;
        }
      })

    },
    loadImg: function(index, isBig) {
      var self = this
      if (index == 2 && !isBig) {
        $('.carousel-item').find('img').each(function(index){
          $(this).attr('src','/img/animes/id/'+ self.Animes[index].id + '.jpg')
        })
      }
      if (index == 3 && !isBig) {
        $('#script-box').append('<script src="js/index/prism.js"></script><script src="js/index/code.js"></script>')
      }
      if (index == 4 && !isBig) {
        $('#script-box').append('<script src="js/index/echarts.common.min.js"></script><script src="js/index/chart.js"></script>')
      }
      
      var newImg = new Image()
      newImg.src = isBig ? this.Img.bigSrcs[index] :this.Img.smallSrcs[index]
      newImg.onload = function() {
        $('.part').eq(index).css({'backgroundImage': "url('" + newImg.src + "')"})
        if (!isBig) {
          index < self.len - 1 ? self.loadImg(++index, false) : self.loadImg(0, true)
        } else {
          if (index < self.len - 1) {
            self.loadImg(++index, true)
          }
        }
      }
    },
    bindEvents: function(){
      // 滚轮滚动
      var self = this

      // 窗口大小重置 
      $(window).resize(function(e){
        if (self.bH !== $('body').height()) {
          self.bH = $('body').height()
          self.setItemHeight()
          $('body').scrollTop(self.bH*self.sel)
          self.setPartPosition()
        }
      });

      $(document).on('mousewheel',function (e) {

        if (!self.onMove && _isAllowedMousewheel) {
          if(self.sel == 0 && e.deltaY == -1) {
            self.moveTo(++self.sel)
          } else if (self.sel == self.len-1 && e.deltaY == 1) {
            self.moveTo(--self.sel)
          }else if (self.sel > 0 && self.sel < self.len-1) {
            self.sel-=e.deltaY
            self.moveTo(self.sel)
          }
        }
      })

      // 侧栏点击
      $('.slide-item-round').each(function(index){
        $(this).on('click', function() { 
          if(self.sel != index) {   
            self.sel = index
            self.moveTo(self.sel)
          }
        })
      })

      // 侧栏hover
      $('.slide-item-round').each(function(index){
        $(this).hover(function(){
          if(self.sel !== index) {
            $(this).prev().show()
          }
        }, function() {
          if(self.sel !== index) {
            $(this).prev().hide()
          }
        })
      })

      //滑块上下
      $('.slide-top').on('click', function() {
        if (self.sel > 0 && !self.onMove) {
          self.moveTo(--self.sel)
        }
      })
      $('.slide-top').hover(function(){
        $('.slide-top-text').show()
      }, function(){
        $('.slide-top-text').hide()
      })

      $('.slide-bottom').on('click', function() {
        if (self.sel < self.len-1 && !self.onMove) {
          self.moveTo(++self.sel)
        }
      })
      $('.slide-bottom').hover(function(){
        $('.slide-bottom-text').show()
      }, function(){
        $('.slide-bottom-text').hide()
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


      //slide绑定点击事件
      $('.part-anime-slide').each(function (index) {
        $(this).on('click', function (e) {
          if (!$(this).hasClass('part-anime-slide-in') && !self.onCarousel) {
            if (index > self.animeSel) {
              self.carousel(true, index - self.animeSel)
            } else {
              self.carousel(false, self.animeSel - index)
            }
          }
        })
      })


      //lefta和right按钮绑定点击事件
      $('.part-anime-left,.part-anime-left-b').on('click', function(){
        if (!self.onCarousel) {
          self.carousel(false)
        }
      })
      $('.part-anime-right,.part-anime-right-b').on('click', function () {
        if (!self.onCarousel) {
          self.carousel(true)
        }
      })


    },  
    /**
     * 汉字打字机效果
     * @param  {obj} $DOM  要插入的dom节点
     * @param  {str} text  要插入的汉字
     * @return {underfined}
     */
    typewriter:function($DOM,text) {
      var self = this
      self.isStopTypewriter = false
      $DOM.css({display:'block'})
      var len = text.length
      var finArr = text.split('')
      var arr = []
      for (var i = 0; i < len; i++) {
        arr.push('')
      }
      run(false, 0)
      function run(is_,index) {
        if (!self.isStopTypewriter) {
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
          },70)
        }
      }
    },

    /** 
     * @direction  {bool} 方向 true为右，false为左 
     * @times  {int} 循环次数
     * @time  {int} 每次时间 循环时计算得，无需给出
     * @return {undefined}
     */
    carousel: function(direction, times, time) {
      var self = this
      var times = times || 1
      var time = time || (self.animeTime+50*times - 50)/times

      var animeCount = self.animeCount

      self.onCarousel = true
      direction == true ? self.animeSel++ : self.animeSel--
      if (self.animeSel >= animeCount) {
        self.animeSel -= animeCount
      } else if (self.animeSel < 0) {
        self.animeSel += animeCount
      }
        
      $('.part-anime-slide-in').removeClass('part-anime-slide-in')
      $('.part-anime-slide').eq(self.animeSel).addClass('part-anime-slide-in')

      $('.part-anime-title').css({display:'none'})

      setTimeout(function() {
        self.lastCarouselTime = Date.now()
        if (times > 1) {
          self.carousel(direction, --times, time)
        } else {
          self.onCarousel = false
          $('.carousel-item').eq(self.animeSel).find('.part-anime-title').css({display:'inline-block'})
        }
      }, time)

      $('.carousel-item').each(function(index){
        var con = index-self.animeSel
        var $this = $(this)
        if (con == -3 || con == animeCount-3 || con == -animeCount-3) {
          $this.css(self.CarouselStatus.left2)
          $this.children('.carousel-item-div').css({opacity: 0})
        } 
        else if (con == -2 || con == animeCount-2 || con == -animeCount-2) {
          $this.css({zIndex: 10}).animate(self.CarouselStatus.left2,time)
          $this.children('.carousel-item-div').animate({opacity: 0,},time)
        } 
        else if (con == -1 || con == animeCount-1 || con == -animeCount-3) {
          $this.children('.part-anime-title').stop(true,true)
          $this.css({zIndex: 11}).animate(self.CarouselStatus.left1,time).off('mouseenter mouseleave')
          $this.children('.carousel-item-div').animate({opacity: 0.5},time)
        } 
        else if (con == 0 || con == animeCount || con == -animeCount) {
          var $title = $this.children('.part-anime-title')
          $this.css({zIndex: 12}).animate(self.CarouselStatus.middle, time).hover(function() {
            $title.animate(self.CarouselStatus.titleEnter,200)
          },function(){
            $title.animate(self.CarouselStatus.titleLeave,200)
          })
          $this.children('.carousel-item-div').animate({opacity: 0},time)
        } 
        else if (con == 1 || con == animeCount+1 || con == -animeCount+1) {
          $this.children('.part-anime-title').stop(true,true)
          $this.css({zIndex: 11}).animate(self.CarouselStatus.right1,time).off('mouseenter mouseleave')
          $this.children('.carousel-item-div').animate({opacity: 0.5},time)
        } 
        else if (con == 2 || con == animeCount+2 || con == -animeCount+2) {
          $this.css({zIndex: 10}).animate(self.CarouselStatus.right2,time)
          $this.children('.carousel-item-div').animate({opacity: 0},time)
        } 
        else if (con == 3 || con == animeCount+3 || con == -animeCount+3) {
          $this.css(self.CarouselStatus.right2)
          $this.children('.carousel-item-div').css({opacity: 0})
        }
      })
    },
    // 核心移动方法
    moveTo: function(index) {
      var self = this
      self.onMove = true
      self.isStopTypewriter = true

      var typewriter = self.typewriter.bind(self)

      $('.part-tips').css({display:'none'}).text(' ')

      $('.part-anime-warp').css({opacity: 0})
      $('.part-anime-search').css({opacity: 0}) // ie
      $('.part-demos-warp').css({opacity: 0})

      $('.part-demos-title').removeClass('a-down')
      $('.part-demos-left').children().removeClass('a-left')
      $('.part-demos-right').children().removeClass('a-right')



      $('.part-chart-warp').css({opacity: 0})
      $('.part-aboutme-warp').removeClass('bounceIn')
      
      $('.slide-item-text').hide()
      $('.slide-item-text').eq(index).show()


      $('html,body').animate({scrollTop : this.bH*index},500,function(){
        
        self.onMove = false
        self.carouselTimer = null
        

        switch (index) {
          case 0:
            typewriter($('.part-tips').eq(0),"苟利国家生死以，岂因祸福避趋之。——林则徐")
            break;
          case 1:
            typewriter($('.part-tips').eq(1),"我们所经历的每一个平凡的日常，也许就是连续发生的奇迹。——「日常」")
            $('.part-anime-warp').animate({opacity: 1}, 500, function(){
              if (!self.onCarousel) {
                self.carousel(true)
              }
            })
            $('.part-anime-search').animate({opacity: 1}, 500) // ie
            // carousel自动移动
            this.lastCarouselTime = Date.now()
            self.carouselTimer = setInterval(function(){
              if (!self.onCarousel && Date.now() - this.lastCarouselTime > 3000) {
                self.carousel(true)
              }
            }, 1000) 
            break;
          case 2:
            typewriter($('.part-tips').eq(2),"生如夏花之绚烂，死如秋叶之静美。——泰戈尔")
            $('.part-demos-warp').animate({opacity: 1}, 500)
            $('.part-demos-title').addClass('a-down')
            $('.part-demos-left').children().addClass('a-left')
            $('.part-demos-right').children().addClass('a-right')
            break
          case 3:
            typewriter($('.part-tips').eq(3),"我思故我在。——笛卡尔")
            $('.part-chart-warp').animate({opacity: 1}, 500)
            break
          case 4:
            typewriter($('.part-tips').eq(4),"誰そ彼とわれをな問ひそ、九月の露に濡れつつ君待つ我そ。——「万葉集」")
            $('.part-aboutme-warp').addClass('bounceIn')
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
  }

  var haizai = new Haizai({
    Img: {
      smallSrcs: [
        "../img/index/58955949_s.jpg",
        "../img/index/58888280_s.jpg",
        "../img/index/59547966_s.jpg",
        "../img/index/53117853_s.jpg",
        "../img/index/57171771_s.jpg"
      ],
      bigSrcs: [
        "../img/index/58955949_big.jpg",
        "../img/index/58888280_big.png",
        "../img/index/59547966_big.jpg",
        "../img/index/53117853_big.jpg",
        "../img/index/57171771_big.jpg"
      ]
    },
    Animes: [
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
    ],
    CarouselStatus: {
      left2: {
        width:'100px',
        height: '150px',
        top:'150px',
        left:'0px',
        opacity: 0,
      },
      left1: {
        width:'200px',
        height: '300px',
        top:'75px',
        left: '0px',
        opacity: 1
      },
      middle: {
        width: '300px',
        height:'450px',
        left: '150px',
        top: '0px',
        opacity: 1
      },
      right1: {
        width:'200px',
        height: '300px',
        top:'75px',
        left: '400px',
        opacity: 1
      },
      right2: {
        width: '100px',
        height: '150px',
        top:'150px',
        left: '500px',
        opacity: 0
      },
      titleLeave: {
        height: '24px',
        lineHeight: '24px',
        fontSize: '16px'
      },
      titleEnter: {
        height: '414px', 
        lineHeight: '780px',
        fontSize: '24px'
      } 
    },
  })

})