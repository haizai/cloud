"use strict"

import './scss/main.scss'

jQuery(function($){

  $.get('ajax/user/checkLogin')


  class Chart {
    constructor(o){
      this.chart = echarts.init(document.getElementById(o.id))
      this.option = o.option
      this.books = o.books
    }
    init(){
      this.chart.setOption(this.option)
      this.bindEvent()
      this.bookInit()
    }
    bookInit(){
      for (let i = 1; i < 9; i++) {
        $('#chart .rank').append('<li><div class="rank-left"><span class="rank-level">'+i+'</span></div><table class="rank-table"><tbody><tr><td style="width:140px;font-weight:bold;"></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr></tbody></table></li>')
      }
      $('#chart .rank-level:gt(2)').css({backgroundColor: '#b8c0cc'})
      $('#chart .rank li').eq(0).css({height:'90px'})

      $('#chart .rank li').each(function(){
        let $li = $(this)
        $li.hover(function(){
          $li.css({height: '90px'}).siblings().css({height: '30px'})
        },function(){
          $li.css({height: '30px'})
          $('#chart .rank li').eq(0).css({height: '90px'})
        })
      })
      this.changeBookData('玄幻')
    }
    bindEvent(){
      this.chart.on('legendselectchanged', this.legendselectchanged.bind(this))
      this.chart.on('pieselectchanged', this.pieselectchanged.bind(this))
    }
    legendselectchanged(params){
      let option = this.option
      if (!params.selected[params.name]) {
        let isSelectSelected = option.series[0].data.some( item => {
          if (item.name == params.name && item.selected == true) {
            return true
          }
        })
        if (isSelectSelected) {
          option.series[0].data.map( item => {
            item.selected = false
            return item
          })
          option.series[1].data = []
          this.chart.setOption(option)
        }
      }
    }
    pieselectchanged(params) {
      let isAllNotSelected = true
      let chart = this.chart
      let option = this.option
      for ( let type in params.selected) {
        if (params.selected[type]) {
          isAllNotSelected = false
          option.series[0].data.forEach( item =>{
            item.name == type ? item.selected = true : item.selected = false
          })
          this.changeBookData(type)
          switch (type) {
            case '玄幻':
              option.series[1].data = [
                {name: '东方玄幻',value: 2376},
                {name: '异世大陆',value: 1256},
                {name: '王朝争霸',value: 127},
                {name: '高武世界',value: 11},
              ]
              break;
            case '都市':
              option.series[1].data = [
                {name: '都市生活',value: 1479},
                {name: '异术超能',value: 1440},
                {name: '现实百态',value: 134},
                {name: '青春校园',value: 82},
                {name: '恩怨情仇',value: 33},
                {name: '爱情婚姻',value: 27},
              ]
              break;
            case '仙侠':
              option.series[1].data = [
                {name: '幻想修仙',value: 846},
                {name: '修真文明',value: 600},
                {name: '现代修真',value: 250},
                {name: '神话修真',value: 210},
                {name: '奇幻修真',value: 10},
                {name: '都市修真',value: 1},
              ]
              break;
            case '科幻':
              option.series[1].data = [
                {name: '时空穿梭',value: 688},
                {name: '末世危机',value: 411},
                {name: '未来世界',value: 257},
                {name: '进化变异',value: 189},
                {name: '星际文明',value: 107},
                {name: '超级科技',value: 87},
                {name: '宇宙练功',value: 74},
              ]
              break;
            case '历史':
              option.series[1].data = [
                {name: '架空历史',value: 506},
                {name: '两宋元明',value: 419},
                {name: '秦汉三国',value: 317},
                {name: '两晋隋唐',value: 211},
                {name: '清史民国',value: 137},
                {name: '外国历史',value: 67},
                {name: '上古先秦',value: 35},
                {name: '五代十国',value: 17},
                {name: '历史传记',value: 14},
                {name: '民间传说',value: 1},
              ]
              break;
            case '游戏':
              option.series[1].data = [
                {name: '虚拟网游',value: 600},
                {name: '游戏异界',value: 564},
                {name: '电子竞技',value: 173},
                {name: '游戏生涯',value: 143},
              ]
              break;
            case '灵异':
              option.series[1].data = [
                {name: '灵异鬼怪',value: 520},
                {name: '寻墓探险',value: 268},
                {name: '恐怖惊悚',value: 167},
                {name: '悬疑侦探',value: 49},
                {name: '风水秘术',value: 20},
              ]
              break;
            case '奇幻':
              option.series[1].data = [
                {name: '剑与魔法',value: 415},
                {name: '史诗奇幻',value: 105},
                {name: '黑暗幻想',value: 97},
                {name: '现代魔法',value: 59},
                {name: '另类幻想',value: 14},
                {name: '历史神话',value: 1},
              ]
              break;
            case '武侠':
              option.series[1].data = [
                {name: '传统武侠',value: 214},
                {name: '武侠幻想',value: 165},
                {name: '国术无双',value: 39},
              ]
              break;
            case '二次元':
              option.series[1].data = [
                {name: '衍生同人',value: 224},
                {name: '原生幻想',value: 71},
                {name: '变身入替',value: 57},
                {name: '搞笑吐槽',value: 11},
                {name: '青春日常',value: 6},
              ]
              break;
            case '职场':
              option.series[1].data = [
                {name: '娱乐明星',value: 285},
                {name: '商战职场',value: 73},
                {name: '官场沉浮',value: 7},
              ]
              break;
            case '体育':
              option.series[1].data = [
                {name: '篮球运动',value: 151},
                {name: '足球运动',value: 131},
                {name: '体育赛事',value: 49},
              ]
              break;
            case '军事':
              option.series[1].data = [
                {name: '抗战烽火',value: 90},
                {name: '战争幻想',value: 74},
                {name: '军事战争',value: 72},
                {name: '谍战特工',value: 42},
                {name: '军旅生涯',value: 38},
              ]
              break;
            case '短篇':
              option.series[1].data = [
                {name: '短篇小说',value: 85},
                {name: '儿童文学',value: 1},
                {name: '生活随笔',value: 2},
              ]
              break;
          }
          chart.setOption(option)
        }
      }
      if (isAllNotSelected) {
        option.series[0].data.map( item =>{
          item.selected = false
          return item
        })
        option.series[1].data = []
        chart.setOption(option)
      }
    }
    changeBookData(type) {
      $('#chart .title').text(type + '小说top8')
      this.books[type].forEach( (book, index) => {
        let $tds = $('#chart .rank li').eq(index).find('td')
        $tds.eq(0).text(book.title)
        $tds.eq(1).text(Math.round(book.allClickCount) + ' 万总点击')
        $tds.eq(2).text('作者 ' + book.writer)
        $tds.eq(3).text(type+ ' · ' + book.secondType)
        $tds.eq(4).text(Math.round(book.wordCount) + ' 万总字数')
        $tds.eq(5).text(Math.round(book.allCommendCount) + ' 万总推荐')
      });
    }
  }

  class Haizai {
    constructor(o) {
      this.bH = $('body').height()
      this.sel =  $('body').scrollTop()/this.bH
      this.onMove = false
      this.len = 5
      this.Img = o.Img

      this.parts = o.parts

      this.Animes = o.Animes
      this.animeSel = 1
      this.animeCount = o.Animes.length
      this.animeTime = 500
      this.onCarousel = false
      this.CarouselStatus = o.CarouselStatus
      this.carouselTimer = null
      this.lastCarouselTime = Date.now()

      this.Codes = o.Codes
      this._isAllowedMousewheel = true

      this.chart = new Chart(o.chart)

      this.isStopTypewriter = false    
      this.init()
    }
    init(){
      this.setItemHeight()
      this.slideInit()
      this.carouselInit()
      this.bindEvents()
      this.resetAll()
      this.moveTo(0)
      this.codeInit()
      this.chart.init()
      this.loadImg(0, false)
    }
    //设置高度适应
    setItemHeight() {
      let self = this
      $('.part').each(function(){
        $(this).css({
          height:self.bH+'px'
        })
      })
      let bH = this.bH
      if (bH < 670) {
        $('#anime .img').hide()
        $('#anime').css({marginTop: '50px'})
        $('.part-tips-a').eq(0).hide()
      } else if(bH < 770 && bH >= 670) {
        $('#anime .img').hide()
        $('#anime').css({marginTop: (bH-666)/2 + 50 + 'px'})
        $('.part-tips-a').eq(0).show()
      } else {
        $('#anime .img').show()
        $('#anime').css({marginTop: (bH-750)/4 + 50 + 'px'})
      }
      $('#chart').css({marginTop: (bH-650)/4 + 50 + 'px'})
      $('#index').css({paddingTop: (bH-200)/2.5 + 50 + 'px'})
      $('#aboutme').css({marginTop: (bH-372)/4 + 50 + 'px'})
      $('pre[class*="language-"]').css({height:(bH - 270) +'px'})
    }
    slideInit() {
      //出现侧栏
      for (let i = 0; i < this.len; i++) {
        $('<li class="item"><span class="item-text"></span><div class="item-round"></div></li>').appendTo($('#slide .items'))
        $('.item-text').eq(i).text(this.parts[i].title).css({opacity:1})
      }
      $('.item').eq(0).addClass('item-in')
      $('.item-text').eq(0).css({opacity:1})
    }
    carouselInit(){
      //生成carousel每一个item
      for (let i = 0; i < this.animeCount; i++) {
        i == 1 
        ? $('.carousel-items').append('<div class="carousel-item"><div class="carousel-item-div"></div><img><a href="/animes#/' + this.Animes[i].id + '" class="title"  style="display: inline-block;">' + this.Animes[i].title + '</a>')
        : $('.carousel-items').append('<div class="carousel-item"><div class="carousel-item-div"></div><img><a href="/animes#/' + this.Animes[i].id + '" class="title">' + this.Animes[i].title + '</a>')
      }

      //生成carousel的slide
      for (let i = 0; i < this.animeCount; i++) {
        i == 1 
        ? $('<div class="slide slide-in"></div>').appendTo($('#anime .slides'))
        : $('<div class="slide"></div>').appendTo($('#anime .slides'))
      }

      let self = this
      $('.carousel-item').each(function(index){
        switch (index) {
          case 0:
            $(this).css(self.CarouselStatus.left1).css({zIndex: 11})
            $(this).children('.carousel-item-div').css({opacity: 0.5})
            break;
          case 1:
            let $title = $(this).children('#anime .title')
            $(this).css(self.CarouselStatus.middle).css({zIndex: 12}).hover(
              () => $title.animate(self.CarouselStatus.titleEnter,200),
              () => $title.animate(self.CarouselStatus.titleLeave,200)
            )
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
    }
    loadImg(index, isBig) {
      let self = this
      if (index == 0 && isBig) {
        $('.carousel-item').find('img').each(function(index){
          $(this).attr('src','/img/animes/id/'+ self.Animes[index].id + '.jpg')
        })
      }
      
      let newImg = new Image()
      newImg.src = isBig ? this.parts[index].bigSrc :this.parts[index].smallSrc
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
    }
    bindEvents(){
      // 窗口大小重置 
      $(window).resize(() =>{
        if (this.bH !== $('body').height()) {
          this.bH = $('body').height()
          this.setItemHeight()
          $('body').scrollTop(this.bH*this.sel)
        }
      });

      // 滚轮滚动
      $(document).on('mousewheel', e => {
        if (!this.onMove && self._isAllowedMousewheel) {
          if(this.sel == 0 && e.deltaY == -1) {
            this.moveTo(this.sel+1)
          } else if (this.sel == this.len-1 && e.deltaY == 1) {
            this.moveTo(this.sel-1)
          } else if (this.sel > 0 && this.sel < this.len-1) {
            this.moveTo(this.sel-e.deltaY)
          }
        }
      })

      let self = this
      // 侧栏点击
      $('#slide .item-round').each(function(index){
        $(this).on('click', function() { 
          if(self.sel != index) {   
            self.moveTo(index)
          }
        })
      })

      // 侧栏hover
      $('#slide .item-round').each(function(index){
        $(this).hover( 
          () => { if(self.sel !== index) $(this).prev().show() }, 
          () => { if(self.sel !== index) $(this).prev().hide() }
        )
      })

      //滑块上下
      $('#slide .top').on('click', () => {
        if (self.sel > 0 && !self.onMove) {
          self.moveTo(self.sel-1)
        }
      })
      $('#slide .top').hover(
        () => $('#slide .top-text').show(), 
        () => $('#slide .top-text').hide()
      )

      $('#slide .bottom').on('click', () => {
        if (self.sel < self.len-1 && !self.onMove) {
          self.moveTo(self.sel+1)
        }
      })
      $('#slide .bottom').hover(
        () => $('#slide .bottom-text').show(),
        () => $('#slide .bottom-text').hide()
      )

      //anime 搜索
      $('#anime .search').on('click', () => location = location.href + 'animes#/?keyword=' + $('#anime .keyword').val().trim() +'&page=1&range=default&sort=count')
      $('#anime .keyword').on('keydown', e => {
        if (e.keyCode==13) {
          location = location.href + 'animes#/?keyword=' + $('#anime .keyword').val().trim() +'&page=1&range=default&sort=count'
        }
      })

      // ie9 transition
      if (/MSIE 9\.0;/.test(navigator.userAgent)) {
        $('#anime .img').removeClass('img-noie9')
        $('#anime .img').hover(
          () => $(this).animate({marginLeft: '390px'}, 300),
          () => $(this).animate({marginLeft: '380px'}, 300)
        )
      }

      //slide绑定点击事件
      $('#anime .slide').each(function (index) {
        $(this).on('click', e => {
          if (!$(this).hasClass('slide-in') && !self.onCarousel) {
            index > self.animeSel
            ? self.carousel(true, index - self.animeSel)
            : self.carousel(false, self.animeSel - index)
          }
        })
      })

      //left和right按钮绑定点击事件
      $('#anime .left,#anime .left-b').on('click', () => {
        if (!self.onCarousel) self.carousel(false)
      })
      $('#anime .right,#anime .right-b').on('click', () => {
        if (!self.onCarousel) self.carousel(true)
      })
    }
    /**
     * 汉字打字机效果
     * @param  {obj} $DOM  要插入的dom节点
     * @param  {str} text  要插入的汉字
     * @return {underfined}
     */
    typewriter($DOM,text) {
      this.isStopTypewriter = false
      $DOM.show()
      let len = text.length
      let finArr = text.split('')
      let arr = Array(len + 1).join(' ').split('')
      const run = (is_ ,index) => {
        if (!this.isStopTypewriter) {
          setTimeout(()=>{
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
          },50)
        }
      }
      run(false, 0)
    }
    /** 
     * @direction  {bool} 方向 true为右，false为左 
     * @times  {int} 循环次数
     * @time  {int} 每次时间 循环时计算得，无需给出
     * @return {undefined}
     */
    carousel(direction, times = 1, time = (this.animeTime+50*times - 50)/times) {

      let animeCount = this.animeCount

      this.onCarousel = true
      direction == true ? this.animeSel++ : this.animeSel--
      if (this.animeSel >= animeCount) {
        this.animeSel -= animeCount
      } else if (this.animeSel < 0) {
        this.animeSel += animeCount
      }
        
      $('#anime .slide-in').removeClass('slide-in')
      $('#anime .slide').eq(this.animeSel).addClass('slide-in')

      $('#anime .title').hide()

      setTimeout( () => {
        this.lastCarouselTime = Date.now()
        if (times > 1) {
          this.carousel(direction, --times, time)
        } else {
          this.onCarousel = false
          $('.carousel-item').eq(this.animeSel).find('#anime .title').show()
        }
      }, time)

      let self = this
      $('.carousel-item').each(function(index){
        let con = index-self.animeSel
        let $this = $(this)
        if (con == -3 || con == animeCount-3 || con == -animeCount-3) {
          $this.css(self.CarouselStatus.left2)
          $this.children('.carousel-item-div').css({opacity: 0})
        } 
        else if (con == -2 || con == animeCount-2 || con == -animeCount-2) {
          $this.css({zIndex: 10}).animate(self.CarouselStatus.left2,time)
          $this.children('.carousel-item-div').animate({opacity: 0,},time)
        } 
        else if (con == -1 || con == animeCount-1 || con == -animeCount-3) {
          $this.children('#anime .title').stop(true,true)
          $this.css({zIndex: 11}).animate(self.CarouselStatus.left1,time).off('mouseenter mouseleave')
          $this.children('.carousel-item-div').animate({opacity: 0.5},time)
        } 
        else if (con == 0 || con == animeCount || con == -animeCount) {
          let $title = $this.children('#anime .title')
          $this.css({zIndex: 12}).animate(self.CarouselStatus.middle, time).hover(
            () => $title.animate(self.CarouselStatus.titleEnter,200),
            () => $title.animate(self.CarouselStatus.titleLeave,200)
          )
          $this.children('.carousel-item-div').animate({opacity: 0},time)
        } 
        else if (con == 1 || con == animeCount+1 || con == -animeCount+1) {
          $this.children('#anime .title').stop(true,true)
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
    }
    // 移动重置
    resetOfIndex(index){
      switch (index) {
        case 0:
          $('#index .latter').children().stop(true).css({opacity: 0,transform:'scale(2)'})
          $('#index .warp').children('i').stop(true).css({opacity:0,transform:'scale(2)'})
          break
        case 1:
          this.carouselTimer = null
          $('#anime').stop(true).css({opacity: 0})
          $('#anime .search').stop(true).css({opacity: 0}) // ie
          break;
        case 2:
          $('#demos').stop(true).css({opacity: 0})
          $('#demos .title').stop(true).css({marginTop: '-50px',opacity:0})
          $('#demos .left').children().stop(true).css({marginLeft:'-200px',opacity:0})
          $('#demos .right').children().stop(true).css({marginRight:'-200px',opacity:0})
          break;
        case 3:
          $('#chart').stop(true).css({opacity: 0})
          break; 
        case 4:
          $('#aboutme').removeClass('bounceIn')
          break;           
        default:
          break;
      }
    }
    // 全部重置
    resetAll(){
      for (let i = 0; i < this.len; i++) {
        this.resetOfIndex(i)
      }
    }
    // 移动到part后的animate
    moveAnimateOfIndex(index){
      this.typewriter($('.part-tips').eq(index),this.parts[index].tips)
      switch (index) {
        case 0: 
          $('#index .warp').children('i').each(function(index){
            $(this).delay(index*100).animate({
              opacity:1,
              transform:'scale(1)'
            })
          })
          $('#index .latter').children().each(function(index) {
            $(this).delay(800+index*150).animate({
              opacity:1,
              transform:'scale(1)'
            })
          })
          break
        case 1:
          $('#anime').animate({opacity: 1}, 500, ()=>{
            if (!this.onCarousel) {
              this.carousel(true)
            }
          })
          $('#anime .search').animate({opacity: 1}, 500) // ie
          // carousel自动移动
          this.lastCarouselTime = Date.now()
          this.carouselTimer = setInterval(()=>{
            if (!this.onCarousel && Date.now() - this.lastCarouselTime > 3000) {
              this.carousel(true)
            }
          }, 1000) 
          break;
        case 2:
          $('#demos').animate({opacity: 1}, 500)
          $('#demos .left, #demos .right').children().add('#demos .title').each(function(i){
            if (i == 0){
              $(this).animate({
                marginTop:'0px',
                opacity:1
              },300)
            } else if (i<6 && i>0) {
              $(this).delay(i*100).animate({
                marginLeft:'0px',
                opacity:1
              },300)
            } else {
              $(this).delay(i*100).animate({
                marginRight:'0px',
                opacity:1
              },300)
            }
          })
          break
        case 3:
          $('#chart').animate({opacity: 1}, 500)
          break
        case 4:
          $('#aboutme').addClass('bounceIn')
          break
        default:
          break;
      }
    }
    // 核心移动方法
    moveTo(index) {
      this.resetOfIndex(this.sel)
      this.sel = index
      this.onMove = true

      $('.part-tips').hide().text(' ')
      this.isStopTypewriter = true

      $('#slide .item-text').hide()
      $('#slide .item-text').eq(index).show()
      $('#slide .item').eq(index).addClass('item-in').siblings().removeClass('item-in')

      $('html,body').animate({scrollTop : this.bH*index},500,()=>{    
        this.onMove = false
        this.moveAnimateOfIndex(index)
      })
    }
    codeInit(){
      let self = this
      $('#demos [code]').on('click', function () {
        self._isAllowedMousewheel = false
        let $code = $('#code')
        $code.show()
        $code.find('.del').on('click', () => {
          self._isAllowedMousewheel = true
          $code.hide()
        })

        let codeName = $(this).attr('code')

        $('#code .slide').html('')
        $('#code .body').html('')

        self.Codes.forEach( obj =>{
          if (obj.name === codeName) {
            $('#code .title').text(obj.title)
            $('#code .detail').parent().attr('href',obj.detail)
            $('#code .github').parent().attr('href',obj.github)

            obj.codes.forEach( (code, index) => {
              $('#code .slide').append('<li>' + code.name +'</li>')
              $('#code .body').append('<li><pre class="language-' +code.type+'" style="height: ' + (self.bH - 270) +'px"><code class="language-' +code.type+ '">'+ Prism.highlight(code.text,Prism.languages[code.type]) +'</code></pre></li>')
              if (index == 0) {
                $('#code .slide').find('li').addClass('slide-in')
                $('#code .body').find('li').show()
                $('#code .slide-span').css({
                  width:$('#code .slide').find('li').outerWidth(),
                  left: '20px'
                })
              }
            });

            if (obj.hasMore) {
              $('#code .slide').append('<li class="more"><a style="color: #333" target="_black" href="'+ obj.github +'">更多...</li>')
            }
          }
        })

        // //不同code转换
        $('#code .slide li').not('.more').each(function(index) {
          $(this).on('click', function(){
            $('#code .slide li').removeClass('slide-in')
            $(this).addClass('slide-in')
            $('#code .body li').hide()
            $('#code .body li').eq(index).show()
            let left = 20
            $('#code .slide li').eq(index).prevAll().each(function(){
              left += $(this).outerWidth()
            })
            $('#code .slide-span').animate({
              width: $('#code .slide li').eq(index).outerWidth(),
              left
            },200)
          })
        })

      })
    }
  }


  let haizai = new Haizai({
    parts:[
      {
        title:'主页',
        tips: "苟利国家生死以，岂因祸福避趋之。——林则徐",
        smallSrc: "../img/index/58955949_s.jpg",
        bigSrc: "../img/index/58955949_big.jpg",
      },{
        title:'动漫',
        tips: "我们所经历的每一个平凡的日常，也许就是连续发生的奇迹。——「日常」",
        smallSrc: "../img/index/58888280_s.jpg",
        bigSrc: "../img/index/58888280_big.png",
      },{
        title:'小项目',
        tips: "使生如夏花之绚烂，死如秋叶之静美。——泰戈尔",
        smallSrc: "../img/index/59547966_s.jpg",
        bigSrc: "../img/index/59547966_big.jpg",
      },{
        title:'数据分析',
        tips: "我思故我在。——笛卡尔",
        smallSrc: "../img/index/53117853_s.jpg",
        bigSrc: "../img/index/53117853_big.jpg",
      },{
        title:'关于我',
        tips: "誰そ彼とわれをな問ひそ、九月の露に濡れつつ君待つ我そ。——「万葉集」",
        smallSrc: "../img/index/57171771_s.jpg",
        bigSrc: "../img/index/57171771_big.jpg",
      }
    ],
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
    Codes: [
      {
        name: 'jquery-calendar',
        title: '日历（jquery）',
        detail: '/demo/jquery-calendar/calendar.html',
        github: 'https://github.com/haizai/cloud/tree/master/server/public/demo/jquery-calendar',
        codes: [{
          name: 'calendar.js',
          type: 'javascript',
          text: "function Calendar(input) {\n  this.input = input\n  this.date = new Date()\n  this.container = null\n  this.head = null\n  this.content = null\n  this.init()\n}\n\nCalendar.prototype = {\n  init: function() {\n    this.container = $('<div></div>').attr('id', 'calendar')\n    this.input.after(this.container)\n    this.head = $('<div></div>').appendTo(this.container).addClass('head')\n    $('<div></div>')\n      .addClass('middle')\n      .html('<span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>')\n      .appendTo(this.container)\n    this.content = $('<div></div').addClass('content').appendTo(this.container)\n    this.toggleDisplay()\n    this.render(this.date)\n    this.inputClick()\n  },\n  //渲染日历本身\n  render: function(date) {\n    let self = this\n    this.head.html('<span class=\"leftCreat\"></span>' + date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + '<span class=\"rightCreat\"></span>')\n    this.content.html('')\n      //上个月补全\n    let lastdate = new Date(date.getFullYear(), date.getMonth(), 0) //上个月最后一天\n    if (lastdate.getDay() !== 6)\n      for (let i = lastdate.getDate() - lastdate.getDay(); i < lastdate.getDate() + 1; i++) {\n        ($('<span></span>').addClass('last').html(i)).appendTo(self.content)\n      }\n      //本月\n    let nextdate = new Date(date.getFullYear(), date.getMonth() + 1, 0) //这个月最后一天\n    for (let i = 1; i < nextdate.getDate() + 1; i++) {\n      ($('<span></span>').html(i)).appendTo(self.content)\n    }\n    //下个月\n    for (let i = 1; i < (7 - nextdate.getDay()); i++) {\n      ($('<span></span>').addClass('next').html(i)).appendTo(self.content)\n    }\n\n    this.content\n      .children()\n      .filter(function(index) {\n        return (index % 7 === 0 || index % 7 === 6)\n      })\n      .not($('.last'))\n      .not($('.next'))\n      .addClass('side')\n      //如果是本年本月,就激活今天\n    if (this.date.getMonth() === new Date().getMonth() && this.date.getFullYear() === new Date().getFullYear()) {\n      this.dateActive(date.getDate())\n    }\n    this.click()\n  },\n  //激活某一天\n  dateActive: function(date) {\n    this.content //复原\n      .children()\n      .filter($('.active'))\n      .removeClass('active')\n    this.content\n      .children()\n      .not($('.last'))\n      .not($('.next'))\n      .filter(function() {\n        return ($(this).text() == date)\n      })\n      .addClass('active')\n    this.input.text(this.head.text() + date + '日')\n  },\n  toggleDisplay: function() {\n    this.container.toggleClass('displayNone')\n  },\n  inputClick: function() {\n    let self = this\n    this.input.click(function() {\n      self.toggleDisplay()\n    })\n  },\n  click: function() {\n    let self = this\n      //点击本月的一天,则激活那天\n    this.content\n      .children()\n      .not($('.last'))\n      .not($('.next'))\n      .click(function() {\n        self.dateActive($(this).text())\n      })\n      //点击上月的一天,则来到上月,并激活\n    this.content\n      .children()\n      .filter($('.last'))\n      .click(function() {\n        self.lastMouth()\n        self.dateActive($(this).text())\n      })\n      //点击下月的一天,则来到下月,并激活\n    this.content\n      .children()\n      .filter($('.next'))\n      .click(function() {\n        self.nextMouth()\n        self.dateActive($(this).text())\n      })\n\n    this.head.find($('.leftCreat'))\n      .click(function() {\n        self.lastMouth()\n      })\n    this.head.find($('.rightCreat'))\n      .click(function() {\n        self.nextMouth()\n      })\n  },\n  lastMouth: function() {\n    this.date.setMonth(this.date.getMonth() - 1)\n    this.render(this.date)\n  },\n  nextMouth: function() {\n    this.date.setMonth(this.date.getMonth() + 1)\n    this.render(this.date)\n  },\n}\nnew Calendar($('#input'))"
        },{
          name: 'calendar.html',
          type: 'html',
          text: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n  <title>calendar</title>\n  <link rel=\"stylesheet\" href=\"calendar.css\">\n</head>\n<body>\n  <div id=\"input\"></div>\n  <script src=\"../../js/common/jquery-3.1.1.min.js\"></script>\n  <script src=\"calendar.js\"></script>\n</body>\n</html>"
        },{
          name: 'calendar.css',
          type: 'css',
          text: "body {\n  font: 20px/2 simhei;\n}\n#input {\n  width: 310px;\n  height: 40px;\n  margin: 20px auto 10px;\n  cursor: pointer;\n  text-align: center;\n  border: 1px solid #ccc;\n}\n#calendar {\n  width: 280px;\n  margin: auto;\n  padding: 5px 15px;\n  border: 1px solid #ccc;\n}\n.displayNone {\n  display: none;\n}\n.head {\n  font-size: 22px;\n  line-height: 30px;\n  position: relative;\n  text-align: center;\n  color: #fff;\n  background: #d14141;\n}\n.leftCreat {\n  position: absolute;\n  top: 8px;\n  left: 8px;\n  cursor: pointer;\n  border-top: 8px solid transparent;\n  border-right: 12px solid #fff;\n  border-bottom: 8px solid transparent;\n}\n.rightCreat {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  cursor: pointer;\n  border-top: 8px solid transparent;\n  border-bottom: 8px solid transparent;\n  border-left: 12px solid #fff;\n}\n.middle > span,\n.content > span {\n  display: inline-block;\n  width: 40px;\n  text-align: center;\n}\n.content > span:hover {\n  cursor: pointer;\n  background: #eee;\n}\n.content > span.last,\n.content > span.next {\n  color: #ccc;\n}\n.content > span.side {\n  color: #d14141;\n}\n.content > span.active {\n  color: #fff;\n  background: #d14141;\n}"
        }]
      },
      {
        name: 'jquery-todos',
        title: 'jquery Todos',
        detail: 'demo/jquery-todos/todos.html',
        github: 'https://github.com/haizai/cloud/tree/master/server/public/demo/jquery-todos',
        codes: [{
          name: 'todos.js',
          type: 'javascript',
          text: "jQuery(function($) {\n  let NAME = 'jQuery-todos-haizai'\n  let App = {\n    init: function () {\n      this.todos = JSON.parse(window.localStorage.getItem(NAME)) || [{text: \"默认todo1\", selected: false}, {text: \"默认todo2\", selected: true}]\n      this.visibility = '全部'\n      this.bindEvents()\n      this.render()\n    },\n    bindEvents: function() {\n      $('.head')\n        .on('keydown', '.head-input', this.addTodo.bind(this))\n        .on('click', '.round', this.toggleAll.bind(this))\n      $('.body')\n        .on('mouseenter', '.body-item', this.todoDelShow.bind(this))\n        .on('mouseleave', '.body-item', this.todoDelHide.bind(this))\n        .on('click', '.body-del', this.delTodo.bind(this))\n        .on('click', '.round', this.toggle.bind(this))\n        .on('click', '.body-label', this.tryEdit.bind(this))\n        .on('blur keydown', '.body-input', this.submitEdit.bind(this))\n      $('.foot')\n        .on('click', '.foot-del', this.delSelectedTodos.bind(this))\n        .on('click', '.foot-visibility span', this.changeVisibility.bind(this))\n    },\n    render: function() {\n      window.localStorage.setItem(NAME,JSON.stringify(this.todos))\n      let self = this\n      $('.body').empty()\n      this.todos.filter(function (todo) {\n        switch (self.visibility) {\n          case '全部': return true\n          case '被选中的': return todo.selected\n          case '未被选中的': return !todo.selected\n        }\n      }).forEach(function(todo) {\n        if (todo.selected) {\n          $('.body').append('<div class=\"body-item\"><i class=\"round round-selected\"></i><div class=\"body-label body-label-selected\">'\n            + todo.text +\n            '</div><input type=\"text\" class=\"body-input\"><i class=\"body-del\" style=\"display: none\">&times;</i></div>')          \n        } else {\n          $('.body').append('<div class=\"body-item\"><i class=\"round\"></i><div class=\"body-label\">'\n            + todo.text +\n            '</div><input type=\"text\" class=\"body-input\"><i class=\"body-del\" style=\"display: none\">&times;</i></div>')\n        }\n      })\n      this.todos.length == 0 ? $('.foot').hide() : $('.foot').show()\n      $('.foot-count').text(function() {\n        return self.todos.filter(function (todo) { \n          return todo.selected \n        }).length\n      })\n    },\n    getIndex: function(el) {\n      let all = document.getElementsByClassName('body-item')\n      for (let i = 0, len = all.length; i < len; i++) {\n        if (el === all[i]) return i\n      }\n    },\n    addTodo: function(e) {\n      if (e.keyCode === 13 && e.target.value.trim() !== '') {\n        this.todos.push({text: e.target.value, selected: false})\n        this.render()\n        e.target.value = ''\n      }\n    },\n    delTodo: function(e) {\n      let index = this.getIndex(e.target.parentNode)\n      this.todos.splice(index, 1)\n      this.render()\n    },\n    toggle: function(e) {\n      let index = this.getIndex(e.target.parentNode)\n      this.todos[index].selected = !this.todos[index].selected\n      this.render()\n    },\n    toggleAll: function() {\n      this.todos.some( function(todo) { return !todo.selected } )\n        ? this.todos.forEach( function(todo) { todo.selected = true } )\n        : this.todos.forEach( function(todo) { todo.selected = false } )\n      this.render()\n    },\n    delSelectedTodos: function() {\n      this.todos = this.todos.filter( function(todo){ return !todo.selected })\n      this.render()\n    },\n    todoDelShow: function(e) {\n      $(e.target).hasClass('body-item')\n      ? $(e.target).find('.body-del').show()\n      : $(e.target).parent().find('.body-del').show()\n    },\n    todoDelHide: function(e) {\n      $(e.target).hasClass('body-item')\n      ? $(e.target).find('.body-del').hide()\n      : $(e.target).parent().find('.body-del').hide() \n    },\n    tryEdit: function (e) {\n      $(e.target).next().val($(e.target).text()).show().select().focus()\n    },\n    submitEdit: function (e) {\n      if (e.type == 'keydown') {\n        if (e.keyCode === 13) e.target.blur()\n        return\n      }\n      let index = this.getIndex(e.target.parentNode)\n      if (e.target.value.trim()) {\n        this.todos[index].text = e.target.value\n        $(e.target).hide()\n      } else {\n        this.todos.splice(index, 1)\n      }\n      this.render()\n    },\n    changeVisibility: function (e) {\n      this.visibility = $(e.target).text()\n      $(e.target).siblings().removeClass('foot-visibility-in')\n      $(e.target).addClass('foot-visibility-in')\n      this.render()\n    }\n  }\n  App.init()\n})"
        },{
          name: 'todos.html',
          type: 'html',
          text: "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"utf-8\">\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n  <title>jquery Todos</title>\n  <link rel=\"stylesheet\" href=\"todos.css\">\n</head>\n<body>\n  <div class=\"container\">\n    <div class=\"title\">\n      <p>jquery Todos</p>\n      <p class=\"author\">\n        <a href=\"https://github.com/haizai\" target=\"_black\">by Haizai</a>\n      </p>\n    </div>\n    <div class=\"head\">\n      <i class=\"round\"></i>\n      <input type=\"text\" placeholder=\"请输入新todos，按Enter确认\" class=\"head-input\" autofocus> \n    </div>\n    <div class=\"body\"></div>\n    <div class=\"foot\">\n      <i class=\"foot-del\">&times;</i>\n      <span class=\"foot-info\">\n        <span class=\"foot-count\"></span>\n        项被选中\n      </span>\n      <span class=\"foot-visibility\">\n        <span class=\"foot-visibility-in\">全部</span>\n        <span>被选中的</span>\n        <span>未被选中的</span>\n      </span>\n    </div>\n  </div>\n  <script src=\"../../js/common/jquery-3.1.1.min.js\"></script>\n  <script src=\"todos.js\"></script>\n</body>\n</html>"
        },{
          name: 'todos.css',
          type: 'css',
          text: "* {\n  box-sizing: border-box;\n}\nbody {\n  font-family: 'microsoft yahei';\n  color: #333;\n}\n.container {\n  width: 500px;\n  margin: 20px auto;\n}\n.title {\n  font-size: 40px;\n  line-height: 2;\n  text-align: center;\n}\n.author {\n  font-size: 14px;\n  line-height: 40px;\n  text-align: center;\n  margin-top: -60px;\n}\na {\n  color: #c05b4d;\n  text-decoration: none;\n}\na:hover {\n  text-decoration: underline;\n}\n.round {\n  display: inline-block;\n  width: 36px;\n  height: 36px;\n  margin-right: 8px;\n  border: 1px solid #ccc;\n  border-radius: 50%;\n}\n.round:hover {\n  background: #eee;\n}\n\n.round-selected {\n  background: #ccc;\n}\n.round:hover {\n  background: #ccc;\n}\n\ninput {\n  font-family: inherit;\n  font-size: 25px;\n  line-height: 40px;\n  width: 450px;\n  height: 40px;\n}\ni {\n  font-style: normal;\n  cursor: pointer;\n  color: #ccc;\n}\ni:hover {\n  color: #333;\n}\n\n.head .round {\n  margin-bottom: -8px;\n}\n.head-input {\n  padding-left: 3px;\n  border: 2px solid #ccc;\n}\n.head-input:focus {\n  outline: none;\n}\n\n.body-item {\n  height: 40px;\n  margin: 10px 0;\n}\n.body-item:hover {\n  background: #f5f5f5;\n}\n.body .round {\n  margin-top: 2px;\n}\n.body-label {\n  font-size: 25px;\n  line-height: 40px;\n  position: absolute;\n  display: inline-block;\n  overflow: hidden;\n  max-width: 410px;\n  margin-left: 7px;\n  cursor: pointer;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.body-label:hover {\n  color: #ccc;\n}\n\n.body-label-selected {\n  text-decoration: line-through;\n  color: #ccc;\n}\n.body-input {\n  position: absolute;\n  display: none;\n  margin-left: 4px;\n  padding-left: 3px;\n  border: none;\n}\n.body-input:focus {\n  outline: 2px solid #ccc;\n  outline-offset: -2px;\n}\n\n.body-input-show {\n  display: inline-block;\n}\n.body-del {\n  font-size: 25px;\n  line-height: 36px;\n  float: right;\n}\n\n.foot {\n  line-height: 30px;\n}\n.foot-del {\n  font-size: 25px;\n  margin-left: 7px;\n}\n.foot-info {\n  vertical-align: 8%;\n  color: #ccc;\n}\n.foot-count {\n  color: #333;\n}\n.foot-visibility {\n  float: right;\n  margin-top: 4px;\n  cursor: pointer;\n  color: #ccc;\n}\n.foot-visibility > span:hover,\n.foot-visibility-in {\n  color: #333;\n}\n"
        }]
      },
      {
        name:'react-todos',
        title: 'React Todos',
        detail: 'demo/react-todos/index.html',
        github: 'https://github.com/haizai/cloud/tree/master/server/public/demo/react-todos',
        hasMore: true,
        codes: [{
          name:'main.js',
          type:'jsx',
          text:"import ReactDOM from 'react-dom';\nimport React from 'react';\nimport App from './components/App.jsx';\nimport './todos.css';\n\nReactDOM.render(\n  <App/>,\n  document.getElementById('app')\n)"
        },{
          name: 'components/App.jsx',
          type: 'jsx',
          text: "import React from 'react';\n\nimport Title from './Title.jsx';\nimport Head from './Head.jsx';\nimport Body from './Body.jsx';\nimport Foot from './Foot.jsx';\n\nconst NAME = 'react-todos-Haizai^0.1';\n\nexport default class App extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = JSON.parse(window.localStorage.getItem(NAME)) || {\n      todos: [{text: \"默认todo1\", selected: false, key: 0}, {text: \"默认todo2\", selected: true, key: 1}],\n      visibility: '全部',\n      allKey: 1\n    };\n  }\n  componentDidUpdate(prevProps, prevState) {\n    window.localStorage.setItem(NAME, JSON.stringify(prevState));\n  }\n  addTodo(e) {\n    if (e.keyCode === 13 && e.target.value.trim() !== '') {\n      this.state.todos.push({\n        text: e.target.value,\n        selected: false,\n        key: ++this.state.allKey\n      });\n      e.target.value = '';\n      this.forceUpdate();\n    };\n  }\n  toggleAll() {\n    this.state.todos.every( todo => todo.selected )\n      ? this.state.todos.forEach( todo => todo.selected = false )\n      : this.state.todos.forEach( todo => todo.selected = true );\n    this.forceUpdate();\n  }\n  delTodo(index) {\n    this.state.todos.splice(index, 1);\n    this.forceUpdate();\n  }\n  toggle(index) {\n    this.state.todos[index].selected = !this.state.todos[index].selected;\n    this.forceUpdate();\n  }\n  tryEdit(e) {\n    let input = e.target.nextSibling;\n    input.value = e.target.innerHTML;\n    input.style.display = 'inline-block';\n    input.select();\n    input.focus();\n  }\n  submitEdit(e, index) {\n    if (e.type == 'keydown') {\n      if (e.keyCode === 13) e.target.blur();\n      return;\n    };\n    if (e.target.value.trim()) {\n      this.state.todos[index].text = e.target.value;\n      e.target.style.display = 'none';\n    } else {\n      this.state.todos.splice(index, 1);\n    };\n    this.forceUpdate();\n  }\n  delSelectedTodos() {\n    this.setState({todos: this.state.todos.filter( todo => !todo.selected )});\n  }\n  changeVisibility(e) {\n    this.setState({visibility: e.target.textContent.trim()});\n  }\n  render() {\n    let isAllSelected = ( this.state.todos.length && this.state.todos.every( todo => todo.selected ) ) ? true : false,\n      selectedCount   = this.state.todos.filter( todo => todo.selected ).length,\n      footStyle       = this.state.todos.length === 0 ? 'none' : 'block',\n      visibilityTodos = this.state.todos.filter( todo => {\n        switch (this.state.visibility) {\n          case '全部'       : return true;\n          case '被选中的'   : return todo.selected;\n          case '未被选中的' : return !todo.selected;\n        };\n      });\n    const bodyMethods = {}\n    return (\n      <div className='container'>\n        <Title />\n        <Head \n          isAllSelected={isAllSelected}\n          addTodo={this.addTodo.bind(this)}\n          toggleAll={this.toggleAll.bind(this)}\n        />      \n        <Body\n          todos={visibilityTodos}\n          delTodo={this.delTodo.bind(this)}\n          toggle={this.toggle.bind(this)}\n          tryEdit={this.tryEdit.bind(this)}\n          submitEdit={this.submitEdit.bind(this)}\n        />   \n        <Foot\n          footStyle={footStyle}\n          selectedCount={selectedCount}\n          visibility={this.state.visibility}\n          delSelectedTodos={this.delSelectedTodos.bind(this)}\n          changeVisibility={this.changeVisibility.bind(this)}\n        />\n      </div>\n    );\n  }\n};"
        },{
          name: './Title.jsx',
          type: 'jsx',
          text: "import React from 'react';\n\nexport default class Title extends React.Component {\n  render() {\n    return (\n      <div className='title'>\n        <p>React Todos</p>\n        <p className=\"author\"><a href=\"https://github.com/haizai\" target=\"_black\">By Haizai</a></p>\n      </div>\n    )\n  }\n}"
        },{
          name: './Head.jsx',
          type: 'jsx',
          text: "import React from 'react';\n\nexport default class Head extends React.Component {\n  render() {\n    const {isAllSelected, toggleAll, addTodo} = this.props,\n      roundClass = isAllSelected ? 'round round-selected' : 'round';\n    return (\n      <div className='head'>\n        <i className={roundClass} onClick={toggleAll}/>\n        <input \n          className='head-input'\n          type='text' \n          placeholder='请输入新的todo，按Enter确认'\n          onKeyDown={addTodo}\n        />\n      </div>\n    )\n  }\n}"
        },{
          name: './Body.jsx',
          type: 'jsx',
          text: "import React from 'react';\nimport ReactCSSTransitionGroup from 'react-addons-css-transition-group';\n\nimport Todo from './Todo.jsx'\n\nexport default class Body extends React.Component {\n  render() {\n    const {todos,...methods} = this.props;\n    return (\n      <div className='body'>\n      <ReactCSSTransitionGroup \n        transitionName=\"fade\"\n        transitionEnterTimeout={300} \n        transitionLeaveTimeout={300}>      \n      {\n        todos.map((todo, index)=>{\n          return (\n              <Todo\n                methods={methods}\n                index={index}\n                text={todo.text} \n                selected={todo.selected}\n                key={todo.key}\n              />\n          )\n        })\n      }\n      </ReactCSSTransitionGroup>\n      </div>\n    )\n  }\n}"
        },{
          name: './Todo.jsx',
          type: 'jsx',
          text: "import React from 'react';\n\nexport default class Todo extends React.Component {\n   constructor(props) {\n    super(props);\n    this.state = {\n      delShow: 'none'\n    };\n  } \n  todoDelShow() {\n    this.setState({delShow: 'block'});\n  }\n  todoDelHide() {\n    this.setState({delShow: 'none'}); \n  }\n  render() {\n    const {index, selected, text, methods} = this.props,\n      {delTodo, submitEdit, toggle, tryEdit} = methods,\n      roundClass = selected ? 'round round-selected' : 'round',\n      labelClass = selected ? 'body-label body-label-selected' : 'body-label';\n    return (\n      <div \n        className='body-item' \n        onMouseEnter={this.todoDelShow.bind(this)}\n        onMouseMove={this.todoDelShow.bind(this)}\n        onMouseLeave={this.todoDelHide.bind(this)}>\n        <i \n          className={roundClass}\n          onClick={()=>toggle(index)}\n        />\n        <div \n          className={labelClass}\n          onClick={tryEdit}\n        >{text}</div>\n        <input \n          type='text' \n          className='body-input' \n          style={{display: 'none'}}\n          onKeyDown={e=>submitEdit(e, index)}\n          onBlur={e=>submitEdit(e, index)}\n        />\n        <i \n          className='body-del' \n          style={{display: this.state.delShow}}\n          onClick={()=>delTodo(index)}\n        >&times;</i>\n      </div>\n    )\n  }\n};"
        },{
          name: './Foot.jsx',
          type: 'jsx',
          text: "import React from 'react';\n\nexport default class Foot extends React.Component {\n  render() {\n    const {footStyle, delSelectedTodos, selectedCount, visibility, changeVisibility} = this.props,\n      viss = ['全部', '被选中的', '未被选中的'];\n    return (\n      <div className='foot' style={{display: footStyle}}>\n        <i className='foot-del' onClick={delSelectedTodos}>&times;</i>\n        <span className='foot-info'> <span className='foot-count'>{selectedCount}</span> 项被选中</span>\n        <span className='foot-visibility'>\n        {\n          viss.map( vis=>{\n            let className = vis == visibility ? 'foot-visibility-in' : null;\n            return (\n              <span className={className} onClick={changeVisibility} key={vis}>\n                {vis}&nbsp;\n              </span>\n            );\n          })\n        }\n        </span>\n      </div>\n    )\n  }\n}"
        }]
      },
      {
        name:'redux-todos',
        title:'Redux Todos（react）',
        detail:'demo/redux-todos/index.html',
        github: 'https://github.com/haizai/cloud/tree/master/server/public/demo/redux-todos',
        hasMore: true,
        codes: [{
          name:'main.js',
          type:'javascript',
          text:"import ReactDOM from 'react-dom';\nimport React from 'react';\nimport { createStore } from 'redux';\nimport { Provider } from 'react-redux';\n\nimport App from './containers/App';\nimport reducer from './reducers/index';\nimport './todos.css';\n\nconst store = createStore(reducer);\n\nReactDOM.render(\n  <Provider store={store}>\n    <App/>\n  </Provider>,\n  document.getElementById('app')\n)"
        },{
          name:'containers/App.js',
          type:'javascript',
          text:"import React from 'react';\nimport { bindActionCreators } from 'redux';\nimport { connect } from 'react-redux';\n\nimport * as action from '../action/action';\nimport App from '../components/App.jsx';\nimport NAME from '../NAME';\n\nfunction mapStateToProps(state) {\n  window.localStorage.setItem(NAME, JSON.stringify(state));\n  return state;\n}\n\nfunction mapDispatchToProps(dispatch) {\n  return bindActionCreators({ ...action }, dispatch);\n}\n\nexport default connect(\n  mapStateToProps,\n  mapDispatchToProps\n)(App)"
        },{
          name:'action/action.js',
          type:'javascript',
          text:"export const addTodo          = text => ({type: 'ADD_TODO', text});\nexport const delTodo          = index => ({type: 'DEL_TODO', index});\nexport const toggle           = index => ({type: 'TOGGLE', index});\nexport const toggleAll        = () => ({type: 'TOGGLE_ALL'});\nexport const submitEdit       = (text, index) => ({type: 'SUBMIT_EDIT', text, index});\nexport const delSelectedTodos = () => ({type: 'DEL_SELECTED_TODOS'});\nexport const changeVisibility = visibility => ({type: 'CHANGE_VISIBILITY', visibility});"
        },{
          name:'reducers/index.js',
          type:'javascript',
          text:"import { combineReducers } from 'redux';\nimport todos from './todos';\nimport visibility from './visibility';\n\nexport default combineReducers({\n  todos,\n  visibility\n})"
        },{
          name:'./todos.js',
          type:'javascript',
          text:"import NAME from '../NAME';\n\nconst initTodos = window.localStorage.getItem(NAME) \n  ? JSON.parse(window.localStorage.getItem(NAME)).todos\n  : [{text: \"默认todo1\", selected: false, key: 0}, {text: \"默认todo2\", selected: true, key: 1}];\n\nlet key = initTodos.reduce((a, b) => {\n  if (typeof a == 'object') a = a.key;\n  if (typeof b == 'object') b = b.key;\n  return Math.max(a, b);\n})\n\nexport default (todos = initTodos, action) => {\n  switch (action.type) {\n    case 'ADD_TODO':\n      return [...todos, {text: action.text, selected: false, key: ++key}];\n    case 'DEL_TODO':\n      todos.splice(action.index, 1)\n      return [...todos];\n    case 'TOGGLE':\n      todos[action.index].selected = !todos[action.index].selected;\n      return [...todos];\n    case 'TOGGLE_ALL':\n      todos.every( todo => todo.selected )\n      ? todos.forEach( todo => todo.selected = false )\n      : todos.forEach( todo => todo.selected = true );\n      return [...todos];\n    case 'SUBMIT_EDIT':\n      todos[action.index].text = action.text;\n      return [...todos];\n    case 'DEL_SELECTED_TODOS':\n      return todos.filter( todo => !todo.selected );\n    default:\n      return todos;\n  }\n}"
        },{
          name:'./visibility.js',
          type:'javascript',
          text:"import NAME from '../NAME';\n\nconst initVisibility = window.localStorage.getItem(NAME) \n  ? JSON.parse(window.localStorage.getItem(NAME)).visibility\n  : '全部';\n\nexport default (visibility = initVisibility, action) => {\n  switch (action.type) {\n    case 'CHANGE_VISIBILITY':\n      return action.visibility;\n    default:\n      return visibility;\n  }\n}"
        },]
      },
      {
        name:'weather',
        title:'天气预报(jquery + vue)',
        detail: 'demo/weather/weather.html',
        github: 'https://github.com/haizai/cloud/tree/master/server/public/demo/weather',
        codes: [{
          name:'build.js',
          type:'javascript',
          text:"Vue.transition('container', {\n  afterLeave: function(el) {\n    appVue.isTran = true\n    console.log('Transition ending. ')\n      //若过渡结束时,ajax已返回,$set data为newData,并v-show: true\n    if (appVue.isAjax) {\n      appVue.$set('data', appVue.newData)\n      appVue.isShow = true\n      document.activeElement.blur()\n      appVue.isTran = false\n      appVue.isAjax = false\n    }\n  }\n})\n\nlet appVue = new Vue({\n  created: function() { //初始化，发送ajax设置data\n    this.getAjax()\n  },\n  el: '#app',\n  data: {\n    allCity: allCityData,\n    cityInput: '切换城市',\n    isShow: true,\n    isAjax: false,\n    isTran: false\n  },\n  computed: {\n    //根据天气设置背景色\n    topBackground: function() {\n      if (this.data.now.cond.code[0] == 1) {\n        return '#70b8e3'\n      } else {\n        return '#a1b4b8'\n      }\n    }\n  },\n  methods: {\n    getAjax: function(x) {\n      //初始化时不传入参数\n      if (!x) {\n        $.ajax({\n          //获得ip\n          type: \"GET\",\n          url: 'https://pv.sohu.com/cityjson', // 必须使用https协议\n          dataType: 'script',\n          success: function() {\n            console.log('my-ip: ', returnCitySN.cip)\n            $.ajax({\n              //获得ip对应的城市名\n              type: 'GET',\n              url: 'https://apis.baidu.com/showapi_open_bus/ip/ip',\n              data: {\n                ip: returnCitySN.cip\n              },\n              headers: {\n                apikey: 'ace4c062b938e16663ff786b61323c75'\n              },\n              success: function(msg) {\n                console.log('my-city: ', msg)\n                  // 若返回了city且存在于allCityData中，\n                if (msg.showapi_res_body.city && allCityData.some(function(item) {\n                    return item === msg.showapi_res_body.city\n                  })) {\n                  changeCityAjax(msg.showapi_res_body.city, true)\n                } else {\n                  changeCityAjax('北京', true)\n                }\n              },\n              error: function() {\n                changeCityAjax('北京', true)\n              }\n            })\n          },\n          error: function() {\n            changeCityAjax('北京', true)\n          }\n        })\n      } else {\n        changeCityAjax(x)\n      }\n      // 发送ajax 改变city\n      function changeCityAjax(cityAjax, isFirst) {\n        let api = null\n        $.ajax({\n          //http://www.heweather.com/documents/api\n          type: 'GET',\n          url: 'https://api.heweather.com/x3/weather',\n          data: {\n            city: cityAjax,\n            key: '980022d93f2a4b8c8c02cdb3126ce910'\n          },\n          success: function(api) {\n            if (isFirst) {\n              appVue.$set('data', api['HeWeather data service 3.0'][0])\n              return\n            }\n            appVue.isAjax = true\n              //若ajax返回时过渡完成，直接$set data，并v-show: true\n              //否则$set newData，等待Vue.transition的afterLeave事件。\n            if (appVue.isTran) {\n              appVue.$set('data', api['HeWeather data service 3.0'][0])\n              appVue.isShow = true\n              document.activeElement.blur()\n              appVue.isTran = false\n              appVue.isAjax = false\n            } else {\n              appVue.$set('newData', api['HeWeather data service 3.0'][0])\n            }\n            console.log('Ajax return. ')\n          }\n        })\n      }\n    },\n\n    clearCityInput: function() {\n      this.cityInput = ''\n    },\n    // 重置Input输入框，不能用blur()，不然点击浮出框时也触发事件！\n    resetCityInput: function(e) {\n      if (e.target.className !== 'city-input' && e.target.className !== 'city-search-item')\n        this.cityInput = '切换城市'\n    },\n    //点击浮出框的城市\n    changeCity: function(city) {\n      this.cityInput = '切换城市'\n      this.isShow = false\n      this.getAjax(city)\n    },\n    //输入框按enter\n    getCityInput: function(cityInput) {\n      let isFond = false\n      let str = null\n      this.allCity.forEach(function(item) {\n        if (item === cityInput) {\n          isFond = true\n          str = '切换城市'\n        }\n      })\n      if (str) {\n        this.cityInput = '切换城市'\n        this.isShow = false\n        this.getAjax(cityInput)\n      }\n      if (!isFond) {\n        alert('未找到所查城市')\n      }\n    }\n  },\n  filters: {\n    dateHour: function(date) {\n      return date.split(' ')[1]\n    },\n    // 后几天的日期\n    indexToWeekDay: function(index) {\n      if (index === 0) {\n        return '今天'\n      } else if (index === 1) {\n        return '明天'\n      } else {\n        let num = new Date().getDay() + index\n        switch (num) {\n          case 2:\n          case 9:\n            return \"周二\";\n          case 3:\n          case 10:\n            return \"周三\";\n          case 4:\n          case 11:\n            return \"周四\";\n          case 5:\n          case 12:\n            return \"周五\";\n          case 6:\n            return \"周六\";\n          case 7:\n            return \"周日\";\n          case 8:\n            return \"周一\";\n          default:\n            return \"未知\";\n        }\n      }\n    },\n    popToicon: function(num) {\n      let i = null\n      if (num > 50) {\n        i = 306\n      } else {\n        i = 102\n      }\n      return {\n        'background-image': 'url(png/' + i + '.png)'\n      }\n    },\n    //根据input过滤所有城市\n    searchCity: function(allCity, input, nowCity) {\n      if (input.trim()) {\n        let arr = []\n        let reg = new RegExp(input, \"g\")\n        allCity.forEach(function(city) {\n          if (reg.test(city) && city !== nowCity) {\n            arr.push(city)\n          }\n        })\n        return arr\n      }\n    }\n  }\n})"
        },{
          name:'weather.html',
          type:'html',
          text:"<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no\"/>\n  <title>天气预报</title>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n<div id=\"app\">\n  <div class=\"container\" @click=\"resetCityInput($event)\" v-show=\"isShow\" transition=\"container\">\n\n    <div class=\"top\" :style=\"{'background':topBackground}\">\n      <div class=\"head\">\n        <p class=\"city-name\" v-text=\"data.basic.city\"></p>\n        <div class=\"city-search\">\n          <input \n          type=\"text\" \n          class=\"city-input\" \n          v-model=\"cityInput\" \n          @focus=\"clearCityInput()\" \n          @keydown.enter.prevent=\"getCityInput(cityInput)\">\n          <div \n          class=\"city-search-box\" \n          v-show=\"allCity | searchCity cityInput data.basic.city \">\n            <div \n            class=\"city-search-item\" \n            v-for=\"city in allCity | searchCity cityInput data.basic.city\" \n            track-by=\"$index\" \n            v-text=\"city\" \n            @click=\"changeCity(city)\"></div>\n          </div>        \n        </div>\n\n        <p class=\"now-cond\">\n          <span style=\"vertical-align: 30%\" v-text=\"data.now.cond.txt\"></span>\n          <i style=\"position:absolute\" :style=\"{'background-image':'url(png/'+data.now.cond.code+'.png)'}\"></i>\n        </p>\n        <p class=\"now-tmp\">\n          <span v-text=\"data.now.tmp\"></span><!--  惊了! 辣鸡ie专用注释\n       --><span class=\"now-tmp-after\" v-text=\"'°'\"></span>\n        </p>\n      </div>\n\n      <div class=\"hourly\">\n        <div class=\"hourly-item\" v-for=\"item in data.hourly_forecast\">\n          <p v-text=\"item.date | dateHour\"></p>\n          <p>\n            <span style=\"vertical-align: 20%\" class=\"hourly-pop\" v-text=\"item.pop +'%'\"></span>\n            <i style=\"position:absolute\" :style=\"item.pop|popToicon\"></i>\n          </p>\n          <p class=\"hourly-tmp\" v-text=\"item.tmp+'°'\"></p>\n        </div>\n      </div>    \n    </div>\n    \n    <div class=\"daily\">\n      <div class=\"daily-item\" v-for=\"(index,day) in data.daily_forecast\">\n        <p class=\"daily-date\" v-text=\"index|indexToWeekDay\"></p>\n        <p>\n          <i :style=\"{'background-image':'url(png/'+day.cond.code_d+'.png)'}\" :title=\"day.cond.txt_d\"></i>\n          <i :style=\"{'background-image':'url(png/'+day.cond.code_n+'.png)'}\" :title=\"day.cond.txt_n\"></i>\n        <p>\n        <p v-text=\"day.tmp.min+'°/'+day.tmp.max+'°'\"></p>\n      </div>\n    </div>\n\n  </div>\n</div>\n\n  <script src=\"allCityData.js\"></script>\n  <script src=\"../../js/common/jquery-3.1.1.min.js\"></script>\n  <script src=\"vue.min.js\"></script>\n  <script src=\"build.js\"></script>\n</body>\n</html>"
        },{
          name:'style.css',
          type:'css',
          text:".container-transition {\n  transition: all .3s;\n}\n.container-leave,\n.container-enter {\n  transform: translate(-100%, 0);\n opacity: 0;\n}\n\n* {\n  margin: 0;\n  padding: 0;\n}\n#app {\n  font-family: 'microsoft yahei';\n}\ni {\n  display: inline-block;\n width: 25px;\n  height: 25px;\n background-size: 25px 25px;\n}\n.top {\n  width: 100%;\n  padding: 70px 0 40px;\n}\n\n.head {\n  width: 700px;\n  margin: 0 auto;\n text-align: center;\n color: #fff;\n}\n.head .city-name {\n  font-size: 30px;\n  line-height: 1.4;\n}\n.head .now-cond {\n  line-height: 25px;\n}\n.head .now-tmp {\n  font-family: simhei;\n  font-size: 140px;\n  line-height: .9;\n}\n.head .now-tmp-after {\n  font-size: 60px;\n position: absolute;\n}\n\n.city-search {\n  width: 150px;\n  margin: 0 auto;\n}\n.city-input {\n  width: 100%;\n cursor: pointer;\n  text-align: center;\n color: #ddd;\n  border: none;\n  background-color: inherit;\n}\n.city-search-box {\n  position: absolute;\n  z-index: 1;\n overflow: auto;\n width: 150px;\n  max-height: 220px;\n color: #666;\n  border-radius: 3px;\n  background: #fff;\n  box-shadow: 0 0 3px 0 #999;\n}\n.city-search-item {\n  line-height: 1.5;\n cursor: pointer;\n}\n.city-search-item:hover {\n  background: #ddd;\n}\n\n.hourly {\n  line-height: 1.5;\n display: flex;\n width: 700px;\n  margin: 70px auto 0;\n color: #fff;\n}\n.hourly-item {\n  display: inline-block;\n text-align: center;\n flex: 1;\n}\n.hourly-tmp {\n  font-size: 22px;\n  line-height: 1;\n}\n\n.daily {\n  line-height: 1.5;\n display: flex;\n width: 800px;\n  margin: 40px auto 0;\n justify-content: center;\n  flex-wrap: wrap;\n}\n.daily-item {\n  display: inline-block;\n min-width: 105px;\n  margin-top: 20px;\n text-align: center;\n flex: 1;\n}\n.daily-date {\n  line-height: 2;\n}\n\n@media screen and (max-width: 800px) {\n  .head,\n  .daily,\n  .hourly {\n    font-size: 12px;\n   width: 100%;\n  }\n  .daily {\n    flex-wrap: wrap;\n  }\n  .city-search-item,\n  .now-cond {\n    font-size: 16px;\n  }\n  .hourly i {\n    display: none;\n  }\n  .hourly .hourly-tmp {\n    font-size: 18px;\n  }\n  i {\n    display: inline-block;\n   width: 20px;\n    height: 20px;\n   background-size: 20px 20px;\n  }\n}"
        }]
      },
      {
        name:'vuex-todos',
        title:'Vuex Todos（vue）',
        detail: 'demo/vuex-todos/index.html',
        github: 'https://github.com/haizai/cloud/tree/master/server/public/demo/vuex-todos',
        hasMore: true,
        codes: [{
          name:"main.js",
          type:'javascript',
          text:"import Vue from 'vue'\nimport App from './App.vue'\nimport './css/todos.css'\n\nnew Vue({\n  el: '#app',\n  components: {\n    App\n  }\n})"
        },{
          name:'App.vue',
          type:'html',
          text:"<template>\n  <div class=\"container\">\n    <div class=\"title\">\n      <p>Vuex Todos</p>\n      <p class=\"author\">\n        <a href=\"https://github.com/haizai\" target=\"_black\">By Haizai</a>\n      </p>\n    </div>\n    <todos></todos> \n  </div>\n</template>\n\n<script>\n  import store from './vuex/store'\n  import todos from './components/todos.vue'\n  export default {\n    components:{\n      todos\n    },\n    store\n  }\n</script>"
        },{
          name:'vuex/store.js',
          type:'javascript',
          text:"import Vue from 'vue'\nimport Vuex from 'vuex'\n\nVue.use(Vuex)\n\nconst NAME = 'todo-vuex-haizai'\n\n//若localStorage有此值则取出\nconst state = JSON.parse( window.localStorage.getItem(NAME) ) || {\n  todos: [{text: \"默认todo1\", selected: false}, {text: \"默认todo2\", selected: true}],\n  visibility: \"all\"\n}\n\nconst mutations = {\n  //增加todo\n  ADD_TODO (state, text) {\n    state.todos.push({\n      text,\n      selected: false\n    })\n  },\n  //删除todos\n  DEL_TODO (state, index) {\n    state.todos.splice(index, 1)\n  },\n  //切换选中\n  TOGGLE (state, index) {\n    state.todos[index].selected = !state.todos[index].selected\n  },\n  //删除选中的todos\n  DEL_SELECTED_TODOS (state) {\n    state.todos = state.todos.filter( todo => !todo.selected )\n  },\n  //改变visibility\n  CHANGE_VISIBILITY (state, visibility) {\n    state.visibility = visibility\n  },\n  //全选或解除全选\n  TOGGLE_ALL (state) {\n    state.todos.some( todo => !todo.selected)\n      ? state.todos.forEach( todo => todo.selected = true)\n      : state.todos.forEach( todo => todo.selected = false)\n  },\n  //修改todo的文本\n  CHANGE_TEXT (state, index, text) {\n    state.todos[index].text = text\n  }\n}\n\nconst store = new Vuex.Store({\n  state,\n  mutations  \n})\n\n//观测state,将其json化存在localStorage中\nstore.watch( (state) => window.localStorage.setItem( NAME, JSON.stringify(state) ) )\n\nexport default store"
        },{
          name:'./action.js',
          type:'javascript',
          text:"export const addTodo = makeAction ('ADD_TODO')\nexport const delTodo = makeAction ('DEL_TODO')\nexport const toggle = makeAction ('TOGGLE')\nexport const delSelectedTodos = makeAction ('DEL_SELECTED_TODOS')\nexport const changeVisibility = makeAction ('CHANGE_VISIBILITY')\nexport const toggleAll = makeAction ('TOGGLE_ALL')\nexport const changeText = makeAction ('CHANGE_TEXT')\n\nfunction makeAction (type) {\n  return ({ dispatch }, ...args) => dispatch(type, ...args)\n}"
        },{
          name:'components/todos.vue',
          type:'html',
          text:"<template>\n  <div class=\"head\">\n    <i \n      class=\"round\" \n      :class=\"{'round-selected':isAllSelect}\"\n      @click=\"toggleAll\"></i>\n    <input \n      type=\"text\" \n      class=\"head-input\" \n      placeholder=\"输入新的todo，按Enter确认\"\n      autofocus\n      @keydown.enter=\"tryAddTodo\">\n  </div>\n  <div class=\"body\">\n    <todo v-for=\"(index, todo) in todosByVisibility\" :todo=\"todo\" :index=\"index\"></todo>  \n  </div>\n  <foot v-show=\"todos.length\"></foot>  \n</template>\n\n<script>\n  import { addTodo, toggleAll } from '../vuex/actions'\n  import todo from './todo.vue'\n  import foot from './foot.vue'\n  export default{\n    vuex: {\n      getters: {\n        todos: state => state.todos,\n        visibility: state => state.visibility\n      },\n      actions: {\n        addTodo,\n        toggleAll\n      }\n    },\n    computed: {\n      todosByVisibility () {\n        return this.todos.filter( todo => {\n          switch (this.visibility) {\n            case 'all':\n              return true\n            case 'selected':\n              return todo.selected\n            case 'unselected':\n              return !todo.selected\n          }\n        })\n      },\n      isAllSelect () {\n        return this.todos.length > 0 && this.todos.every( todo => todo.selected )\n      }\n    },\n    methods: {\n      tryAddTodo (e) {\n        if (e.target.value.trim()) {\n          this.addTodo(e.target.value.trim())\n          e.target.value = ''\n        }\n      }\n    },\n    components: {\n      todo,\n      foot\n    }\n  }\n</script>"
        },{
          name:'./todo.vue',
          type:'html',
          text:"<template>\n  <div \n      class=\"body-item\"\n      transition=\"fade\"\n      @mouseenter=\"toggleMouseEnter(true)\"\n      @mouseleave=\"toggleMouseEnter(false)\">\n    <i \n      class=\"round\" \n      :class=\"{'round-selected':todo.selected}\" \n      @click=\"toggle(index)\"></i>\n    <div \n      class=\"body-label\"\n      :class=\"{'body-label-selected':todo.selected}\"\n      @click=\"tryEdit\">{{todo.text}}</div>\n    <input \n      type=\"text\" \n      class=\"body-input\"\n      :class=\"{'body-input-show':isInputShow}\"\n      @keydown.enter=\"submitEdit\"\n      @blur=\"submitEdit\">\n    <i \n      class=\"body-del\" \n      v-show=\"isMouseEnter\"\n      @click=\"delTodo(index)\">&times;</i>\n  </div>\n</template>\n\n<script>\n  import { delTodo, toggle, changeText } from '../vuex/actions'\n  export default {\n    props: ['todo', 'index'],\n    data() { return {\n      isMouseEnter: false,\n      isInputShow: false\n    }},\n    vuex: {\n      getters: {\n        todos: state => state.todos\n      },\n      actions: {\n        delTodo, \n        toggle,\n        changeText\n      }\n    },\n    methods: {\n      toggleMouseEnter (bool) {\n        this.isMouseEnter = bool\n      },\n      tryEdit (e) {\n        this.isInputShow = true\n        this.$nextTick(() => {\n          let input = e.target.nextElementSibling\n          input.value = this.todo.text\n          input.focus()\n          input.select()\n        })\n      },\n      submitEdit (e) {\n        if (e.target.value.trim()) {\n          this.changeText(this.index, e.target.value.trim())\n          this.isInputShow = false\n        } else {\n          this.delTodo(this.index)\n        }\n      }\n    }\n  }\n</script>\n"
        },{
          name:'./foot.vue',
          type:'html',
          text:"<template>\n  <div class=\"foot\">\n    <i class=\"foot-del\" @click=\"delSelectedTodos\">&times; </i>\n    <span class=\"foot-info\">\n      <span class=\"foot-count\">{{selectedLength}}</span> 项被选中\n    </span>\n    <span class=\"foot-visibility\">\n      <span :class=\"{'foot-visibility-in': visibility==='all'}\" @click=\"changeVisibility('all')\">全部</span>\n      <span :class=\"{'foot-visibility-in': visibility==='selected'}\" @click=\"changeVisibility('selected')\">被选中的</span>\n      <span :class=\"{'foot-visibility-in': visibility==='unselected'}\" @click=\"changeVisibility('unselected')\">未被选中的</span>      \n    </span>\n  </div>\n</template>\n\n<script>\n  import { delSelectedTodos, changeVisibility} from '../vuex/actions'\n  export default{\n    vuex: {\n      getters: {\n        todos: state => state.todos,\n        visibility: state => state.visibility,\n      },\n      actions: {\n        delSelectedTodos,\n        changeVisibility\n      }\n    },\n    computed: {\n      selectedLength () {\n        return this.todos.filter( todo => todo.selected ).length\n      }\n    }\n  }\n</script>"
        }]
      },
      {
        name:'questionnaire',
        title:'问卷调查(vue + vuex + vue-router)',
        detail:'demo/questionnaire/index.html',
        github:'https://github.com/haizai/cloud/tree/master/server/public/demo/questionnaire',
        hasMore:true,
        codes:[{
          name:'main.js',
          type:'javascript',
          text:"import Vue from 'vue'\nimport filters from './filters'\nimport VueRouter from 'vue-router'\nimport routeConfig from './route-config'\nimport app from './app.vue'\nimport './scss/main.scss'\n\nObject.keys(filters).forEach( key => Vue.filter(key, filters[key]) )\n\nVue.use(VueRouter)\nconst router = new VueRouter()\nrouter.map(routeConfig)\n//重定向\nrouter.redirect({\n  '/':'/list'\n})\n\nrouter.start(Vue.extend(app), '#app')"
        },{
          name:'route-config.js',
          type:'javascript',
          text:"import list from './views/list.vue'\nimport ans from './views/ans.vue'\nimport detail from './views/detail.vue'\nimport New from './views/new.vue'\n\nexport default {\n  '/list': {\n    name: 'list',\n    component: list\n  },\n  '/ans/:id': {\n    name: 'ans',\n    component: ans\n  },\n  '/detail/:id': {\n    name: 'detail',\n    component: detail\n  },\n  '/new': {\n    name: 'new',\n    component: New    \n  }\n}"
        },{
          name:'App.vue',
          type:'html',
          text:"<template>\n  <div>\n    <div class=\"header\"></div>\n    <div class=\"container\">\n      <div class=\"top\">\n        <span class=\"top-left\">问卷管理</span>\n        <span class=\"top-right\" v-link=\"{name:'list'}\">我的主页</span>\n        <a class=\"top-author\" href=\"https://github.com/haizai\">Building by Haizai</a>\n      </div>\n      <router-view></router-view>\n    </div>\n  </div>\n</template>\n\n<script>\n  import store from './vuex/store'\n\n  export default {\n    store\n  }\n</script>"
        },{
          name:'vuex/store.js',
          type:'javascript',
          text:"import Vue from 'vue'\nimport Vuex from 'vuex'\n\nVue.use(Vuex)\n\nconst NAME = 'vue-questionnaire-0.1.0-haizai'\n\nconst defaultNaires = [\n  {\n    title: \"这是一份已截止的测试问卷\",\n    endTime: +new Date(2016,6,8),\n    ques: [{\n      title  :'这是单选题目1',\n      type   :'radio',\n      values :['选项1','选项2','选项3',\"选项4\",'选项5']\n    },{\n      title  :'这是多选题目2',\n      type   :'checkbox',\n      values :['选项1','选项2','选项4',\"选项4\",\"选项5\"] \n    },{\n      title  :'这是文本题目3',\n      type   :'textarea'\n    }],\n    anss:[\n      [1, [1, 3], '你千万要记住了，不要见到风是得雨，'],\n      [3, [1, 0], null],\n      [2, [1, 3, 0], '香港记者不只跑得快，本身也要学会判断'],\n      [1, [1, 3, 2], '无中生有的东西，你再说一遍，等于你也有责任吧？'],\n      [1, [1, 2], null],\n      [0, [1, 2, 3, 0], '你们啊，不要想搞个大新闻，'],\n      [0, [1], null],\n      [1, [1], null],\n      [2, [1, 2], 'naive!'],\n      [1, [1, 3], '编不下去了'],\n      [4, [3, 4], '真的编不下去了']\n    ]\n  },\n  {\n    title   : \"关于大学生夜生活的调查问卷\",\n    endTime : +new Date(2020, 10 ,5),\n    ques    : [{\n      title  :'你的年级是?',\n      type   :'radio',\n      values :['大一','大二','大三',\"大四\"]\n    },{\n      title  :'你的性别是?',\n      type   :'radio',\n      values :['男','女']  \n    },{\n      title  :'你周一到周五一般几点睡觉?',\n      type   :'radio',\n      values :['22:00以前','22:00-23:00','23:00-0:00','0:00-1:00','1:00以后']\n    },{\n      title  :'你周一到周五点晚上都干什么?',\n      type   :'checkbox',\n      values :['玩电脑','玩手机','聊天','学习','其他'] \n    },{\n      title  :'你周末一般几点睡觉?',\n      type   :'radio',\n      values :['22:00以前','22:00-23:00','23:00-0:00','0:00-1:00','1:00以后']\n    },{\n      title  :'你周末晚上都干什么?',\n      type   :'checkbox',\n      values :['玩电脑','玩手机','聊天','学习','其他']\n    },{\n      title  :'你觉得你睡眠不好的原因是什么?',\n      type   :'textarea'\n    }],\n    anss:[]\n  }\n]\n\nconst state = JSON.parse(window.localStorage.getItem(NAME)) || {naires: defaultNaires}\n\nconst mutations = {\n  //提交答卷\n  SUBMIT_ANS (state, index, ans) {\n    state.naires[index].anss.push(ans)\n  },\n  //创建新问卷\n  CREATE_NAIRE (state, naire) {\n    state.naires.push(naire)\n  }\n}\n\nconst store = new Vuex.Store({\n  state,\n  mutations  \n})\n\nstore.watch( state => window.localStorage.setItem(NAME, JSON.stringify(state)) )\n\nexport default store"
        },{
          name:'./actions.js',
          type:'javascript',
          text:"export const submitAns   = makeAction ('SUBMIT_ANS')\nexport const createNaire = makeAction ('CREATE_NAIRE')\n\nfunction makeAction (type) {\n  return ({ dispatch }, ...args) => dispatch(type, ...args)\n}"
        },{
          name:'scss/main.scss',
          type:'scss',
          text:"//公用\n@import './letiable';\n@import './mixin';\n@import './common';\n@import './transition';\n//views\n@import './list';\n@import './detail';\n@import './ans';\n@import './new';\n//components\n@import './modal';"
        },{
          name:'views/new.vue',
          type:'html',
          text:"<template>\n<div>\n  <h3 class=\"content-title\">新建问卷</h3>\n  <div class=\"new content\">\n    <div class=\"new-toggle new-title\" :class=\"{'warning':!title}\">\n      <input \n        type=\"text\" \n        @blur=\"hideInput\" \n        @keydown.enter=\"hideInput\"\n        v-model=\"title\">\n      <span @click=\"showInput\">点我输入标题</span>\n    </div>\n    <div class=\"new-que\" v-for=\"(queIndex, que) in ques\" transition=\"fade\">\n      <button \n        type=\"button\" \n        class=\"new-que-btn\" \n        v-show=\"que.step === 0\" \n        @click=\"createNewQue(queIndex)\">+ 新建题目</button>\n        \n        <div class=\"new-que-type\" v-show=\"que.step === 1\" transition=\"scaleY\">\n          <div @click=\"typeSelect(queIndex, 'radio')\">+ 单选题</div><!--\n       --><div @click=\"typeSelect(queIndex, 'checkbox')\">+ 多选题</div><!--\n       --><div @click=\"typeSelect(queIndex, 'textarea')\">+ 文本题</div>\n        </div>\n\n      <div class=\"new-que-body\" v-show=\"que.step === 2\" transition=\"fade\">\n        <p class=\"new-toggle new-que-title\" :class=\"{'warning':!que.title}\">\n          <input \n            type=\"text\" \n            @blur=\"hideInput\" \n            @keydown.enter=\"hideInput\"\n            v-model=\"que.title\">\n          <span @click=\"showInput\">{{que.title}}</span>\n          <small v-text=\"que.type | typeToRead\"></small>\n          <i  @click=\"delQue(queIndex)\">&times;</i>\n        </p>\n        <p \n          class=\"new-toggle new-que-rc\"\n          v-if=\"que.type == 'radio' || que.type == 'checkbox'\"\n          v-for=\"(valueIndex, value) in que.values\"\n          track-by=\"$index\"\n          :class=\"{'warning':!value}\">\n          <input \n            type=\"text\" \n            @blur=\"hideInput\" \n            @keydown.enter=\"hideInput\"\n            v-model=\"value\">\n          <span @click=\"showInput\">{{value}}</span>\n          <i v-show=\"que.values.length > 2\" @click=\"delValue(queIndex, valueIndex)\">&times;</i>\n        </p>\n        <p v-if=\"que.type == 'radio' || que.type == 'checkbox'\" \n          class=\"new-que-add\" \n          @click=\"addValue(queIndex)\">+ 添加选项</p>\n      </div>   \n      <hr>    \n    </div>\n    <div class=\"new-date\">\n      <span :class=\"{'warning':dateClass}\">截止日期:</span>\n      <input type=\"text\" v-model=\"modelYear\" maxlength=\"4\">\n      <label :class=\"{'warning':dateClass}\">年</label>\n      <input type=\"text\" v-model=\"modelMonth\" maxlength=\"2\">\n      <label :class=\"{'warning':dateClass}\">月</label>\n      <input type=\"text\" v-model=\"modelDate\" maxlength=\"2\">\n      <label :class=\"{'warning':dateClass}\">日</label>\n    </div>\n    <hr>\n    <div class=\"new-button\">\n      <div><button v-link=\"{name:'list'}\">返回</button></div><!--\n   --><div><button @click=\"tryCreate\" class=\"info\">确认</button></div>\n    </div> \n\n    <modal-new v-show=\"modalShow\" :naire=\"naire\"></modal-new>\n  </div>\n</div>\n</template>\n\n<script>\n  import modalNew from '../components/modalNew.vue'\n  export default {\n    components: {\n      modalNew\n    },\n    vuex: {\n      getters: {\n        naires: state => state.naires\n      }\n    },\n    data() { return {\n      modalShow  : false,\n      dateClass  : false,\n      title      :'点我输入标题',\n      modelYear  : '',\n      modelMonth : '',\n      modelDate  : '',\n      ques: [{\n        step: 0, //0->点击btn之前, 1->选择type之前，2->正式的题目\n        type: '',\n        title: '点我输入题目',\n        values: ['选项1','选项2','选项3','选项4']\n      }]\n    }},\n    watch: {\n      //每当step为2时，出现新的btn\n      ques: {\n        handler(ques){ \n          if (ques[ques.length-1].step === 2) {\n            ques.push({\n              step   : 0,\n              type   : '',\n              title  : '点我输入题目',\n              values : ['选项1','选项2','选项3','选项4']              \n            })\n          }\n        },\n        deep: true\n      }\n    },\n    computed: {\n      //计算要提交的问卷\n      naire() {\n        let title = this.title.trim()\n        let ques = this.ques.map( que => {\n          if (que.step === 2) {\n            if (que.type === 'radio' || que.type === 'checkbox') {\n              return {title: que.title.trim(), type: que.type, values: que.values}\n            } else {\n              return {title: que.title.trim(), type: que.type}\n            }\n          }\n        })\n        ques.pop()\n        let endTime = +new Date(this.modelYear, this.modelMonth-1, this.modelDate)\n        return {\n          anss: [],\n          endTime,\n          title,\n          ques\n        }\n      }\n    },\n    methods: {\n      //点击div,显示后面的input\n      showInput(e) {\n        e.stopPropagation()\n        if (e.target.tagName === \"INPUT\") return\n        let input = e.target.previousElementSibling\n        input.style.display = 'inline-block'\n        input.value = e.target.firstChild.data\n        input.focus()\n        input.select()\n      },\n      //隐藏input\n      hideInput(e) {\n        let input = e.target\n        input.style.display = 'none'\n        input.value.trim() ?\n          input.nextElementSibling.firstChild.data = input.value.trim() :\n          input.nextElementSibling.firstChild.data = '请输入非空值'   \n      },\n      createNewQue(index) {\n        this.ques[index].step = 1\n      },\n      typeSelect(index,type) {\n        this.ques[index].step = 2\n        this.ques[index].type = type\n      },\n      delQue(index) {\n        this.ques.splice(index, 1)\n      },\n      addValue(index) {\n        this.ques[index].values.push('新选项')\n      },\n      delValue(queIndex, valueIndex) {\n        this.ques[queIndex].values.splice(valueIndex, 1)\n      },\n      testTime() {\n        if (this.modelYear && +this.modelYear > 2015 &&\n            this.modelMonth && +this.modelMonth > 0 && + this.modelMonth < 13 && \n            this.modelDate && +this.modelDate > 0 && this.modelDate < 32 &&\n            /^[0-9]+$/.test(this.modelYear + this.modelMonth + this.modelDate)) {\n          let d = new Date(this.modelYear, this.modelMonth-1, this.modelDate)\n          if (d > new Date()) {\n            this.dateClass = false\n            return d\n          }\n        }\n        this.dateClass = true\n        return false\n      },\n      tryCreate() {\n        let d = this.testTime()\n        if (!d) return\n        if (this.naire.ques.length === 0 ) return\n        let warnings1 = document.getElementsByClassName('new-title')[0].getElementsByClassName('warning')\n        let warnings2 = document.getElementsByClassName('new-que')[0].getElementsByClassName('warning')\n        if (warnings1.length + warnings2.length === 0) {\n          this.modalShow = true\n        } else {\n          document.body.scrollTop = warnings[0].offsetTop - 50\n          document.documentElement.scrollTop = warnings[0].offsetTop - 50\n        }\n      }\n    },\n    events: {\n      //隐藏弹出框\n      modalHide() {\n        this.modalShow = false\n      }\n    }\n  }\n</script>"
        },]
      }
    ],
    chart: {
      id: 'chart-main',
      option: {
        color:['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3', ' #C71585','#4169E1', '#556B2F'],
        backgroundColor: 'rgba(255,255,255,0.9)',
        title: {
          text: '起点VIP小说数据分析',
          textAlign: 'center',
          left: '50%',
          top:10,
          textStyle: {
            fontSize: 28
          },
          subtext: 'node.js爬虫得到全部17500部VIP小说',
          subtextStyle: {
            color: '#666'
          },
        },
        tooltip: {
          formatter: "{b}:{c}部({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top: 'middle',
          textStyle:{
            color: '#333'
          },
          data:['玄幻','都市','仙侠','科幻','历史','游戏','灵异','奇幻','武侠','二次元','职场','体育','军事','短篇']
        },
        series: [{
          name:'main',
          type:'pie',
          radius: [150, 200],
          center: [400,300],
          itemStyle: {
            normal: {
              shadowBlur: 150,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            }
          },
          label: {
            textStyle: {
              fontSize: 18
            }
          },
          selectedMode: 'single',
          data: [
            {name: '玄幻',value: 3770, selected: true},
            {name: '都市',value: 3195},
            {name: '仙侠',value: 1917},
            {name: '科幻',value: 1813},
            {name: '历史',value: 1724},
            {name: '游戏',value: 1480},
            {name: '灵异',value: 1024},
            {name: '奇幻',value: 691},
            {name: '武侠',value: 418},
            {name: '二次元',value: 369},
            {name: '职场',value: 365},
            {name: '体育',value: 331},
            {name: '军事',value: 316},
            {name: '短篇',value: 88},
          ]
        },{
          type:'pie',
          radius: [10, 60],
          center: [400,300],
          roseType: 'angle',
          label: {
            textStyle: {
              fontSize: 14
            }
          },
          data: [
            {name: '东方玄幻',value: 2376},
            {name: '异世大陆',value: 1256},
            {name: '王朝争霸',value: 127},
            {name: '高武世界',value: 11},
          ]
        }]
      },
      books:{"玄幻":[{"allClickCount":14990.7,"allCommendCount":662.91,"secondType":"异世大陆","title":"斗破苍穹","wordCount":532.45,"writer":"天蚕土豆"},{"allClickCount":6676.76,"allCommendCount":246.09,"secondType":"东方玄幻","title":"武动乾坤","wordCount":393.98,"writer":"天蚕土豆"},{"allClickCount":6313.9,"allCommendCount":570.62,"secondType":"异世大陆","title":"斗罗大陆","wordCount":302.11,"writer":"唐家三少"},{"allClickCount":5281.05,"allCommendCount":570.89,"secondType":"异世大陆","title":"神墓","wordCount":311.72,"writer":"辰东"},{"allClickCount":3826.49,"allCommendCount":527.49,"secondType":"异世大陆","title":"恶魔法则","wordCount":393.41,"writer":"跳舞"},{"allClickCount":3557.97,"allCommendCount":499.41,"secondType":"异世大陆","title":"邪神传说","wordCount":277.97,"writer":"云天空"},{"allClickCount":3517.75,"allCommendCount":281.53,"secondType":"异世大陆","title":"猎国","wordCount":356.58,"writer":"跳舞"},{"allClickCount":3487.04,"allCommendCount":255.98,"secondType":"异世大陆","title":"傲世九重天","wordCount":842.84,"writer":"风凌天下"}], "都市":[{"allClickCount":2514.59,"allCommendCount":52.2,"secondType":"异术超能","title":"校花的贴身高手","wordCount":1176.35,"writer":"鱼人二代"},{"allClickCount":2252.78,"allCommendCount":162.17,"secondType":"都市生活","title":"天才相师","wordCount":282.53,"writer":"打眼"},{"allClickCount":2197.8,"allCommendCount":178.87,"secondType":"都市生活","title":"陈二狗的妖孽人生","wordCount":113.42,"writer":"烽火戏诸侯"},{"allClickCount":2036.21,"allCommendCount":197.9,"secondType":"异术超能","title":"天王","wordCount":168.06,"writer":"跳舞"},{"allClickCount":2028.08,"allCommendCount":104.92,"secondType":"异术超能","title":"很纯很暧昧","wordCount":681.19,"writer":"鱼人二代"},{"allClickCount":1877.46,"allCommendCount":297.52,"secondType":"异术超能","title":"生肖守护神","wordCount":300.95,"writer":"唐家三少"},{"allClickCount":1826.92,"allCommendCount":162.59,"secondType":"都市生活","title":"黄金瞳","wordCount":417.03,"writer":"打眼"},{"allClickCount":1753.54,"allCommendCount":140.77,"secondType":"爱情婚姻","title":"老婆爱上我","wordCount":160.19,"writer":"傲无常"}],"仙侠":[ {"allClickCount":10083.79,"allCommendCount":1344.29,"secondType":"幻想修仙","title":"凡人修仙传","wordCount":747.84,"writer":"忘语"},{"allClickCount":6287.17,"allCommendCount":546.1,"secondType":"修真文明","title":"遮天","wordCount":635.92,"writer":"辰东"},{"allClickCount":6164.48,"allCommendCount":531.03,"secondType":"修真文明","title":"莽荒纪","wordCount":417.89,"writer":"我吃西红柿"},{"allClickCount":4988.92,"allCommendCount":671.33,"secondType":"幻想修仙","title":"星辰变","wordCount":283.68,"writer":"我吃西红柿"},{"allClickCount":4986.19,"allCommendCount":420.09,"secondType":"幻想修仙","title":"阳神","wordCount":308.89,"writer":"梦入神机"},{"allClickCount":4150.24,"allCommendCount":378,"secondType":"幻想修仙","title":"仙逆","wordCount":654.58,"writer":"耳根"},{"allClickCount":2914.43,"allCommendCount":231.72,"secondType":"修真文明","title":"诛仙","wordCount":258.79,"writer":"萧鼎"},{"allClickCount":2330.56,"allCommendCount":269.19,"secondType":"现代修真","title":"升龙道","wordCount":227.54,"writer":"血红"}],"科幻":[ {"allClickCount":8462.73,"allCommendCount":745.78,"secondType":"未来世界","title":"吞噬星空","wordCount":478.04,"writer":"我吃西红柿"},{"allClickCount":2557.02,"allCommendCount":442.19,"secondType":"星际文明","title":"小兵传奇","wordCount":206.86,"writer":"玄雨"},{"allClickCount":2519.74,"allCommendCount":346.8,"secondType":"宇宙练功","title":"星战风暴","wordCount":393.32,"writer":"骷髅精灵"},{"allClickCount":2269.64,"allCommendCount":368.76,"secondType":"宇宙练功","title":"冒牌大英雄","wordCount":411.08,"writer":"七十二编"},{"allClickCount":2260.48,"allCommendCount":342.97,"secondType":"未来世界","title":"卡徒","wordCount":209.19,"writer":"方想"},{"allClickCount":2220.61,"allCommendCount":419.1,"secondType":"时空穿梭","title":"无限恐怖","wordCount":270.09,"writer":"zhttty"},{"allClickCount":1837.26,"allCommendCount":175.89,"secondType":"宇宙练功","title":"机动风暴","wordCount":287.74,"writer":"骷髅精灵"},{"allClickCount":1681.86,"allCommendCount":296.92,"secondType":"时空穿梭","title":"最终进化","wordCount":458.98,"writer":"卷土"}], "历史":[{"allClickCount":3394.11,"allCommendCount":544.24,"secondType":"架空历史","title":"极品家丁","wordCount":319.88,"writer":"禹岩"},{"allClickCount":2935.73,"allCommendCount":577.2,"secondType":"架空历史","title":"随波逐流之一代军师","wordCount":154.82,"writer":"随波逐流"},{"allClickCount":2660.9,"allCommendCount":498.51,"secondType":"两宋元明","title":"回到明朝当王爷","wordCount":370.01,"writer":"月关"},{"allClickCount":2521.15,"allCommendCount":395.64,"secondType":"架空历史","title":"步步生莲","wordCount":357.36,"writer":"月关"},{"allClickCount":2202.53,"allCommendCount":331.47,"secondType":"架空历史","title":"庆余年","wordCount":393.44,"writer":"猫腻"},{"allClickCount":1977.49,"allCommendCount":303.79,"secondType":"两宋元明","title":"锦衣夜行","wordCount":382.24,"writer":"月关"},{"allClickCount":1805.49,"allCommendCount":323.42,"secondType":"架空历史","title":"赘婿","wordCount":339.67,"writer":"愤怒的香蕉"},{"allClickCount":1661.32,"allCommendCount":274.74,"secondType":"两晋隋唐","title":"江山美色","wordCount":429.93,"writer":"墨武"}],"游戏":[ {"allClickCount":6475.93,"allCommendCount":1331.17,"secondType":"虚拟网游","title":"从零开始","wordCount":2018.08,"writer":"雷云风暴"},{"allClickCount":2529.31,"allCommendCount":246.67,"secondType":"电子竞技","title":"网游之天地","wordCount":540.17,"writer":"隐为者"},{"allClickCount":2419.18,"allCommendCount":225.29,"secondType":"虚拟网游","title":"重生之贼行天下","wordCount":296.51,"writer":"发飙的蜗牛"},{"allClickCount":2338.36,"allCommendCount":473.49,"secondType":"游戏生涯","title":"全职高手","wordCount":535.18,"writer":"蝴蝶蓝"},{"allClickCount":2154.32,"allCommendCount":415.54,"secondType":"电子竞技","title":"流氓高手II","wordCount":370.86,"writer":"无罪"},{"allClickCount":1955.69,"allCommendCount":106.59,"secondType":"游戏异界","title":"异界全职业大师","wordCount":488.64,"writer":"庄毕凡"},{"allClickCount":1915.15,"allCommendCount":277.77,"secondType":"虚拟网游","title":"猛龙过江","wordCount":236.01,"writer":"骷髅精灵"},{"allClickCount":1285.05,"allCommendCount":128.92,"secondType":"虚拟网游","title":"高手寂寞","wordCount":133.4,"writer":"兰帝魅晨"}],"灵异":[ {"allClickCount":2103.67,"allCommendCount":31.53,"secondType":"寻墓探险","title":"盗墓笔记","wordCount":144.18,"writer":"南派三叔"},{"allClickCount":2010.01,"allCommendCount":67.33,"secondType":"寻墓探险","title":"鬼吹灯","wordCount":93.15,"writer":"本物天下霸唱"},{"allClickCount":1006.46,"allCommendCount":39.76,"secondType":"寻墓探险","title":"茅山后裔","wordCount":131.23,"writer":"大力金刚掌"},{"allClickCount":523.84,"allCommendCount":35.49,"secondType":"寻墓探险","title":"鬼吹灯II","wordCount":102.91,"writer":"本物天下霸唱"},{"allClickCount":381.75,"allCommendCount":25.87,"secondType":"恐怖惊悚","title":"超级猛鬼分身","wordCount":189.57,"writer":"奥比椰"},{"allClickCount":364.55,"allCommendCount":4.02,"secondType":"灵异鬼怪","title":"我当阴阳先生的那几年","wordCount":105.73,"writer":"崔走召"},{"allClickCount":324.28,"allCommendCount":23.64,"secondType":"恐怖惊悚","title":"鉴鬼实录","wordCount":124.42,"writer":"阿修罗的眼泪"},{"allClickCount":310.99,"allCommendCount":58.47,"secondType":"灵异鬼怪","title":"十三局灵异档案","wordCount":86.7,"writer":"微不二"}],"奇幻":[ {"allClickCount":9454.45,"allCommendCount":771.47,"secondType":"剑与魔法","title":"盘龙","wordCount":335.66,"writer":"我吃西红柿"},{"allClickCount":3529.89,"allCommendCount":242.64,"secondType":"现代魔法","title":"酒神","wordCount":281.85,"writer":"唐家三少"},{"allClickCount":2935.26,"allCommendCount":462.59,"secondType":"现代魔法","title":"琴帝","wordCount":321.73,"writer":"唐家三少"},{"allClickCount":2528.75,"allCommendCount":620.99,"secondType":"剑与魔法","title":"亵渎","wordCount":263.53,"writer":"烟雨江南"},{"allClickCount":2353.04,"allCommendCount":109.25,"secondType":"剑与魔法","title":"善良的死神","wordCount":335.47,"writer":"唐家三少"},{"allClickCount":1748.67,"allCommendCount":319.99,"secondType":"现代魔法","title":"冰火魔厨","wordCount":214.64,"writer":"唐家三少"},{"allClickCount":1082.74,"allCommendCount":66.49,"secondType":"史诗奇幻","title":"界王","wordCount":127.42,"writer":"骷髅精灵"},{"allClickCount":961.84,"allCommendCount":54.68,"secondType":"史诗奇幻","title":"魔兽领主","wordCount":267.73,"writer":"高坡"}],"武侠":[ {"allClickCount":5703.58,"allCommendCount":377.41,"secondType":"武侠幻想","title":"九鼎记","wordCount":202.6,"writer":"我吃西红柿"},{"allClickCount":1737.65,"allCommendCount":310.78,"secondType":"国术无双","title":"龙蛇演义","wordCount":223.17,"writer":"梦入神机"},{"allClickCount":1362.54,"allCommendCount":61.55,"secondType":"武侠幻想","title":"不死不灭","wordCount":139.86,"writer":"辰东"},{"allClickCount":767.35,"allCommendCount":82.52,"secondType":"国术无双","title":"傲剑天下","wordCount":125.85,"writer":"龙的天下"},{"allClickCount":736.43,"allCommendCount":64.52,"secondType":"国术无双","title":"无敌黑拳","wordCount":209.57,"writer":"大大王"},{"allClickCount":574.68,"allCommendCount":52.05,"secondType":"国术无双","title":"无限道武者路","wordCount":407.7,"writer":"饥饿2006"},{"allClickCount":509.59,"allCommendCount":27.44,"secondType":"传统武侠","title":"仗剑诀","wordCount":181.44,"writer":"二踢脚"},{"allClickCount":448.71,"allCommendCount":37.89,"secondType":"国术无双","title":"天生不凡","wordCount":90.83,"writer":"出水小葱水上飘"}],"二次元":[ {"allClickCount":749.91,"allCommendCount":1.74,"secondType":"衍生同人","title":"斗破之无上之境","wordCount":227.12,"writer":"夜雨闻铃0"},{"allClickCount":539.69,"allCommendCount":20.22,"secondType":"衍生同人","title":"星辰变后传","wordCount":108.92,"writer":"不吃西红柿"},{"allClickCount":310.54,"allCommendCount":45.53,"secondType":"变身入替","title":"异界变身狂想曲","wordCount":79.67,"writer":"破军王戟"},{"allClickCount":280.62,"allCommendCount":0.7556,"secondType":"衍生同人","title":"盘龙后传","wordCount":139.25,"writer":"吃西红柿"},{"allClickCount":255.68,"allCommendCount":12.73,"secondType":"衍生同人","title":"穿越者纵横动漫世界","wordCount":233.15,"writer":"龙之宫"},{"allClickCount":219.15,"allCommendCount":15.52,"secondType":"变身入替","title":"超级无敌变身美少女","wordCount":288.77,"writer":"草尖上的云雀"},{"allClickCount":196.42,"allCommendCount":4.35,"secondType":"衍生同人","title":"斗破之魂族帝师","wordCount":104.47,"writer":"三角四方圈圈叉"},{"allClickCount":147.95,"allCommendCount":10.88,"secondType":"变身入替","title":"异界变身之后","wordCount":72.95,"writer":"小金"}],"职场":[ {"allClickCount":1178.6,"allCommendCount":83.69,"secondType":"官场沉浮","title":"官神","wordCount":844.96,"writer":"何常在"},{"allClickCount":777.26,"allCommendCount":265.79,"secondType":"官场沉浮","title":"官道无疆","wordCount":986.78,"writer":"瑞根"},{"allClickCount":678.77,"allCommendCount":93.75,"secondType":"娱乐明星","title":"大亨传说","wordCount":179.98,"writer":"黯然销魂"},{"allClickCount":578.05,"allCommendCount":51.61,"secondType":"商战职场","title":"YY之王（原名龙）","wordCount":71.54,"writer":"撒冷"},{"allClickCount":542.89,"allCommendCount":37.01,"secondType":"商战职场","title":"重生传奇","wordCount":23.66,"writer":"紫箫"},{"allClickCount":529.34,"allCommendCount":50.18,"secondType":"娱乐明星","title":"最佳导演","wordCount":285.35,"writer":"机器人瓦力"},{"allClickCount":529.25,"allCommendCount":46.17,"secondType":"商战职场","title":"重生之资源大亨","wordCount":1191.17,"writer":"月下的孤狼"},{"allClickCount":515.74,"allCommendCount":57.92,"secondType":"娱乐明星","title":"导演万岁","wordCount":799.83,"writer":"张云.QD"}],"体育":[ {"allClickCount":1037.06,"allCommendCount":378.96,"secondType":"足球运动","title":"我们是冠军","wordCount":317.56,"writer":"林海听涛"},{"allClickCount":918.01,"allCommendCount":179.32,"secondType":"篮球运动","title":"校园篮球风云","wordCount":167.87,"writer":"大秦炳炳"},{"allClickCount":693.66,"allCommendCount":184.39,"secondType":"足球运动","title":"冠军教父","wordCount":464.35,"writer":"林海听涛"},{"allClickCount":613.47,"allCommendCount":93.15,"secondType":"篮球运动","title":"梦开始于篮球","wordCount":159.7,"writer":"郁郁林中树"},{"allClickCount":533.42,"allCommendCount":59.29,"secondType":"足球运动","title":"禁区之雄","wordCount":518.66,"writer":"林海听涛"},{"allClickCount":531.74,"allCommendCount":52.64,"secondType":"足球运动","title":"重生之足球神话","wordCount":205.31,"writer":"冰魂46"},{"allClickCount":487.36,"allCommendCount":92.08,"secondType":"足球运动","title":"冠军传奇","wordCount":479.06,"writer":"林海听涛"},{"allClickCount":481.89,"allCommendCount":29.9,"secondType":"足球运动","title":"超级教练","wordCount":550.7,"writer":"陈爱庭"}],"军事":[ {"allClickCount":1205.45,"allCommendCount":321.53,"secondType":"战争幻想","title":"复活之战斗在第三帝国","wordCount":282.95,"writer":"锋锐"},{"allClickCount":983.3,"allCommendCount":74.88,"secondType":"抗战烽火","title":"重生之红星传奇","wordCount":718.42,"writer":"豫西山人"},{"allClickCount":788.75,"allCommendCount":72.38,"secondType":"军旅生涯","title":"弹痕","wordCount":169.93,"writer":"纷舞妖姬"},{"allClickCount":473.53,"allCommendCount":16.94,"secondType":"军事战争","title":"国策","wordCount":629.63,"writer":"闪烁"},{"allClickCount":463.96,"allCommendCount":39.5,"secondType":"抗战烽火","title":"国破山河在","wordCount":192.76,"writer":"华表"},{"allClickCount":407.94,"allCommendCount":46.38,"secondType":"军事战争","title":"海魂","wordCount":590.42,"writer":"闪烁"},{"allClickCount":356.08,"allCommendCount":30.07,"secondType":"军事战争","title":"第五部队","wordCount":102.95,"writer":"纷舞妖姬"},{"allClickCount":340.46,"allCommendCount":18.31,"secondType":"战争幻想","title":"巴比伦帝国","wordCount":345.01,"writer":"华东之雄"}],"短篇":[ {"allClickCount":536.59,"allCommendCount":2.51,"secondType":"短篇小说","title":"千狼劫","wordCount":3.43,"writer":"鹤璧君"},{"allClickCount":209.73,"allCommendCount":33.09,"secondType":"短篇小说","title":"鬼屋夜话","wordCount":53.83,"writer":"谢绝假言"},{"allClickCount":133.22,"allCommendCount":133,"secondType":"短篇小说","title":"玄案","wordCount":76.32,"writer":"东方乙"},{"allClickCount":76.16,"allCommendCount":42.2,"secondType":"短篇小说","title":"剑尖上的国术","wordCount":38.78,"writer":"轩辕凌霄"},{"allClickCount":37.77,"allCommendCount":0.7158,"secondType":"短篇小说","title":"二傻","wordCount":18.04,"writer":"颜梅"},{"allClickCount":36.19,"allCommendCount":21.6,"secondType":"短篇小说","title":"婚与床","wordCount":31.59,"writer":"紫芋的世界"},{"allClickCount":11.89,"allCommendCount":3.08,"secondType":"短篇小说","title":"深层心理学","wordCount":22.32,"writer":"莲花九天落"},{"allClickCount":9.73,"allCommendCount":9.93,"secondType":"短篇小说","title":"花暝柳昏","wordCount":24.16,"writer":"流光宛转"}]}
    }
  })
})