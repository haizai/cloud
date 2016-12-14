function Calendar(input) {
  this.input = input
  this.date = new Date()
  this.container = null
  this.head = null
  this.content = null
  this.init()
}
Calendar.prototype = {
  init: function() {
    this.container = $('<div></div>').attr('id', 'calendar')
    this.input.after(this.container)
    this.head = $('<div></div>').appendTo(this.container).addClass('head')
    $('<div></div>')
      .addClass('middle')
      .html('<span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>')
      .appendTo(this.container)
    this.content = $('<div></div').addClass('content').appendTo(this.container)
    this.toggleDisplay()
    this.render(this.date)
    this.inputClick()
  },
  //渲染日历本身
  render: function(date) {
    var self = this
    this.head.html('<span class="leftCreat"></span>' + date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + '<span class="rightCreat"></span>')
    this.content.html('')
      //上个月补全
    var lastdate = new Date(date.getFullYear(), date.getMonth(), 0) //上个月最后一天
    if (lastdate.getDay() !== 6)
      for (var i = lastdate.getDate() - lastdate.getDay(); i < lastdate.getDate() + 1; i++) {
        ($('<span></span>').addClass('last').html(i)).appendTo(self.content)
      }
      //本月
    var nextdate = new Date(date.getFullYear(), date.getMonth() + 1, 0) //这个月最后一天
    for (var i = 1; i < nextdate.getDate() + 1; i++) {
      ($('<span></span>').html(i)).appendTo(self.content)
    }
    //下个月
    for (var i = 1; i < (7 - nextdate.getDay()); i++) {
      ($('<span></span>').addClass('next').html(i)).appendTo(self.content)
    }

    this.content
      .children()
      .filter(function(index) {
        return (index % 7 === 0 || index % 7 === 6)
      })
      .not($('.last'))
      .not($('.next'))
      .addClass('side')
      //如果是本年本月,就激活今天
    if (this.date.getMonth() === new Date().getMonth() && this.date.getFullYear() === new Date().getFullYear()) {
      this.dateActive(date.getDate())
    }
    this.click()
  },
  //激活某一天
  dateActive: function(date) {
    this.content //复原
      .children()
      .filter($('.active'))
      .removeClass('active')
    this.content
      .children()
      .not($('.last'))
      .not($('.next'))
      .filter(function() {
        return ($(this).text() == date)
      })
      .addClass('active')
    this.input.text(this.head.text() + date + '日')
  },
  toggleDisplay: function() {
    this.container.toggleClass('displayNone')
  },
  inputClick: function() {
    var self = this
    this.input.click(function() {
      self.toggleDisplay()
    })
  },
  click: function() {
    var self = this
      //点击本月的一天,则激活那天
    this.content
      .children()
      .not($('.last'))
      .not($('.next'))
      .click(function() {
        self.dateActive($(this).text())
      })
      //点击上月的一天,则来到上月,并激活
    this.content
      .children()
      .filter($('.last'))
      .click(function() {
        self.lastMouth()
        self.dateActive($(this).text())
      })
      //点击下月的一天,则来到下月,并激活
    this.content
      .children()
      .filter($('.next'))
      .click(function() {
        self.nextMouth()
        self.dateActive($(this).text())
      })

    this.head.find($('.leftCreat'))
      .click(function() {
        self.lastMouth()
      })
    this.head.find($('.rightCreat'))
      .click(function() {
        self.nextMouth()
      })
  },
  lastMouth: function() {
    this.date.setMonth(this.date.getMonth() - 1)
    this.render(this.date)
  },
  nextMouth: function() {
    this.date.setMonth(this.date.getMonth() + 1)
    this.render(this.date)
  },
}
new Calendar($('#input'))