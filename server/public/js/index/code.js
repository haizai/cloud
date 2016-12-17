
jQuery(function ($) {

  
  var Codes = [
    {
      name: 'jquery-calendar',
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
    },
    {
      name: 'jquery-todos',
      title: 'jquery Todos',
      detail: 'demo/jquery-todos/todos.html',
      github: 'https://github.com/haizai/cloud/tree/master/server/public/demo/jquery-todos',
      codes: [{
        name: 'todos.js',
        type: 'javascript',
        text: "jQuery(function($) {\n  var NAME = 'jQuery-todos-haizai'\n  var App = {\n    init: function () {\n      this.todos = JSON.parse(window.localStorage.getItem(NAME)) || [{text: \"默认todo1\", selected: false}, {text: \"默认todo2\", selected: true}]\n      this.visibility = '全部'\n      this.bindEvents()\n      this.render()\n    },\n    bindEvents: function() {\n      $('.head')\n        .on('keydown', '.head-input', this.addTodo.bind(this))\n        .on('click', '.round', this.toggleAll.bind(this))\n      $('.body')\n        .on('mouseenter', '.body-item', this.todoDelShow.bind(this))\n        .on('mouseleave', '.body-item', this.todoDelHide.bind(this))\n        .on('click', '.body-del', this.delTodo.bind(this))\n        .on('click', '.round', this.toggle.bind(this))\n        .on('click', '.body-label', this.tryEdit.bind(this))\n        .on('blur keydown', '.body-input', this.submitEdit.bind(this))\n      $('.foot')\n        .on('click', '.foot-del', this.delSelectedTodos.bind(this))\n        .on('click', '.foot-visibility span', this.changeVisibility.bind(this))\n    },\n    render: function() {\n      window.localStorage.setItem(NAME,JSON.stringify(this.todos))\n      var self = this\n      $('.body').empty()\n      this.todos.filter(function (todo) {\n        switch (self.visibility) {\n          case '全部': return true\n          case '被选中的': return todo.selected\n          case '未被选中的': return !todo.selected\n        }\n      }).forEach(function(todo) {\n        if (todo.selected) {\n          $('.body').append('<div class=\"body-item\"><i class=\"round round-selected\"></i><div class=\"body-label body-label-selected\">'\n            + todo.text +\n            '</div><input type=\"text\" class=\"body-input\"><i class=\"body-del\" style=\"display: none\">&times;</i></div>')          \n        } else {\n          $('.body').append('<div class=\"body-item\"><i class=\"round\"></i><div class=\"body-label\">'\n            + todo.text +\n            '</div><input type=\"text\" class=\"body-input\"><i class=\"body-del\" style=\"display: none\">&times;</i></div>')\n        }\n      })\n      this.todos.length == 0 ? $('.foot').hide() : $('.foot').show()\n      $('.foot-count').text(function() {\n        return self.todos.filter(function (todo) { \n          return todo.selected \n        }).length\n      })\n    },\n    getIndex: function(el) {\n      var all = document.getElementsByClassName('body-item')\n      for (var i = 0, len = all.length; i < len; i++) {\n        if (el === all[i]) return i\n      }\n    },\n    addTodo: function(e) {\n      if (e.keyCode === 13 && e.target.value.trim() !== '') {\n        this.todos.push({text: e.target.value, selected: false})\n        this.render()\n        e.target.value = ''\n      }\n    },\n    delTodo: function(e) {\n      var index = this.getIndex(e.target.parentNode)\n      this.todos.splice(index, 1)\n      this.render()\n    },\n    toggle: function(e) {\n      var index = this.getIndex(e.target.parentNode)\n      this.todos[index].selected = !this.todos[index].selected\n      this.render()\n    },\n    toggleAll: function() {\n      this.todos.some( function(todo) { return !todo.selected } )\n        ? this.todos.forEach( function(todo) { todo.selected = true } )\n        : this.todos.forEach( function(todo) { todo.selected = false } )\n      this.render()\n    },\n    delSelectedTodos: function() {\n      this.todos = this.todos.filter( function(todo){ return !todo.selected })\n      this.render()\n    },\n    todoDelShow: function(e) {\n      $(e.target).hasClass('body-item')\n      ? $(e.target).find('.body-del').show()\n      : $(e.target).parent().find('.body-del').show()\n    },\n    todoDelHide: function(e) {\n      $(e.target).hasClass('body-item')\n      ? $(e.target).find('.body-del').hide()\n      : $(e.target).parent().find('.body-del').hide() \n    },\n    tryEdit: function (e) {\n      $(e.target).next().val($(e.target).text()).show().select().focus()\n    },\n    submitEdit: function (e) {\n      if (e.type == 'keydown') {\n        if (e.keyCode === 13) e.target.blur()\n        return\n      }\n      var index = this.getIndex(e.target.parentNode)\n      if (e.target.value.trim()) {\n        this.todos[index].text = e.target.value\n        $(e.target).hide()\n      } else {\n        this.todos.splice(index, 1)\n      }\n      this.render()\n    },\n    changeVisibility: function (e) {\n      this.visibility = $(e.target).text()\n      $(e.target).siblings().removeClass('foot-visibility-in')\n      $(e.target).addClass('foot-visibility-in')\n      this.render()\n    }\n  }\n  App.init()\n})"
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
        name: 'App.jsx',
        type: 'jsx',
        text: "import React from 'react';\n\nimport Title from './Title.jsx';\nimport Head from './Head.jsx';\nimport Body from './Body.jsx';\nimport Foot from './Foot.jsx';\n\nconst NAME = 'react-todos-Haizai^0.1';\n\nexport default class App extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = JSON.parse(window.localStorage.getItem(NAME)) || {\n      todos: [{text: \"默认todo1\", selected: false, key: 0}, {text: \"默认todo2\", selected: true, key: 1}],\n      visibility: '全部',\n      allKey: 1\n    };\n  }\n  componentDidUpdate(prevProps, prevState) {\n    window.localStorage.setItem(NAME, JSON.stringify(prevState));\n  }\n  addTodo(e) {\n    if (e.keyCode === 13 && e.target.value.trim() !== '') {\n      this.state.todos.push({\n        text: e.target.value,\n        selected: false,\n        key: ++this.state.allKey\n      });\n      e.target.value = '';\n      this.forceUpdate();\n    };\n  }\n  toggleAll() {\n    this.state.todos.every( todo => todo.selected )\n      ? this.state.todos.forEach( todo => todo.selected = false )\n      : this.state.todos.forEach( todo => todo.selected = true );\n    this.forceUpdate();\n  }\n  delTodo(index) {\n    this.state.todos.splice(index, 1);\n    this.forceUpdate();\n  }\n  toggle(index) {\n    this.state.todos[index].selected = !this.state.todos[index].selected;\n    this.forceUpdate();\n  }\n  tryEdit(e) {\n    let input = e.target.nextSibling;\n    input.value = e.target.innerHTML;\n    input.style.display = 'inline-block';\n    input.select();\n    input.focus();\n  }\n  submitEdit(e, index) {\n    if (e.type == 'keydown') {\n      if (e.keyCode === 13) e.target.blur();\n      return;\n    };\n    if (e.target.value.trim()) {\n      this.state.todos[index].text = e.target.value;\n      e.target.style.display = 'none';\n    } else {\n      this.state.todos.splice(index, 1);\n    };\n    this.forceUpdate();\n  }\n  delSelectedTodos() {\n    this.setState({todos: this.state.todos.filter( todo => !todo.selected )});\n  }\n  changeVisibility(e) {\n    this.setState({visibility: e.target.textContent.trim()});\n  }\n  render() {\n    let isAllSelected = ( this.state.todos.length && this.state.todos.every( todo => todo.selected ) ) ? true : false,\n      selectedCount   = this.state.todos.filter( todo => todo.selected ).length,\n      footStyle       = this.state.todos.length === 0 ? 'none' : 'block',\n      visibilityTodos = this.state.todos.filter( todo => {\n        switch (this.state.visibility) {\n          case '全部'       : return true;\n          case '被选中的'   : return todo.selected;\n          case '未被选中的' : return !todo.selected;\n        };\n      });\n    const bodyMethods = {}\n    return (\n      <div className='container'>\n        <Title />\n        <Head \n          isAllSelected={isAllSelected}\n          addTodo={this.addTodo.bind(this)}\n          toggleAll={this.toggleAll.bind(this)}\n        />      \n        <Body\n          todos={visibilityTodos}\n          delTodo={this.delTodo.bind(this)}\n          toggle={this.toggle.bind(this)}\n          tryEdit={this.tryEdit.bind(this)}\n          submitEdit={this.submitEdit.bind(this)}\n        />   \n        <Foot\n          footStyle={footStyle}\n          selectedCount={selectedCount}\n          visibility={this.state.visibility}\n          delSelectedTodos={this.delSelectedTodos.bind(this)}\n          changeVisibility={this.changeVisibility.bind(this)}\n        />\n      </div>\n    );\n  }\n};"
      },{
        name: 'Title.jsx',
        type: 'jsx',
        text: "import React from 'react';\n\nexport default class Title extends React.Component {\n  render() {\n    return (\n      <div className='title'>\n        <p>React Todos</p>\n        <p className=\"author\"><a href=\"https://github.com/haizai\" target=\"_black\">By Haizai</a></p>\n      </div>\n    )\n  }\n}"
      },{
        name: 'Head.jsx',
        type: 'jsx',
        text: "import React from 'react';\n\nexport default class Head extends React.Component {\n  render() {\n    const {isAllSelected, toggleAll, addTodo} = this.props,\n      roundClass = isAllSelected ? 'round round-selected' : 'round';\n    return (\n      <div className='head'>\n        <i className={roundClass} onClick={toggleAll}/>\n        <input \n          className='head-input'\n          type='text' \n          placeholder='请输入新的todo，按Enter确认'\n          onKeyDown={addTodo}\n        />\n      </div>\n    )\n  }\n}"
      },{
        name: 'Body.jsx',
        type: 'jsx',
        text: "import React from 'react';\nimport ReactCSSTransitionGroup from 'react-addons-css-transition-group';\n\nimport Todo from './Todo.jsx'\n\nexport default class Body extends React.Component {\n  render() {\n    const {todos,...methods} = this.props;\n    return (\n      <div className='body'>\n      <ReactCSSTransitionGroup \n        transitionName=\"fade\"\n        transitionEnterTimeout={300} \n        transitionLeaveTimeout={300}>      \n      {\n        todos.map((todo, index)=>{\n          return (\n              <Todo\n                methods={methods}\n                index={index}\n                text={todo.text} \n                selected={todo.selected}\n                key={todo.key}\n              />\n          )\n        })\n      }\n      </ReactCSSTransitionGroup>\n      </div>\n    )\n  }\n}"
      },{
        name: 'Todo.jsx',
        type: 'jsx',
        text: "import React from 'react';\n\nexport default class Todo extends React.Component {\n   constructor(props) {\n    super(props);\n    this.state = {\n      delShow: 'none'\n    };\n  } \n  todoDelShow() {\n    this.setState({delShow: 'block'});\n  }\n  todoDelHide() {\n    this.setState({delShow: 'none'}); \n  }\n  render() {\n    const {index, selected, text, methods} = this.props,\n      {delTodo, submitEdit, toggle, tryEdit} = methods,\n      roundClass = selected ? 'round round-selected' : 'round',\n      labelClass = selected ? 'body-label body-label-selected' : 'body-label';\n    return (\n      <div \n        className='body-item' \n        onMouseEnter={this.todoDelShow.bind(this)}\n        onMouseMove={this.todoDelShow.bind(this)}\n        onMouseLeave={this.todoDelHide.bind(this)}>\n        <i \n          className={roundClass}\n          onClick={()=>toggle(index)}\n        />\n        <div \n          className={labelClass}\n          onClick={tryEdit}\n        >{text}</div>\n        <input \n          type='text' \n          className='body-input' \n          style={{display: 'none'}}\n          onKeyDown={e=>submitEdit(e, index)}\n          onBlur={e=>submitEdit(e, index)}\n        />\n        <i \n          className='body-del' \n          style={{display: this.state.delShow}}\n          onClick={()=>delTodo(index)}\n        >&times;</i>\n      </div>\n    )\n  }\n};"
      },{
        name: 'Foot.jsx',
        type: 'jsx',
        text: "import React from 'react';\n\nexport default class Foot extends React.Component {\n  render() {\n    const {footStyle, delSelectedTodos, selectedCount, visibility, changeVisibility} = this.props,\n      viss = ['全部', '被选中的', '未被选中的'];\n    return (\n      <div className='foot' style={{display: footStyle}}>\n        <i className='foot-del' onClick={delSelectedTodos}>&times;</i>\n        <span className='foot-info'> <span className='foot-count'>{selectedCount}</span> 项被选中</span>\n        <span className='foot-visibility'>\n        {\n          viss.map( vis=>{\n            let className = vis == visibility ? 'foot-visibility-in' : null;\n            return (\n              <span className={className} onClick={changeVisibility} key={vis}>\n                {vis}&nbsp;\n              </span>\n            );\n          })\n        }\n        </span>\n      </div>\n    )\n  }\n}"
      }]
    }
  ]


  var bH = $('body').height() 
  $('.code-warp').css({height:bH - 220 + 'px'})




  $('.part-demos-warp [code]').on('click', function() {
    _isAllowedMousewheel = false
    var $code = $('.code-all')
    $code.show()
    $code.find('.code-del').on('click', function(){
      _isAllowedMousewheel = true
      $code.hide()
    })

    var codeName = $(this).attr('code')

    $('.code-slide').html('')
    $('.code-body').html('')

    Codes.forEach(function(obj){
      if (obj.name === codeName) {
        $('.code-title').text(obj.title)
        $('.code-detail').parent().attr('href',obj.detail)
        $('.code-github').parent().attr('href',obj.github)

        obj.codes.forEach( function(code, index) {
          $('.code-slide').append('<li>' + code.name +'</li>')
          $('.code-body').append('<li><pre class="language-' +code.type+'" style="height: ' + (bH - 320) +'px"><code class="language-' +code.type+ '">'+ Prism.highlight(code.text,Prism.languages[code.type]) +'</code></pre></li>')
          if (index == 0) {
            $('.code-slide').find('li').addClass('code-slide-in')
            $('.code-body').find('li').show()
          }
        });

        if (obj.hasMore) {
          $('.code-slide').append('<li class="code-more"><a style="color: #333" target="_black" href="'+ obj.github +'">更多...</li>')
        }
      }
    })




    // //不同code转换
    $('.code-slide li').not('.code-more').each(function(index) {
      $(this).on('click', function(){
        $('.code-slide li').removeClass('code-slide-in')
        $(this).addClass('code-slide-in')
        $('.code-body li').hide()
        $('.code-body li').eq(index).show()
      })
    })


  })


})