export function toastPlugin(fn) {
  return async (context, next) => {
    console.log('i am start toast')
    await next()

    var content = null
    try {
      content = fn(context)
    } catch (error) {
      content = error
    }

    if (content) {
      console.log('i am end toast')
    }
  }
} 