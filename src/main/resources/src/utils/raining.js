/*
 * 2018/03/26
 * canvas绘制雨滴
 * */

const EXPORT_OBJ = {
  rains: [],
  cas: null,
  ctx: null,
  _W: window.innerWidth,
  _H: window.innerHeight,
  isStop: false,
  setCanvasLayout() {
    this._W = window.innerWidth
    this._H = window.innerHeight

    this.cas.width = this._W
    this.cas.height = this._H
  },
  setResizeHandler() {
    window.addEventListener('resize', () => this.setCanvasLayout())
  },
  removeResizeHandler() {
    window.removeEventListener('resize', eventRainHandler)
  },
  stop() {
    this.removeResizeHandler()
    this.isStop = true
  },
  init(dom) {
    var count = 1 * this._W,
      i = 0;

    this.cas = dom
    this.ctx = this.cas.getContext('2d')
    this.rains = []
    this.isStop = false

    this.setResizeHandler()
    this.setCanvasLayout()

    for (; i < count; i++) {
      this.rains.push(new rainDrop())
      if (i < count * 0.01) {
        this.rains.push(new rainDrop(true))
      }
    }
    this.render()
  },
  render() {
    this.ctx.clearRect(0, 0, this._W, this._H)

    this.rains.forEach(v => {
        v.move()
      })

      !this.isStop && window.requestAnimationFrame(() => this.render())
  }
}

window.eventRainHandler = EXPORT_OBJ.setCanvasLayout

export default EXPORT_OBJ


function rainDrop(flag) {
  this.flag = flag
  this.step = 0.01


  this.init(true)
}

rainDrop.prototype = {
  constructor: rainDrop,

  init: function (first = false) {
    this.width = this.flag ? Math.floor(Math.random() * 10 + 5) : [0.3, 0.4, 0.5, 0.6, 0.7][Math.floor(Math.random() * 5)]
    this.height = Math.random() * 7 + 3
    this.opacity = (Math.random() * (this.flag ? 0.4 : 0.2) + 0.01).toFixed(2)
    this.x = Math.random() * EXPORT_OBJ._W
    this.y = first ? Math.random() * EXPORT_OBJ._H : -this.height
    this.gravity = this.flag ? 0 : Math.random() * 0.3 + 0.3
    this.color = this.randomColor(!this.flag)
    this.v = this.flag ? [0.05, 0.1, 0.15, 0.2, 0.25][Math.floor(Math.random() * 5)] : 0
  },

  draw: function () {
    let ratioX;
    let {
      ctx
    } = EXPORT_OBJ;

    ctx.save()
    ratioX = this.width / this.height
    ctx.scale(ratioX, 1)
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.moveTo((this.x + this.width) / ratioX, this.y)
    ctx.arc(this.x / ratioX, this.y, this.height, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
    ctx.restore()
  },

  randomColor: function (isWhite = true) {
    var colorStr = 'rgba(',
      randomNum = 0;

    for (var i = 0; i < 3; i++) {
      randomNum = Math.floor(Math.random() * 256)
      colorStr += randomNum
      colorStr += ', '
    }

    colorStr += this.opacity
    colorStr += ')'

    return isWhite ? 'rgba(255, 255, 255, ' + this.opacity + ')' : colorStr
  },

  move: function () {
    if (this.y > EXPORT_OBJ._H) {
      this.init()
    }

    if (this.flag) {
      if (this.width > 8) {
        this.step = -0.01
      } else if (this.width < 5) {
        this.step = 0.01
      }
      this.width += this.step
      this.height -= this.step
    }

    this.v += this.gravity
    this.y += this.v
    this.draw()
  },

  // 十六进制颜色转换为rgb
  toRgb: function () {
    var colorStr = '',
      colorArr = []
    if (this.color.length == 4) {
      for (var i = 1; i < 4; i++) {
        colorArr.push(this.color.slice(i, i + 1).concat(this.color.slice(i, i + 1)))
      }
    } else if (this.color.length == 7) {
      for (var i = 1; i < 7; i += 2) {
        colorArr.push(this.color.slice(i, i + 2).concat(this.color.slice(i, i + 2)))
      }
    }

    colorArr.forEach(function (v) {
      colorStr += parseInt('0x' + v)
      colorStr += ', '
    })

    this.color = colorStr.substring(0, colorStr.length - 2)
  }
}
