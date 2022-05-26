export function getComputedStyle(el) {

}

export function getType(data) {
  return Object.prototype.toString.call(data).toLowerCase().slice(8, -1)
}

export function isFunction(data) {
  return getType(data) === 'function'
}

export function isUndefined(data) {
  return getType(data) === 'undefined'
}

export function isObject(data) {
  return getType(data) === 'object'
}


export function isBoolean(data) {
  return getType(data) === 'boolean'
}

export function merge(a, b) {
  return Object.assign({}, a, b)
}

export function _analyOptions(options) {
  if (isBoolean(options)) {
    return () => options
  }

  if (isObject(data)) {

  }

  return options 
}

