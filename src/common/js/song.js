// 定义歌曲 类
// 代码集中方便管理；扩展性好；
export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.name = name
    this.singer = singer
    this.album = album
    this.duraion = duration
    this.image = image
    this.url = url
  }
}


export function createSong(musicData) {
  return new Song ({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://stream9.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  })
}
// 404 http://stream9.qqmusic.qq.com/
// 404 http://ws.stream.qqmusic.qq.com/
// http://117.41.241.15/amobile.music.tc.qq.com/C400003OUlho2HcRHC.m4a?guid=2095157176&amp;vkey=57C27FD3BAF6DC4E1EFAAF9487E0D3074E638AAD3BAFC2D700E3FA12F73E1C9CE90EE4FE2AA7DEEA9E68385B9A4927810A4ACEBEBC902E52&amp;uin=0&amp;fromtag=66

// 多个歌手用'/'隔开
function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
