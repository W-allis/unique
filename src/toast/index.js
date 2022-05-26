/**
 * @params duraction number
 * @params show function
 */

import { isFunction } from '../utils'

export class Toast {
  constructor(options) {
    this._duration = options.duration || 2000
    this._manual = options.manual || false
    this.timer = null
    this._wrapper = options.wrapper || document.body

    this.render()
  }

  render() {
    var div = this.wrapper = document.createElement('div')
    div.classList.add('toast-wrapper')
    this._wrapper.appendChild(div)
  }

  show(content) {
    this.wrapper.textContent = content
    this.wrapper.classList.add('is-active')

    this.timer = setTimeout(() => {
      if (!this._manual) {
        this.hide()
      }
    }, this._duration)

    return this.hide
  }

  hide() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.wrapper.classList.remove('is-active')
  }
}

var instance = null

export default Toast