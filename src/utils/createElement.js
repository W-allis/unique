import { isFunction } from './index'

class Watcher {
  constructor(node, key, type) {
    Watcher.depper = this
    this.node = node
    this.value = value
    this.update(this.value)
    Watcher.depper = null
  }

  update(value) {
    this.node.setAttribute(type, value)
  }
}

class Dep {
  subs = []
  
  addSub(watcher) {
    this.subs.push(watcher)
  }

  notify(value) {
    this.subs.forEach(watcher => {
      watcher.update(value)
    })
  }
}

function proxy(data) {
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key])
  })
}

function defineReactive(data, key, value) {
  var dep = new Dep
  Object.defineProperty(data, key, {
    get() {
      if (Watcher.depper) {
        dep.addSub(depper)
      }
      return value
    },
    set(newValue) {
      dep.notify(newValue)
      data[key] = newValue
      return true
    }
  })
}

export class Component {
  state = {}
  
  constructor(wrapper) {
    proxy(this.state)
    if (isFunction(this.render)) {
      var root = this.render()

      wrapper = wrapper || document.body

      wrapper.appendChild(root)
    }
  }

}

export function createElement() {
 
  
 
}

 