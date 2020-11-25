export default{
    //用户登录信息
    userinfo: JSON.parse(localStorage.getItem('userinfo')) || {},
    //用户信息 , 歌单，收藏，mv, dj 数量
    userinfo1: {},
    //搜索的音乐
    searchedmusic: [],
    //搜索音乐的可用性
    searchedmusicusable: {},
    //正在播放的歌曲
    playingsong: {},
    //播放歌曲的url
    playingsongurl: ''

}