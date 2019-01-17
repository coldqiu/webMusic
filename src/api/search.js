import jsonp from 'common/js/jsonp'
import {commParams, options} from './config'
import axios from 'axios'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commParams, {
    platform: 'h5',
    needNewCode: 1,
    format: 'json'
  })

  return jsonp(url, data, options)
}


export function search(query, page, zhida, perpage) {
  // const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  const url = 'http://127.0.0.1:5000/api/getQuery'

  const data = Object.assign({}, commParams, {
    platform: 'h5',
    needNewCode: 1,
    w: query,
    zhidaqu: zhida,
    catZhida: zhida ? 1 : 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage,
    n: perpage,
    p: page,
    remoteplace: 'txt.mqq.all',
    uin: 0,
    format: 'json'
  })
  // return jsonp(url, data, options)

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
