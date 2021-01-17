import * as _ from 'lodash'
import loginModule from './login'

// useless. fetch will return directly a promise.
function promiseWrapper(fetches) {
  return _.reduce(_.entries(fetches), (ret, [key, value]) => {
    return {
      ...ret,

      [key]: params => new Promise(resolve => {
        value(params).then(res => {
          resolve(res)
        })
      })
    }
  }, {})
}


export default {
  loginModule
}
