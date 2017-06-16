  var indexTitle = document.getElementsByClassName('index-title')[0]
  var titleArr = Array.prototype.slice.call(indexTitle.children)
  var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',

    pagination: '.swiper-pagination',

    onSlideChangeEnd:function(swiper){
      switch (swiper.activeIndex) {
        case 0:
          console.log('index')
          titleArr.forEach(function(dom,index){
            dom.className = 's'+index
          })
          break;
        case 1:
          titleArr.forEach(function(dom,index){
            console.log(dom)
            dom.className = ''
          })
          break;
        default:

          break;
      }
    }
  })  