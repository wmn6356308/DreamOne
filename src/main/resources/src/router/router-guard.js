import {
  Message
} from 'element-ui'
import {
  sessionStorageGet,
  sessionStorageRemove
} from '@/utils/index'
import {
  ROUTE_WHITE_LIST
} from '../constants'

const userInfoValidation = (to, from, next) => {
  const now = Date.now()
  const cache = sessionStorageGet('userInfo')

  if (_.includes(ROUTE_WHITE_LIST, to.path)) return next()

  if (!cache) {
    Message.warning('请先登录！')

    return next({
      path: '/login',
      params: {
        previousRoute: to
      }
    })
  }

  if (cache.timestamp && now - cache.timestamp > 3600000) {
    Message.warning('账号过期，请重新登录！')
    sessionStorageRemove('userInfo')

    return next({
      path: '/login',
      params: {
        previousRoute: to
      }
    })
  }

  next()
}

export default (to, from, next) => {
  userInfoValidation(to, from, next)
}
