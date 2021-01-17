import fetch from './fetch'

function login(params) {
  return fetch.get('login', {
    params
  })
}

export default {
  login
}
