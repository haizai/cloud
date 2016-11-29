window.onload = function () {
  var img = document.getElementById('title-img')
  var height = document.body.offsetHeight
  var width = document.body.offsetWidth
  img.style.top = (height/2-30) + 'px'
  img.style.left = (width/2-221) + 'px'
  img.style.display = 'block'
  var transform
  document.onmousemove = function (e) {
    transform = 'rotateX(' + (e.clientY/height-0.5)*180 +'deg) ' + 'rotateY(' + (-e.clientX/width+0.5)*180 +'deg)' +' translateZ('+height/3+'px)'
    img.style.transform = transform
  }
  document.onmouseleave = function (e) {
    img.style.transform = null
  }
}