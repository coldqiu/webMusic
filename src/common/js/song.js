// 定义歌曲 类
// 代码集中方便管理；扩展性好；
import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid= mid
    this.name = name
    this.singer = singer
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          // console.log("this.lyric", this.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })


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
    url : randomNum()
  })
}
// 404 http://stream9.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
// 404 http://ws.stream.qqmusic.qq.com/
// 403 http://117.41.241.15/amobile.music.tc.qq.com/C400003OUlho2HcRHC.m4a?guid=2095157176&amp;vkey=57C27FD3BAF6DC4E1EFAAF9487E0D3074E638AAD3BAFC2D700E3FA12F73E1C9CE90EE4FE2AA7DEEA9E68385B9A4927810A4ACEBEBC902E52&amp;uin=0&amp;fromtag=66
// http://isure.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=32
// ok http://dl.stream.qqmusic.qq.com/C400003mAan70zUy5O.m4a?guid=2095157176&vkey=55F7BAC4731A753E06F81D2D2BB2A67B2C261466C71E4226612CB004248242715A62327ADADA7953D343A959F6F69550C124F19C528F2540&uin=0&fromtag=3&r=9457220248460558

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
function randomNum() {
  return 'static/' + parseInt(Math.random() * 8) + '.mp3'
}
