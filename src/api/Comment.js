import request from '@/utils/request'
/**
 *获取评论列表、回复列表
 * @param {*} params
 * @returns
 */
export const getCommentList = (params) => {
  return request({
    method: 'GET',
    url: '/comments',
    params
  })
}

/**
 *对评论或评论回复点赞
 * @param {*} target
 * @returns
 */
export const addCommentLike = (target) => {
  return request({
    method: 'POST',
    url: '/comment/likings',
    data: {
      target
    }
  })
}

/**
 *取消评论或评论回复点赞
 * @param {*} target
 * @returns
 */
export const cancelCommentLike = (target) => {
  return request({
    method: 'DELETE',
    url: `/comment/likings/${target}`
  })
}

/**
 *对文章或者评论进行评论
 * @param {*} data
 * @returns
 */
export const CommentPost = (data) => {
  return request({
    method: 'POST',
    url: '/comments',
    data
  })
}

