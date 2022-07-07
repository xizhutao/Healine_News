import request from '@/utils/request'
/**
 *获取短信验证码
 * @param {number} mobile
 * @return promise
 */
export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}

/**
 *登录
 * @param {mobile , code} param0
 * @returns promise
 */
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}
/**
 *获取用户信息
 * @returns
 */
export const getUserInfo = () => {
  return request({
    url: 'user'
  })
}
/**
 *根据用户id取消关注
 * @param {*} autId
 * @returns
 */
export const cancelFollow = (autId) => {
  return request({
    method: 'DELETE',
    url: `/user/followings/${autId}`
  })
}
/**
 *根据id关注作者
 * @param {*} data
 * @returns
 */
export const addFollow = (target) => {
  return request({
    method: 'POST',
    url: '/user/followings',
    data: {
      target
    }
  })
}
/**
 *获取用户信息
 * @returns
 */
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/user/profile'
  })
}
/**
 *修改用户的个人信息
 * @param {*} username
 * @returns
 */
export const updateName = (data) => {
  return request({
    method: 'PATCH',
    url: '/user/profile',
    data
  })
}

/**
 *修改用户头像
 * @param {*} photo
 * @returns
 */
export const updatePhote = (data) => {
  return request({
    method: 'PATCH',
    url: '/user/photo',
    data
  })
}
