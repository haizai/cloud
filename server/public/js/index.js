window.onload = function () {
  var img = document.getElementById('title-img')
  var height = document.body.offsetHeight
  var width = document.body.offsetWidth
  img.style.top = (height/2-30) + 'px'
  img.style.left = (width/2-221) + 'px'
  img.style.display = 'block'
  document.onmousemove = function (e) {
    var deg = (Math.abs(e.clientX/width-0.5)+Math.abs(e.clientY/height-0.5))*70
    rotate3d = 'rotate3d(' + (e.clientY/height-0.5) + ',' + (-e.clientX/width+0.5) +', 0, ' + deg+ 'deg)'
    img.style.transform = rotate3d
  }
  document.onmouseleave = function (e) {
    img.style.transform = null
  }
}