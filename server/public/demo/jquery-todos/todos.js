jQuery(function($) {
  var NAME = 'jQuery-todos-haizai'
  var App = {
    init: function () {
      this.todos = JSON.parse(window.localStorage.getItem(NAME)) || [{text: "默认todo1", selected: false}, {text: "默认todo2", selected: true}]
      this.visibility = '全部'
      this.bindEvents()
      this.render()
    },
    bindEvents: function() {
      $('.head')
        .on('keydown', '.head-input', this.addTodo.bind(this))
        .on('click', '.round', this.toggleAll.bind(this))
      $('.body')
        .on('mouseenter', '.body-item', this.todoDelShow.bind(this))
        .on('mouseleave', '.body-item', this.todoDelHide.bind(this))
        .on('click', '.body-del', this.delTodo.bind(this))
        .on('click', '.round', this.toggle.bind(this))
        .on('click', '.body-label', this.tryEdit.bind(this))
        .on('blur keydown', '.body-input', this.submitEdit.bind(this))
      $('.foot')
        .on('click', '.foot-del', this.delSelectedTodos.bind(this))
        .on('click', '.foot-visibility span', this.changeVisibility.bind(this))
    },
    render: function() {
      window.localStorage.setItem(NAME,JSON.stringify(this.todos))
      var self = this
      $('.body').empty()
      this.todos.filter(function (todo) {
        switch (self.visibility) {
          case '全部': return true
          case '被选中的': return todo.selected
          case '未被选中的': return !todo.selected
        }
      }).forEach(function(todo) {
        if (todo.selected) {
          $('.body').append('<div class="body-item"><i class="round round-selected"></i><div class="body-label body-label-selected">'
            + todo.text +
            '</div><input type="text" class="body-input"><i class="body-del" style="display: none">&times;</i></div>')          
        } else {
          $('.body').append('<div class="body-item"><i class="round"></i><div class="body-label">'
            + todo.text +
            '</div><input type="text" class="body-input"><i class="body-del" style="display: none">&times;</i></div>')
        }
      })
      this.todos.length == 0 ? $('.foot').hide() : $('.foot').show()
      $('.foot-count').text(function() {
        return self.todos.filter(function (todo) { 
          return todo.selected 
        }).length
      })
    },
    getIndex: function(el) {
      var all = document.getElementsByClassName('body-item')
      for (var i = 0, len = all.length; i < len; i++) {
        if (el === all[i]) return i
      }
    },
    addTodo: function(e) {
      if (e.keyCode === 13 && e.target.value.trim() !== '') {
        this.todos.push({text: e.target.value, selected: false})
        this.render()
        e.target.value = ''
      }
    },
    delTodo: function(e) {
      var index = this.getIndex(e.target.parentNode)
      this.todos.splice(index, 1)
      this.render()
    },
    toggle: function(e) {
      var index = this.getIndex(e.target.parentNode)
      this.todos[index].selected = !this.todos[index].selected
      this.render()
    },
    toggleAll: function() {
      this.todos.some( function(todo) { return !todo.selected } )
        ? this.todos.forEach( function(todo) { todo.selected = true } )
        : this.todos.forEach( function(todo) { todo.selected = false } )
      this.render()
    },
    delSelectedTodos: function() {
      this.todos = this.todos.filter( function(todo){ return !todo.selected })
      this.render()
    },
    todoDelShow: function(e) {
      $(e.target).hasClass('body-item')
      ? $(e.target).find('.body-del').show()
      : $(e.target).parent().find('.body-del').show()
    },
    todoDelHide: function(e) {
      $(e.target).hasClass('body-item')
      ? $(e.target).find('.body-del').hide()
      : $(e.target).parent().find('.body-del').hide() 
    },
    tryEdit: function (e) {
      $(e.target).next().val($(e.target).text()).show().select().focus()
    },
    submitEdit: function (e) {
      if (e.type == 'keydown') {
        if (e.keyCode === 13) e.target.blur()
        return
      }
      var index = this.getIndex(e.target.parentNode)
      if (e.target.value.trim()) {
        this.todos[index].text = e.target.value
        $(e.target).hide()
      } else {
        this.todos.splice(index, 1)
      }
      this.render()
    },
    changeVisibility: function (e) {
      this.visibility = $(e.target).text()
      $(e.target).siblings().removeClass('foot-visibility-in')
      $(e.target).addClass('foot-visibility-in')
      this.render()
    }
  }
  App.init()
})