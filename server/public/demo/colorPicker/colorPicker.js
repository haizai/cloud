(function(){

  var Color = function(){
    this.rgb = null
    this.boardRgb = null
    this.hsl = null
  }
  Color.prototype = {
    changeH: function(h){
      this.hsl[0] = h
      this.rgb = hslTorgb(this.hsl)
      this.boardRgb = hslTorgb([h,1,0.5])
      return this
    },
    changeRgb: function(rgb) {
      this.rgb = rgb
      this.hsl = rgbTohsl(rgb)
      var h = rgbTohsl(rgb)[0]
      this.boardRgb = hslTorgb([h,1,0.5])
      return this
    },
    changeXY: function(xy) {
      var x = xy[0], y = xy[1]      
      var r = Math.round((255*(1-x) + this.boardRgb[0] * x) * (1-y))
      var g = Math.round((255*(1-x) + this.boardRgb[1] * x) * (1-y))
      var b = Math.round((255*(1-x) + this.boardRgb[2] * x) * (1-y))

      // 防止色相变动的近似处理
      var h = this.hsl[0]
      this.changeRgb([r,g,b])
      this.changeH(h)
      return this
    },
    getHEX: function() {
      return '#' + this.rgb.map(function(c){
        return ('0' + c.toString(16)).slice(-2).toUpperCase()
      }).join('')
    }
  }


  var $ = function(id){
    return document.getElementById(id)
  }
  var $board = $('board'),
    ctx = $board.getContext('2d'),
    width = 500,
    height = 500

  var $nc = $('now-color'),
    $cr = $('color-round'),
    $cb = $('color-bar'),
    $br = $('board-round'),
    $bo = $('board-outer'),
    $b = $('board')

  var color = new Color().changeRgb([255,0,0])


  $cr.addEventListener('mousedown', cDown, false)
  $cb.addEventListener('mousedown', cDown, false)

  $br.addEventListener('mousedown', bDown, false)
  $b.addEventListener('mousedown', bDown, false)

  render(color)

  function render(color) {

    ctx.clearRect(0,0,width,height)

    var colorGradient = ctx.createLinearGradient(0,0,width,0)
    colorGradient.addColorStop(0,'rgb(255,255,255)')
    colorGradient.addColorStop(1,'rgb('+color.boardRgb[0]+','+color.boardRgb[1]+','+color.boardRgb[2]+')')
    ctx.fillStyle = colorGradient
    ctx.fillRect(0,0,width,height)

    var lightGradient = ctx.createLinearGradient(0,0,0,height)
    lightGradient.addColorStop(0,'rgba(0,0,0,0)')
    lightGradient.addColorStop(1,'rgba(0,0,0,1)')
    ctx.fillStyle = lightGradient
    ctx.fillRect(0,0,width,height)

    $nc.style.backgroundColor = 'rgb('+color.rgb[0]+','+color.rgb[1]+','+color.rgb[2]+')'

    document.getElementById('tr').innerHTML = color.rgb[0]
    document.getElementById('tg').innerHTML = color.rgb[1]
    document.getElementById('tb').innerHTML = color.rgb[2]
    document.getElementById('th').innerHTML = color.hsl[0]
    document.getElementById('ts').innerHTML = Math.round(color.hsl[1] * 100) + '%'
    document.getElementById('tl').innerHTML = Math.round(color.hsl[2] * 100) + '%'
    document.getElementById('hex').innerHTML = color.getHEX()

  }


  // 滑动滑块 及 点击滑条任意处并滑动
  function cDown(e){
    e.preventDefault()

    var startX = e.clientX

    if (e.target === $cb) {
      var left = startX - e.target.offsetLeft 
      $cr.style.left = left + 'px'
      renderInLeft(left)
    }

    var startLeft = parseInt($cr.style.left) || 0 

    document.addEventListener('mousemove', crMove, false)
    document.addEventListener('mouseup', crUp, false)


    function renderInLeft(left) {
      var h = middle(left)
      color.changeH(h)
      render(color)
    }

    function middle(n) {
      if (n > 360) {
        return 360
      } else if (n < 0) {
        return 0
      } else {
        return n
      }
    }
    function crMove(e2) {
      e2.preventDefault()
      var h = middle(e2.clientX - startX + startLeft)
      renderInLeft(h)
      $cr.style.left = h + 'px'
    }
    function crUp(e3) {
      e3.preventDefault()
      document.removeEventListener('mousemove', crMove, false)
      document.removeEventListener('mouseup', crUp, false)
    }
  }

  // 滑动背景滑块 及 点击背景任意处并滑动
  function bDown(e){

    var startX = e.clientX
    var startY = e.clientY
    e.preventDefault()

    if (e.target === $b) {
      var left = startX - $bo.offsetLeft
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var top = startY - $bo.offsetTop + scrollTop
      $br.style.left = left + 'px'
      $br.style.top = top + 'px'
      renderInXY(left,top)
    }

    var startLeft = parseInt($br.style.left) || 500
    var startTop = parseInt($br.style.top) || 0 


    document.addEventListener('mousemove', brMove, false)
    document.addEventListener('mouseup', brUp, false)


    function renderInXY(left,top) {
      var x = middle(left)/width
      var y = middle(top)/height
      color.changeXY([x,y])
      render(color)
    }

    function middle(n) {
      if (n > width) {
        return width
      } else if (n < 0) {
        return 0
      } else {
        return n
      }
    }
    function brMove(e2) {
      e2.preventDefault()
      var left = middle(e2.clientX - startX + startLeft)
      var top = middle(e2.clientY - startY + startTop)
      renderInXY(left,top)
      $br.style.left = left + 'px'
      $br.style.top = top + 'px'
    }
    function brUp(e3) {
      e3.preventDefault()
      document.removeEventListener('mousemove', brMove, false)
      document.removeEventListener('mouseup', brUp, false)
    }
  }

}())