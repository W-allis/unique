import { isFunction } from '../utils'

function noop() {}

export function retryPlugin(fn) {
  if (!isFunction(fn)) {
    throw 'retry fn must be function'
  }
  return async (context, next) => {
    await _()

    async function _() {
      await next()

      var retry = (fn || noop)(context)

      if (retry) {
        await _()
      }
    }
  }
} 