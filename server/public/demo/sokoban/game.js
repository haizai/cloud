'use strict';
let game
(function(){
  const Game = function(arr){
    this.missions = [],
    this.unit = 40,
    this.el = {
      mission: document.getElementById('mission'),
      things: document.getElementById('things'),
      change: document.getElementById('change'),
      level: document.getElementById('level'),
      reset: document.getElementById('reset'),
      step: document.getElementById('step'),
      select: document.getElementById('select'),
      back: document.getElementById('back'),
    }
    this.nowLevel = 0,
    this.add(arr)
    this.initSelect()
    this.bindEvent()
    this.nowMission().init()
  }

  Game.prototype = {
    add(arr){
      arr.forEach(obj=>{
        let mission = new Mission(obj)
        mission.game = this
        mission.level = this.missions.length
        this.missions.push(mission)
      })
    },
    initSelect(){
      let txt = ''
      for (let i = 0; i < this.missions.length; i++) {
        txt+='<option value="'+i+'">第 '+(i+1)+' 关</option>'
      }
      this.el.select.innerHTML = txt
    },
    nowMission(){
      return this.missions[this.nowLevel]
    },
    next(){
      if (this.missions.length - 1 === +this.nowLevel) {
        this.nowLevel = 0
      } else {
        this.nowLevel++
      }
      this.nowMission().init()
    },
    changeLevel(level){
      this.nowLevel = level
      this.nowMission().init()
    },
    bindEvent() {
      document.addEventListener('keydown', e => {
        switch (e.keyCode) {
          case 37:
          case 65:
            e.preventDefault()
            this.emit('go','l')
            break;
          case 38:
          case 87:
            e.preventDefault()
            this.emit('go','t')
            break;
          case 39:
          case 68:
            e.preventDefault()
            this.emit('go','r')
            break;
          case 40:
          case 83:
            e.preventDefault()
            this.emit('go','b')
            break;
          case 8:
          case 46:
            e.preventDefault()
            this.emit('back')
            break;
          case 27:
            e.preventDefault()
            this.emit('init')
            break;
        }
      }, false)
      this.el.reset.addEventListener('click', e => {
        this.emit('init')
      }, false)
      this.el.back.addEventListener('click', e => {
        this.emit('back')
      }, false)   
      this.el.select.addEventListener('change', e => {
        this.changeLevel(e.target.value)
      }, false)
    },
    /**
     * [emit 子类on方法]
     * @param  {[string]} name 方法名
     * @param  {[arguments]} arg  参数
     */
    emit(name, arg){
      this.nowMission().on(name,arg)
    }
  }

  const Mission  = function(obj){
    this.data = obj
    this.level = null
    this.game = null
    this.width = null
    this.height = null
    this.walls = null
    this.flowers = null
    this.boxes = null
    this.cells = null
    this.person = null
    this._cells = null
    this.history = null
    // this.init()

  }

  Mission.prototype = {
    init(){
      this.history = []
      this.initData()
      this.initCells()
      this.initBoxes()
      this.initPerson()
      this.initWalls()
      this.initLength()
      this.initRender()
    },
    initData(){
      let o = JSON.parse(JSON.stringify(this.data))
      // this.width = o.width
      // this.height = o.height
      // this.walls = o.walls
      this.flowers = o.flowers
      this.boxes = o.boxes
      this.cells = o.cells
      this.person = new Person(o.person[0],o.person[1])
      this._cells = {}
    },
    initCells(){
      this.cells.forEach(item => {
        let [x, y] = item
        let cell = new Cell(x,y)
        this._cells[x + '_' + y] = cell
      })
    },
    initBoxes(){
      this.boxes.forEach(box => {
        let [x, y] = box
        this.getCell(x,y).thing = 'box'
      })
    },
    initPerson(){
      this.getCell(this.person.x,this.person.y).thing = this.person
    },
    initWalls(){
      var walls = new Set()
      this.cells.forEach(cell=>{
        let [x,y] = cell
        let roundCells = [[x+1,y+1],[x+1,y],[x+1,y-1],[x,y+1],[x,y-1],[x-1,y+1],[x-1,y],[x-1,y-1]]
        roundCells.forEach(item=>{
          let [a,b] = item
          if (!this.getCell(a,b)) {
            walls.add(a + '_' + b)
          }
        })
      })
      this.walls = [...walls].map(str=>{
        return str.split('_')
      })
    },
    initLength(){
      let maxWidth = 0, maxHeight = 0
      this.cells.forEach(cell=>{
        if (cell[0] > maxWidth) {
          maxWidth = cell[0]
        }
        if (cell[1] > maxHeight) {
          maxHeight = cell[1]
        }
      })
      this.width = maxWidth+2
      this.height = maxHeight+2
    },
    getCell(x,y) {
      return this._cells[x + '_' + y]
    },
    /**
     * [on 父类emit方法]
     * @param  {[string]} name 方法名
     * @param  {[arguments]} arg  参数
     */
    on(name,arg){
      switch (name) {
        case 'go':
          let x = this.person.x
          let y = this.person.y
          let x1,y1,x2,y2

          switch (arg) {
            case 't':
              y1 = y - 1
              y2 = y - 2
              x1 = x2 = x
              break;
            case 'b':
              y1 = y + 1
              y2 = y + 2
              x1 = x2 = x
              break;
            case 'l':
              x1 = x - 1
              x2 = x - 2
              y1 = y2 = y
              break;
            case 'r':
              x1 = x + 1
              x2 = x + 2
              y1 = y2 = y
            break;
          }

          let lastCell = this.getCell(x,y)
          let nextCell = this.getCell(x1,y1)
          let next2Cell = this.getCell(x2,y2)

          if (!nextCell) {
            return
          }

          if (nextCell.thing === 'box') {
            if (!next2Cell) {
              return
            }
            if(next2Cell.thing !== null) {
              return
            }
            next2Cell.thing = 'box'
            this.person.x = x1
            this.person.y = y1
            nextCell.thing = this.person
            lastCell.thing = null

            this.history.push([arg,true])
          } else if (nextCell.thing === null) {
            this.person.x = x1
            this.person.y = y1
            nextCell.thing = this.person
            lastCell.thing = null

            this.history.push([arg,false])
          }

          this.render()
          this.test()
          break;
        case 'init':
          this.init()
          break;
        case 'back':
          this.back()
          break;
        default:
          break;
      }
    },
    /**
     * 后退一步
     */
    back(){
      if (this.history.length === 0) {
        return
      }

      let [type, hasBox] = this.history.pop()
      let x = this.person.x
      let y = this.person.y
      let x1 = x,x2 = x, y1 = y, y2 = y

      switch (type) {
        case 't': y1 = y+1; y2 = y-1; break;
        case 'b': y1 = y-1; y2 = y+1; break;
        case 'l': x1 = x+1; x2 = x-1; break;
        case 'r': x1 = x-1; x2 = x+1; break;
      }

      let nowCell = this.getCell(x,y)
      let lastCell = this.getCell(x1,y1)
      let nextCell = this.getCell(x2,y2)

      lastCell.thing = this.person 
      this.person.x = x1
      this.person.y = y1

      if (hasBox) {
        nextCell.thing = null
        nowCell.thing = 'box'
      } else {
        nowCell.thing = null
      }
      this.render()
    },
    test(){
      if (this.flowers.every(flower=>{
        return this.getCell(flower[0],flower[1]).thing === 'box'
      })) {
        alert('你通过了第 ' + (this.level + 1) + ' 关，共用 ' + this.history.length + ' 步。')
        this.game.next()
      }
    },
    initRender() {
      let txt = ''
      let unit = this.game.unit

      this.flowers.forEach(flower=> {
        let top = 'top: ' + (flower[1] * unit) + 'px;'
        let left = 'left: ' + (flower[0] * unit) + 'px;'
        txt+="<span class='flower' style='" + top + left + " '></span>"
      })
      this.walls.forEach(wall=> {
        let top = 'top: ' + (wall[1] * unit) + 'px;'
        let left = 'left: ' + (wall[0] * unit) + 'px;'
        txt+="<span class='wall' style='" + top + left + " '></span>"
      })
      this.game.el.things.innerHTML = txt
      let mission = this.game.el.mission
      mission.style.width = unit * this.width + 'px'
      mission.style.height = unit * this.height + 'px'
      mission.style.marginLeft = (980 - unit * this.width)/2 + 'px'
      this.game.el.level.innerHTML = this.level + 1
      this.game.el.select.value = this.level

      this.render()
    },
    render(){
      let unit = this.game.unit
      let txt = ''

      for (let name in this._cells) {
        let [x,y] = name.split('_')
        let top = 'top: ' + (y * unit) + 'px;'
        let left = 'left: ' + (x * unit) + 'px;'

        if (this._cells[name].thing === 'box') {
          txt+="<span class='box' style='" + top + left + " '></span>"
        }

        // txt+="<span class='cell' style='" + top + left + " '></span>"
      }

      let _top = 'top: ' + (this.person.y * unit) + 'px;'
      let _left = 'left: ' + (this.person.x * unit) + 'px;'
      txt+="<span class='person' style='" + _top + _left + " '></span>"
      this.game.el.step.innerHTML = this.history.length
      this.game.el.change.innerHTML = txt
    },
  };

  const Cell = function(x,y){
    this.x = x
    this.y = y
    this.thing = null
  }

  const Person = function(x,y){
    this.x = x
    this.y = y
  }

   game = new Game(GameData)
  
}())

