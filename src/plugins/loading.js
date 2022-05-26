export function loadingPlugin(fn) {
  return async (context, next) => {
    // var count = fn(context)
    // console.log('i am start loading')
    console.log('i am start loading')
    await next()

    console.log('i am end loading')
  }
} 