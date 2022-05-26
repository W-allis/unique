import axios from 'axios'
import { loadingPlugin, toastPlugin, retryPlugin } from './plugins/index'

import { isFunction, isUndefined, merge } from './utils/index'

import Emitter from './lib/emit'

function noop() {} 

export class Unique {
  defaultConfig = {
    loading: true,
    toast: true
  }

  _plugins = []
  _config = null

  constructor(options) {
    this.event = new Emitter()
    this._config = merge(this.defaultConfig, options) 
  }

  schedule(_plugins, next) {
    var _this = this,
      context = this

    function dispatch(i) {
      var plugin = _plugins[i]

      if (i === _plugins.length) plugin = next

      try {
        return Promise.resolve(plugin(context, dispatch.bind(context, i + 1)))
      } catch (error) {
        return Promise.reject(error)
      }
    }

    return dispatch.call(_this, 0)
  }

  dispatch(params, options) {
    var context = this
    this.event.emit('beforeRequest', context)

    options = this._analyOptions(options)

    var plugins = [...options.plugins]

    if (options.toast) {
      plugins.push(toastPlugin(scheduler.bind(context, [
        this._config.toast,
        options.toast || noop
      ])))
    }

    if (options.loading) {
      plugins.push(loadingPlugin(options.loading))
    }

    if (options.retry) {
      plugins.push(retryPlugin(options.retry))
    }
    
    return this.schedule([...plugins, request], () => {
      this.event.emit('afterRequest', context)
    })

    async function request(context, next) {
      console.log('i am beforeRequest')
      try {
        context.response = await axios({ ...params })
        console.log('i am afterRequest')
        next()
      } catch (error) {
        context.response = error
        console.log('i am afterRequest error')
        next()
      }
    }

    function scheduler(events) {
      var event = null,
        result = null

      while (event = events.shift()) {
        var _n = event(context)
        result = isUndefined(_n) ? result : _n
      }

      return result
    }
  }

  _analyOptions(options) {
    return options
  }

  use(plugin) {
    if (!isFunction(plugin)) {
      throw 'plugin must be a function'
    }
    this._plugins.push(plugin)
  }
}


