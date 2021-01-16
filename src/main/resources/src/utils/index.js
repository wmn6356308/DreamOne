/**
 * @description 常用工具方法
 * @author cp3
 * @Date 2021.01.16
 */

export function sessionStorageSet(key, value) {
  return window.sessionStorage.setItem(key, JSON.stringify(value))
}

export function sessionStorageGet(key) {
  let result = window.sessionStorage.getItem(key)

  return result ? JSON.parse(result) : null
}

export function sessionStorageRemove(key) {
  return window.sessionStorage.removeItem(key)
}

export function localStorageSet(key, value) {
  return window.localStorage.setItem(key, JSON.stringify(value))
}

export function localStorageGet(key) {
  let result = window.localStorage.getItem(key)

  return result ? JSON.parse(result) : null
}

export function localStorageRemove(key) {
  return window.localStorage.removeItem(key)
}

/**
 *  删除对象的某些属性
 *  @param {Object} obj 目标对象
 *  @param {Array}  props 要删除的属性
 *  @return {Object} 删除属性后的对象
 *   */
export function deleteProps(obj, props = []) {

  props.forEach(prop => {
    Object.keys(obj).forEach(item => {
      prop == item && delete obj[item]

      if (Array.isArray(obj[item])) obj[item].forEach(v => deleteProps(v, props))
    })
  })

  return obj
}

/**
 *  删除对象的某些属性
 *  @param {Object} obj 目标对象
 *  @param {Object}  props 要添加的属性对象
 *  @return {Object} 添加属性后的对象
 *   */
export function addProps(obj, props = {}) {

  Object.assign(obj, props)

  Object.keys(obj).forEach(item => {
    if (Array.isArray(obj[item])) obj[item].forEach(v => addProps(v, props))
  })

  return obj
}

/**
 * 将下划线属性名转换成驼峰命名
 */
export function toCamelCase(target) {

  if (!target) return ''

  let reg = /_[a-z]{1}/g

  if (typeof target === 'string') return target.replace(reg, res => res.substring(1).toUpperCase())

  if (typeof target !== 'object' || Array.isArray(target)) return target

  Object.entries(target).forEach(([key, value]) => {
    delete target[key] // 删除原来的属性

    key = key.replace(reg, res => res.substring(1).toUpperCase()) // 将下划线属性名转换成驼峰命名

    target[key] = value // 重新赋值
  })

  return target
}

/**
 * 搜索关键字高亮
 */
export function highLightKeywords(keywords, target) {
  if (!keywords) return target

  let reg = new RegExp(keywords, 'g')

  return target.replace(reg, `<span class="high-light-style">${keywords}</span>`)
}
