import loading_gif from '../assets/images/loading1.gif'

class Loading {
  constructor(options = {}) {
    options = options || {}

    this.dom = document.createElement('div')

    this.dom.innerHTML = `<image class='center' src=${loading_gif}></image>`

    this.dom.classList.add('loading_mask')

    this.isClose = true
  }

  close() {
    if (this.isClose) return
    this.dom.classList.add('hide')
    document.body.removeChild(this.dom)
    this.isClose = true
  }

  open() {
    this.isClose = false

    document.body.appendChild(this.dom)
    this.dom.classList.remove('hide')
  }
}
export default Loading
