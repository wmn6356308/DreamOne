import {
  Message
} from 'element-ui'
import {
  sessionStorageGet,
  sessionStorageRemove,
  sessionStorageSet
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
    sessionStorageSet('ERROR_MESSAGE', 'NOLOGIN')

    return next({
      path: '/login'
    })
  }

  if (cache.timestamp && now - cache.timestamp > 3600000) {
    Message.warning('账号过期，请重新登录！')
    sessionStorageRemove('userInfo')
    sessionStorageSet('ERROR_MESSAGE', 'TIMEOUT')

    return next({
      path: '/login'
    })
  }

  next()
}

export default (to, from, next) => {
  userInfoValidation(to, from, next)
}
