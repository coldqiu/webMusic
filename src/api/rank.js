import jsonp from 'common/js/jsonp'
import {commParams, options} from "./config";
import axios from 'axios'

export function getTopList() {
  // const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const url = 'http://127.0.0.1:5000/api/getTopList'

  const data = Object.assign({}, commParams, {
    uin: 0,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    _: 1547260636011
  })

  // return jsonp(url, data, options)

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getMusicList(topid) {
  // const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const url = 'http://127.0.0.1:5000/api/getMusicList'
  const data = Object.assign({}, commParams, {
    platform: 'h5',
    needNewCode: 1,
    tpl: 3,
    page: 'detail',
    type: 'top',
    uin: 0,
    format: 'json',
    topid,
  })

  // return jsonp(url, data, options)
  return axios.get(url, {
    params: data,
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
