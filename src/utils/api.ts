
// 文档地址  https://jsososo.github.io/QQMusicApi
const hostName:string = '/test/';

const api = {
    RecommendPlaylist: hostName + 'recommend/playlist', // 推荐歌单 post 参数无
    GetHot: hostName + 'search/hot',  // 获取热搜词 post 参数 无
    FindSongs : hostName + 'song/find', // 获取歌曲 post 参数 {歌曲id:搜素关键词}
}

export default api;