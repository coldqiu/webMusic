import {commParams, options} from "./config"
import axios from 'axios'

export function getLyric(mid) {
  const url = 'http://127.0.0.1:8080/api/getLyric'
  const data = Object.assign({}, commParams, {
    '-': 'MusicJsonCallback_lrc',
    pcachetime: +new Date(),
    songmid: mid,
    platform: 'yqq.json',
    hostUin: 0,
    loginUin: 0,
    format: 'json',
    needNewCode: 0,
    inCharset: 'utf8'
})

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// g_tk=5381&inCharset=utf-8&outCharset=utf8&notice=0&format=json&-=MusicJsonCallback_lrc&pcachetime=1546936290983&songmid=003OUlho2HcRHC&platform=yqq.json&hostUin=0&loginUin=0&needNewCode=0
// g_tk=5381&-=MusicJsonCallback_lrc&pcachetime=1546935307976&songmid=000Ox2yq3lW1IP&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0
