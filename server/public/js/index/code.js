
jQuery(function ($) {

  

  var jqueryCalendar = {
    title: 'jquery日历',
    detail: '/demo/jquery-calendar/calendar.html',
    github: 'https://github.com/haizai/cloud/tree/master/server/public/demo/jquery-calendar',
    codes: [{
      name: 'calendar.js',
      type: 'javascript',
      text: "function Calendar(input) {\n  this.input = input\n  this.date = new Date()\n  this.container = null\n  this.head = null\n  this.content = null\n  this.init()\n}\n\nCalendar.prototype = {\n  init: function() {\n    this.container = $('<div></div>').attr('id', 'calendar')\n    this.input.after(this.container)\n    this.head = $('<div></div>').appendTo(this.container).addClass('head')\n    $('<div></div>')\n      .addClass('middle')\n      .html('<span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>')\n      .appendTo(this.container)\n    this.content = $('<div></div').addClass('content').appendTo(this.container)\n    this.toggleDisplay()\n    this.render(this.date)\n    this.inputClick()\n  },\n  //渲染日历本身\n  render: function(date) {\n    var self = this\n    this.head.html('<span class=\"leftCreat\"></span>' + date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + '<span class=\"rightCreat\"></span>')\n    this.content.html('')\n      //上个月补全\n    var lastdate = new Date(date.getFullYear(), date.getMonth(), 0) //上个月最后一天\n    if (lastdate.getDay() !== 6)\n      for (var i = lastdate.getDate() - lastdate.getDay(); i < lastdate.getDate() + 1; i++) {\n        ($('<span></span>').addClass('last').html(i)).appendTo(self.content)\n      }\n      //本月\n    var nextdate = new Date(date.getFullYear(), date.getMonth() + 1, 0) //这个月最后一天\n    for (var i = 1; i < nextdate.getDate() + 1; i++) {\n      ($('<span></span>').html(i)).appendTo(self.content)\n    }\n    //下个月\n    for (var i = 1; i < (7 - nextdate.getDay()); i++) {\n      ($('<span></span>').addClass('next').html(i)).appendTo(self.content)\n    }\n\n    this.content\n      .children()\n      .filter(function(index) {\n        return (index % 7 === 0 || index % 7 === 6)\n      })\n      .not($('.last'))\n      .not($('.next'))\n      .addClass('side')\n      //如果是本年本月,就激活今天\n    if (this.date.getMonth() === new Date().getMonth() && this.date.getFullYear() === new Date().getFullYear()) {\n      this.dateActive(date.getDate())\n    }\n    this.click()\n  },\n  //激活某一天\n  dateActive: function(date) {\n    this.content //复原\n      .children()\n      .filter($('.active'))\n      .removeClass('active')\n    this.content\n      .children()\n      .not($('.last'))\n      .not($('.next'))\n      .filter(function() {\n        return ($(this).text() == date)\n      })\n      .addClass('active')\n    this.input.text(this.head.text() + date + '日')\n  },\n  toggleDisplay: function() {\n    this.container.toggleClass('displayNone')\n  },\n  inputClick: function() {\n    var self = this\n    this.input.click(function() {\n      self.toggleDisplay()\n    })\n  },\n  click: function() {\n    var self = this\n      //点击本月的一天,则激活那天\n    this.content\n      .children()\n      .not($('.last'))\n      .not($('.next'))\n      .click(function() {\n        self.dateActive($(this).text())\n      })\n      //点击上月的一天,则来到上月,并激活\n    this.content\n      .children()\n      .filter($('.last'))\n      .click(function() {\n        self.lastMouth()\n        self.dateActive($(this).text())\n      })\n      //点击下月的一天,则来到下月,并激活\n    this.content\n      .children()\n      .filter($('.next'))\n      .click(function() {\n        self.nextMouth()\n        self.dateActive($(this).text())\n      })\n\n    this.head.find($('.leftCreat'))\n      .click(function() {\n        self.lastMouth()\n      })\n    this.head.find($('.rightCreat'))\n      .click(function() {\n        self.nextMouth()\n      })\n  },\n  lastMouth: function() {\n    this.date.setMonth(this.date.getMonth() - 1)\n    this.render(this.date)\n  },\n  nextMouth: function() {\n    this.date.setMonth(this.date.getMonth() + 1)\n    this.render(this.date)\n  },\n}\nnew Calendar($('#input'))"
    },{
      name: 'calendar.html',
      type: 'html',
      text: "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n  <title>calendar</title>\n  <link rel=\"stylesheet\" href=\"calendar.css\">\n</head>\n<body>\n  <div id=\"input\"></div>\n  <script src=\"../../js/common/jquery-3.1.1.min.js\"></script>\n  <script src=\"calendar.js\"></script>\n</body>\n</html>"
    },{
      name: 'calendar.css',
      type: 'css',
      text: "body {\n  font: 20px/2 simhei;\n}\n#input {\n  width: 310px;\n  height: 40px;\n  margin: 20px auto 10px;\n  cursor: pointer;\n  text-align: center;\n  border: 1px solid #ccc;\n}\n#calendar {\n  width: 280px;\n  margin: auto;\n  padding: 5px 15px;\n  border: 1px solid #ccc;\n}\n.displayNone {\n  display: none;\n}\n.head {\n  font-size: 22px;\n  line-height: 30px;\n  position: relative;\n  text-align: center;\n  color: #fff;\n  background: #d14141;\n}\n.leftCreat {\n  position: absolute;\n  top: 8px;\n  left: 8px;\n  cursor: pointer;\n  border-top: 8px solid transparent;\n  border-right: 12px solid #fff;\n  border-bottom: 8px solid transparent;\n}\n.rightCreat {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  cursor: pointer;\n  border-top: 8px solid transparent;\n  border-bottom: 8px solid transparent;\n  border-left: 12px solid #fff;\n}\n.middle > span,\n.content > span {\n  display: inline-block;\n  width: 40px;\n  text-align: center;\n}\n.content > span:hover {\n  cursor: pointer;\n  background: #eee;\n}\n.content > span.last,\n.content > span.next {\n  color: #ccc;\n}\n.content > span.side {\n  color: #d14141;\n}\n.content > span.active {\n  color: #fff;\n  background: #d14141;\n}"
    }]
  }



  var bH = $('body').height() 
  $('.code-warp').css({height:bH - 220 + 'px'})




  $('.part-demos-warp [code="jqueryCalendar"]').on('click', function() {
    _isAllowedMousewheel = false
    var $code = $('.code-all')
    $code.show()
    $code.find('.code-del').on('click', function(){
      _isAllowedMousewheel = true
      $code.hide()
    })


    $('.code-title').text(jqueryCalendar.title)
    $('.code-detail').parent().attr('href',jqueryCalendar.detail)
    $('.code-github').parent().attr('href',jqueryCalendar.github)

    jqueryCalendar.codes.forEach( function(code, index) {
      $('.code-slide').append('<li>' + code.name +'</li>')
      $('.code-body').append('<li><pre class="language-' +code.type+'" style="height: ' + (bH - 320) +'px"><code class="language-' +code.type+ '">'+ Prism.highlight(code.text,Prism.languages[code.type]) +'</code></pre></li>')
      if (index == 0) {
        $('.code-slide').find('li').addClass('code-slide-in')
        $('.code-body').find('li').show()
      }
    });


    // //不同code转换
    $('.code-slide li').each(function(index) {
      $(this).on('click', function(){
        $('.code-slide li').removeClass('code-slide-in')
        $(this).addClass('code-slide-in')
        $('.code-body li').hide()
        $('.code-body li').eq(index).show()
      })
    })


  })


})