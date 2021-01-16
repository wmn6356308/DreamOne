import Vue from 'vue'
import axios from 'axios'
import * as _ from 'lodash'
import {
  Message
} from 'element-ui'


import Loading from '../utils/loading'
import {
  sessionStorageRemove,
  sessionStorageGet,
  sessionStorageSet
} from '../utils/index'
import router from '../router/index'
import {
  ROUTE_WHITE_LIST
} from '../constants'

const loading = new Loading()

// 页面在下面时间内没有数据请求，则重新登录
const TIMEOUT = 3600000

const fetch = axios.create({
  // baseURL: process.env.apiHost,
  timeout: 30000,
  withCredentials: true
})

const path = _.get(router, 'currentRoute.path', '')

fetch.interceptors.request.use(
  config => {

    const cache = sessionStorageGet('userInfo')
    const now = Date.now()

    if (!_.includes(ROUTE_WHITE_LIST, path)) {
      if (!cache) {
        Message.warning('请登录！')

        sessionStorageSet('ERROR_MESSAGE', 'NOLOGIN')

        router.push({
          path: '/login'
        })
      }

      if (cache && now - cache.timestamp > TIMEOUT) {
        Message.warning('账号过期，请重新登录！')

        sessionStorageRemove('userInfo')
        sessionStorageSet('ERROR_MESSAGE', 'TIMEOUT')

        router.push({
          path: '/login',
          params: {
            previousRoute: router.currentRoute
          }
        })
      }
    }

    loading.open()

    let url = config.url
    const timestamp = 'timestamp=' + new Date().getTime().toString()

    url = url.indexOf('?') > 0 ? url + '&' + timestamp : url + '?' + timestamp

    return {
      ...config,

      url
    }
  },
  err => {
    loading.close();
    Message.error(err || '服务器异常')
  }
)

fetch.interceptors.response.use(
  res => {
    loading.close();

    const cache = sessionStorageGet('userInfo')
    sessionStorageSet('userInfo', cache)

    if (!_.includes(ROUTE_WHITE_LIST, path)) {
      const cache = sessionStorageGet('userInfo')

      sessionStorageSet('userInfo', {
        ...cache,
        timestamp
      })
    }

    if (!res.data.success) {
      Message.error(res.data.message || '服务器异常')
    }

    return res
  },
  err => {
    Message.error(err || '服务器异常')
    loading.close();
  }
)

Vue.prototype.$fetch = fetch
