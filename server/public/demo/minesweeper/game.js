'use strict';

let game;

(function(){
  const Game = function(){
    this.el = {
      height: document.getElementById('height'),
      width: document.getElementById('width'),
      count: document.getElementById('count'),
      confireDetailed: document.getElementById('confire-detailed'),
      container: document.getElementById('container'),
      minfo: document.getElementById('minfo'),
    }
    this.mission = null
    this.bindEvent()
  }
  Game.prototype = {
    bindEvent(){

      function inputOnlyInt(dom) {
        let oldVal = 0
        dom.addEventListener('keydown', e => {
          if (/^\d*$/.test(e.target.value)) {
            oldVal = e.target.value
          }
        }, false) 
        dom.addEventListener('keyup', e2 =>{
          let nowVal = e2.target.value
          if (!/^\d*$/.test(nowVal)) {
            dom.value = oldVal
          }
        }, false)
      }
      inputOnlyInt(this.el.height)
      inputOnlyInt(this.el.width)
      inputOnlyInt(this.el.count)

      this.el.confireDetailed.addEventListener('click', e=>{


        let width = +this.el.width.value
        let height = +this.el.height.value
        let count = +this.el.count.value


        if (!width) {
          alert('请输入宽度')
          return
        }
        if (!height) {
          alert('请输入高度')
          return
        }
        if (!count) {
          alert('请输入炸弹数')
          return
        }

        if (width * height < count + 2) {
          alert('炸弹数过大')
          return
        }
        if (this.mission){
          this.mission.destroy()
        }
        this.mission = new Mission({
          width,
          height,
          count,
        })
        this.mission.game = this
        this.mission.init()
      }, false)


    },

  }

  const Mission = function(o){
    this.width = o.width
    this.height = o.height
    this.allMineCount = o.count
    this._cells = {}
    this.stage = 'init' //init playing died win
    this.game = null
    this.dom = null
    this.mineCount = o.count
    this.safeCount = o.width * o.height - o.count
    this.mineCells = []
  }
  Mission.prototype = {

    init(){
      let dom = document.createElement('div')
      dom.id = 'mission'
      this.game.el.container.appendChild(dom)
      this.dom = dom

      this.initCells()
      this.info()
      this.bindEvent()
    },
    bindEvent(){

      // 阻止右键菜单
      this.dom.addEventListener('contextmenu',e=>{
        e.preventDefault()
      },false)

      this.dom.addEventListener('mousedown', e =>{
        if (!e.target.classList.contains('not-show')) return

        let id = e.target.id
        let [x,y] = id.split('_')

        if (e.button === 0) {
          if (this.stage === 'playing') {
            let cell = this._cells[id]
            if (!cell.hasFlag) {
              this.go(+x,+y)
            }
          } else if (this.stage === 'init') {
            this.stage = 'playing'
            this.initMine(+x,+y)
          }
        } else if (e.button === 2) {
          if (this.stage === 'playing') {
            let cell = this._cells[id]
            cell.toggleFlag()
          }
        }


      }, false)

    },
    // 初始化格子
    initCells(){
      for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
          let cell = new Cell(i,j,this)
          this._cells[i+'_'+j] = cell
          cell.init(i,j)
        }
      }
      let unit = 40
      this.dom.style.width = this.width * unit + 'px'
      this.dom.style.height = this.height * unit + 'px'
    },
    getCell(x,y){
      return this._cells[x+'_'+y]
    },
    // 当点击第一个格子以后，初始化地雷
    initMine(x,y){
      let first = x * this.width + y
      let mineSet = new Set()

      let getRandomInt = () => {
        let min = 0
        let max = this.width * this.height - 1
        return Math.floor(Math.random() * (max - min)) + min;
      }

      do {
        let num = getRandomInt()
        if (num !== first) {
          mineSet.add(num)
        }
      } while (mineSet.size < this.allMineCount)

      mineSet.forEach( num => {
        let x = Math.floor(num/this.width)
        let y = num%this.width
        let cell = this.getCell(x,y)
        this.mineCells.push(cell)
        cell.isMine = true
      });

      this.initMineCount()
      this.go(x,y)

    },
    // 计算每个格子周围地雷数
    initMineCount(){
      for (let key in this._cells) {
        let cell = this._cells[key]
        if (!cell.isMine) {
          let x = cell.x
          let y = cell.y
          let count = 0
          this.getRoundCells(x,y).forEach(roundCell=>{
            if (roundCell.isMine) 
              count++ 
          })
          cell.roundMineCount = count
        }
      }
    },
    // 返回周围一圈格子
    getRoundCells(x,y){
      let poses = [[x-1,y-1],[x,y-1],[x+1,y-1],[x-1,y],[x+1,y],[x-1,y+1],[x,y+1],[x+1,y+1]]
      let ret = []
      poses.forEach(pos=>{
        let roundCell = this.getCell(pos[0],pos[1])
        if (roundCell) {
          ret.push(roundCell)
        }
      })
      return ret
    },
    go(x,y) {
      let cell = this.getCell(x,y)

      console.log(cell)
      let statu = cell.show(true)
      if (statu === 'continue') {
        goContinue(cell,this)
      } else if (statu === 'mine') {
        this.died()
      }

      // 当cell的地雷数为0时，继续验证其周围格子
      function goContinue(c,self){
        self.getRoundCells(c.x,c.y).forEach( item => {
          let s = item.show()
          if (s === 'continue') {
            goContinue(item,self)
          }
        })
      }
      this.test()
    },
    // 删除dom，同时取消事件绑定
    destroy(){
      this.dom.parentElement.removeChild(this.dom)
    },
    died(){
      this.stage = 'died'
      this.showAll()
      this.info()
    },
    win(){
      this.stage = 'win'
      this.showAll()
      this.info()
    },
    showAll(){
      for (let key in this._cells) {
        let cell = this._cells[key]
        if (!cell.isShow) {
          cell.show(true)
        }
      }
    },
    info(){
      switch (this.stage) {
        case 'died':
          this.game.el.minfo.innerHTML = 'YOU DIED'
          break;
        case 'win':
          this.game.el.minfo.innerHTML = 'YOU WIN'
          break;
        default:
          this.game.el.minfo.innerHTML = '安全格子：'+this.safeCount+' 炸弹：' + this.mineCount
          break;
      }
      
    },
    test(){
      if (this.safeCount === 0) {
        this.win()
      }
      if (this.mineCount === 0 && this.mineCells.every(cell=>cell.hasFlag)) {
        this.win()
      }
    }
  }


  const Cell = function(x,y,mission){

    this.x = x
    this.y = y
    this.isMine = false
    this.hasFlag = false
    this.isShow = false
    this.roundMineCount = null
    this.mission = mission
    this.dom = null

  }
  Cell.prototype = {
    init(){
      let x = this.x
      let y = this.y
      let unit = 40
      let dom = document.createElement('span')
      dom.classList.add('cell')
      dom.classList.add('not-show')
      dom.style.top = x * unit + 'px'
      dom.style.left = y * unit + 'px'
      dom.id = x + '_' + y
      this.mission.dom.appendChild(dom)
      this.dom = dom
    },

    show(isFrist) {
      if (this.isShow) {
        return 'alreadyShow'
      }

      if (this.isMine) {

        if (isFrist) {
          this.isShow = true
          this.dom.classList.remove('not-show')
          this.dom.classList.add('mine')
          this.mission.safeCount--
          this.mission.info()
          return 'mine'
        } else {
          return 'break'
        }

      } else {
        this.isShow = true
        if (this.hasFlag) {
          this.toggleFlag()
        }
        this.dom.classList.remove('not-show')
        this.dom.classList.add('mine'+this.roundMineCount)
        this.mission.safeCount--
        this.mission.info()
        if (this.roundMineCount === 0) {
          this.dom.innerHTML = ''
          return 'continue'
        } else {
          this.dom.innerHTML = this.roundMineCount
          return 'break'
        }
      }

      
    },
    toggleFlag(){
      this.hasFlag = !this.hasFlag
      this.dom.classList.toggle('flag')
      this.hasFlag ? this.mission.mineCount-- : this.mission.mineCount++
      this.mission.info()
      this.mission.test()
    }
  }

  game = new Game()

}());