import jsonp from 'common/js/jsonp'
import {commParams, options} from './config'


export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commParams, {
    platform: 'h5',
    needNewCode: 1,
    format: 'json'
  })

  return jsonp(url, data, options)
}
