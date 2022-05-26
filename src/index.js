import { Unique } from './unique'

if (window) {
  window['Unique'] = Unique
}

var unique = new Unique({
  toast: function(context) {
    if (context?.response?.code !== 200) {
      return context?.response?.message
    }
  },
  plugins: [
    function(context, next) {
      context.header['x-power-by'] = 'UNIQUE'
      next()
    }
  ]
})

unique.dispatch({
  method: 'get',
  url: 'http://localhost:3000',
  params: 'fds'
}, {
  loading: function() {
    return false
  },
  retry: (function() {
    var count = 2
    return function(context) {
      if (context?.response?.code !== 200 && count >= 0) {
        return count--
      }
    }
  })(),
  toast: function(context) {
    // return '测试数据'
    // if (context.response.content) {
    //   return context.response.content
    // }
  },
  plugins: [
    function(context, next) {
      console.log('outer plugin')
      setTimeout(function() {
        next()
        console.log('outer -lugin')
      }, 2000)
    }
  ]
})
.then(res => {
  console.log(res)
})
.catch(error => {
  console.log(error)
})

export default Unique