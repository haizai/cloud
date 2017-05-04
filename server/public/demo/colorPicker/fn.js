/**
* https://en.wikipedia.org/wiki/HSL_and_HSV
* @param  {[arr]} hsl [h,s,l]
* @return {[arr]}     [r,g,b]
*/
function hslTorgb(hsl) {
  var h = hsl[0] % 360,
      s = hsl[1],
      l = hsl[2],
      c = (1 - Math.abs(2*l-1)) * s,
      h1 = h/60,
      x = c * (1 - Math.abs(h1%2-1)),
      rgb = [],
      m = l - c/2

  if (h1 < 1) {
    rgb = [c,x,0]
  } else if (h1 < 2) {
    rgb = [x,c,0]
  } else if (h1 < 3) {
    rgb = [0,c,x]
  } else if (h1 < 4) {
    rgb = [0,x,c]
  } else if (h1 < 5) {
    rgb = [x,0,c]
  } else if (h1 < 6) {
    rgb = [c,0,x]
  } else {
    rgb = [0,0,0]
  }


  return rgb.map(function(t){
    return Math.round((t + m) * 255)
  })
}

/**
* @param  {[arr]} rgb [r,g,b]
* @return {[arr]}     [h,s,l]
*/
function rgbTohsl(rgb) {

  var r = rgb[0]/255, g = rgb[1]/255, b = rgb[2]/255;

  var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; 
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = 60 * ((g - b) / d + (g < b ? 6 : 0));
        break;
      case g:
        h = 60 * ((b - r) / d + 2);
        break;
      case b:
        h = 60 * ((r - g) / d + 4);
        break;
    }
  }
  return [Math.round(h), +s.toFixed(2), +l.toFixed(2)];
}