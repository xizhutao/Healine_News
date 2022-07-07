import request from '@/utils/request'
/**
 *我的频道
 * @returns
 */
export const getMyChannels = () => {
  return request({
    url: '/user/channels'
  })
}
/**
 *获取文章列表
 * @param {object} param0
 * @returns
 */
// eslint-disable-next-line camelcase
export const getAticleList = ({ channel_id, timestamp }) => {
  return request({
    url: 'articles',
    params: { channel_id, timestamp }
  })
}

/**
 *获取所有频道列表数据
 * @returns
 */
export const getAllChannels = () => {
  return request({
    url: 'channels'
  })
}
/**
 *储存频道
 * @param {*} channels
 * @returns
 */
export const saveChannels = (channels) => {
  return request({
    url: 'user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}
