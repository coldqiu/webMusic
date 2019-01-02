// 封装 jsonp
import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  // data存放url的参数，使得url更纯净
  // option
  // 判断url中是否有？,没有就加上,有就加&
  url += (url.indexOf('?') < 0 ? '?' : '&') + param((data))
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
// URI(urn+url) 标识、定位任何资源的字符串
// 全局变量 encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。返回值为
// URIstring 的副本，其中的某些字符将被十六进制的转义序列进行替换。
function param(data) {
  let url = '';
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ""
}
