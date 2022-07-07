import request from '@/utils/request'
/**
 *获取联想建议数据
 * @param {*} q
 * @returns
 */
export const getSearchSuggestion = (q) => {
  return request({
    method: 'GET',
    url: '/suggestion',
    params: {
      q
    }
  })
}

export const getSeachList = (params) => {
  return request({
    method: 'GET',
    url: '/search',
    params
  })
}

