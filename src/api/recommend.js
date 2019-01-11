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
  const url = 'http://127.0.0.1:5000/api/getDiscList'
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

export function getSongList(disstid) {
  const url = 'http://127.0.0.1:5000/api/getSongList'
  // const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  const data = Object.assign({}, commParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    inCharset: 'utf8',
    notice: 0,
    platform: 'yqq.json',
    hostUin: 0,
    g_tk: '5381',
    needNewCode: 0,
  })
  // return jsonp(url, data, options)

  return axios.get(url, {
    params: data
  }).then((res) => {
    let num1 = res.data.indexOf('(')
    let num2 = res.data.length-1
    let longString = res.data.substring(num1 + 1, num2)
    let resultData = JSON.parse(longString)
    return Promise.resolve(resultData)
  })
}
