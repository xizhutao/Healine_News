/**
 * 封装对本地存储的操作
 */

/**
 *获取
 * @param {*} key
 * @returns
 */
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (err) {
    return res
  }
}

/**
 *设置
 * @param {*} key
 * @param {*} value
 */
export function setItem (key, value) {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}
/**
 *根据key删除本地存储中的一个
 * @param {*} key
 */
export function remove (key) {
  window.localStorage.removeItem(key)
}
/**
 * 清除所有的本地存储
 */
export function clearItem () {
  window.localStorage.clearItem()
}
