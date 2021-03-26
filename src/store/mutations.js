import {
    SAVE_USERINFO,
    USERINFO_1,
    USER_SONG_LIST,
    DAY_RECOMMEND_SONG,
    USER_PLAYEDSONGS_RECORD,
    USER_LIKED_SONGS_IDS,
    SONG_LIST_INFO,
    SEARCHED_MUSIC,
    SEARCHED_MUSIC_USABLE,
    PLAYING_SONG,
    PLAYING_SONG_URL,
    PLAYING_SONG_DURATION,
    PLAYING_SONG_CURRENT_TIME,
    PLAYING_BUTTON_STATE,
    PLAYING_LIST,
    PLAYING_LIST_INDEX
}
    from './mutation-types'


export default {
    //保存用户登录信息
    [SAVE_USERINFO](state, userinfo) {
        localStorage.setItem('userinfo', JSON.stringify(userinfo));//将传递的数据先保存到localStorage中
        state.userinfo = userinfo
    },
    //获取用户信息 , 歌单，收藏，mv, dj 数量
    [USERINFO_1](state, userinfo1) {
        state.userinfo1 = userinfo1
    },
    //获取用户歌单
    [USER_SONG_LIST](state, usersonglist) {
        state.usersonglist = usersonglist
    },
    //搜索音乐
    [SEARCHED_MUSIC](state, searchedmusic) {
        state.searchedmusic = searchedmusic
    },
    //获取音乐可用性
    [SEARCHED_MUSIC_USABLE](state, arr) {
        state.searchedmusicusable = arr
    },
    //保存要播放歌曲的信息
    [PLAYING_SONG](state, playingsong) {
        state.playingsong = playingsong
    },
    //获取要播放歌曲的url
    [PLAYING_SONG_URL](state, playingsongurl) {
        state.playingsongurl = playingsongurl
    },
    //获取播放歌曲的总长度
    [PLAYING_SONG_DURATION](state, duration) {
        state.playingsongduration = duration
    },
    //更新播放歌曲的当前时间
    [PLAYING_SONG_CURRENT_TIME](state, currenttime) {
        state.playingsongcurrenttime = currenttime
    },
    //暂停按钮的状态
    [PLAYING_BUTTON_STATE](state, /*optional*/ bool) {
        bool === undefined ? state.playingbuttonstate = !state.playingbuttonstate : state.playingbuttonstate = bool
    },
    //获取日推歌曲
    [DAY_RECOMMEND_SONG](state, dayrecommendsong) {
        state.dayrecommendsong = dayrecommendsong
    },
    //获取用户播放记录
    [USER_PLAYEDSONGS_RECORD](state, userplayedsongsrecord) {
        state.userplayedsongsrecord = userplayedsongsrecord
    },
    //获取用户喜欢的歌曲ids
    [USER_LIKED_SONGS_IDS](state, userlikedsongsids) {
        state.userlikedsongsids = userlikedsongsids
    },
    //获取歌单详情
    [SONG_LIST_INFO](state, songlistInfo) {
        state.songlistInfo = songlistInfo
    },
    //获取播放列表
    [PLAYING_LIST](state, payload) {
        // 如果传了参数，并且flag为true
        if(payload && payload.flag){
            state.playinglist.splice(0, state.playinglist.length)
            state.playing_list_index = 0
            payload.arr.forEach(element => {
                state.playinglist.push(element)
            });
            // console.log(state.playinglist);
            return;
        }
        // 如果没传参数
        // 如果播放列表为空，就直接加进数组
        if(state.playinglist.length === 0){
            state.playinglist.push(state.playingsong)
        }else{
            // 否则就插入到当前播放歌曲的后面
            // console.log('我我我' + state.playing_list_index+1);
            state.playinglist.splice(state.playing_list_index+1, 0, state.playingsong)
        }

    },
    //播放列表下标 type为true则修改而不是添加,默认为添加
    [PLAYING_LIST_INDEX](state,  payload = { type: false, val: 1}){
        if(payload.type){
            state.playing_list_index = payload.val
        }else{
            state.playing_list_index = (state.playing_list_index + payload.val + state.playinglist.length) % state.playinglist.length 
        }
        console.log(state.playing_list_index); 
    }



}