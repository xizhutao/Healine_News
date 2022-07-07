import request from '@/utils/request'
/**
 *获取文章详情页
 * @param {*} articleId
 * @returns
 */
export const getAticleDetail = (articleId) => {
  return request({
    url: `/articles/${articleId}`
  })
}
/**
 *添加收藏
 * @param {*} target
 * @returns
 */
export const addCollect = (target) => {
  return request({
    url: '/article/collections',
    data: {
      target
    }
  })
}
/**
 * 取消收藏文章
 * @param {*} target
 * @returns
 */
export const cancelCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `/article/collections/${target}`
  })
}
/**
 * 点赞文章
 * @param {*} target
 * @returns
 */
export const goodJobArticle = (target) => {
  return request({
    method: 'POST',
    url: '/article/likings',
    data: {
      target
    }
  })
}
/**
 * 点赞文章
 * @param {*} target
 * @returns
 */
export const cancelGoodJobArticle = (target) => {
  return request({
    method: 'DELETE',
    url: `/article/likings/${target}`
  })
}









