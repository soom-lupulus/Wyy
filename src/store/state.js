export default{
    //用户登录信息
    userinfo: JSON.parse(localStorage.getItem('userinfo')) || {},
    //用户信息 , 歌单，收藏，mv, dj 数量
    userinfo1: {},
    //获取用户歌单
    usersonglist: {},
    //获取日推歌曲
    dayrecommendsong: {},
    //获取用户播放记录
    userplayedsongsrecord: {},
    //获取用户喜欢列表
    userlikedsongsids: [],
    //获取歌单详情
    songlistInfo: {},
    //搜索的音乐
    searchedmusic: [],
    //搜索音乐的可用性
    searchedmusicusable: {},
    //正在播放的歌曲
    playingsong: {},
    //播放歌曲的url
    playingsongurl: '',
    //播放歌曲的总长度
    playingsongduration: 0,
    //更新播放歌曲的当前时间
    playingsongcurrenttime: 0,
    //暂停按钮的状态
    playingbuttonstate: true,
    


}