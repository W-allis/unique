import { isBoolean } from './index'
import defaulter, { Toast } from '../toast'

function noop() {}

export function toToastPlugin(data) {
  if (isBoolean(data) && data) {
    return defaulter
  }

  if (isObject(data)) {
    return new Toast(data)
  }

  return function() {
    return {
      hide: noop
    }
  }
}