// 与缓存相关逻辑
// 搜索历史，标记歌曲为喜欢，播放列表,播放历史等
// 给不同的存储定义key
import storage from 'good-storage'
import { SET_SEARCH_HISTORY } from '../../store/mutation-types'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15
// 数组最大长度为15；新增数据放在最前面；加入重复的数据，把旧数据删除，新数据放最前面；
// compare 是比较函数
// insertArray 插入方法
function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  // unshift() 放在数组的首部
 arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch(query) {
  let searches= storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 为searchHistory获取本地数据，在state中赋值
export function loadStorage() {
  return storage.get(SEARCH_KEY, [])
}


export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}
