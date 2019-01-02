import jsonp from 'common/js/jsonp'
import {commParams, options} from "./config";
import axios from 'axios'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function getDiscList() {
  //const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const url = 'http://127.0.0.1:8080/api/getDiscList'
  const data = Object.assign({}, commParams, {
    g_tk: '5381',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    loginUin: 0,
    hostUin: 0,
    notice: 0,
    format: 'json',
    platform: 'yqq.json',
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),

  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
