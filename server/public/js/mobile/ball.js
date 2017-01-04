(function(window){
  var ball = document.getElementById('ball')
  var vy = 0.2
  var vx = 0
  var ay = 0
  var ax = 0
  var t = 13

  var height = document.body.clientHeight - ball.clientHeight
  var width = document.body.clientWidth - ball.clientWidth                                                                                                                               

  var CrashLoss = 0.8

  var _top
  var _left

  function sq(x) {
    x = Math.round(x)
    if (x >= 0) {
      return Math.sqrt(x) / 50000 + 0.0001
    } else {
      return -Math.sqrt(-x) / 50000 - 0.0001
    }
  }
  window.addEventListener("deviceorientation", function(e) {
    ay = sq(event.beta)
    ax = sq(event.gamma)
  }, false)

  setInterval(function () {
    _top = parseFloat(ball.style.top) + 1/2*ay*t*t + vy*t 
    _left = parseFloat(ball.style.left) + 1/2*ax*t*t + vx*t 

    if (_top >= height || _top <= 0) {
      vy = -vy * CrashLoss
      _top = parseFloat(ball.style.top)
    } else {
      vy += ay*t
    }
    if (_left >= width || _left <= 0) {
      vx = -vx * CrashLoss
      _left = parseFloat(ball.style.left)
    } else {
      vx += ax*t
    }
    ball.style.top = _top + 'px'
    ball.style.left = _left + 'px'
  }, t)
}(window))