import {
    SAVE_USERINFO,
    USERINFO_1,
    SEARCHED_MUSIC,
    SEARCHED_MUSIC_USABLE,
    PLAYING_SONG,
    PLAYING_SONG_URL
}
 from './mutation-types'


export default{
    //保存用户登录信息
    [SAVE_USERINFO](state, userinfo){
        localStorage.setItem('userinfo', JSON.stringify(userinfo));//将传递的数据先保存到localStorage中
        state.userinfo = userinfo
    },
    //获取用户信息 , 歌单，收藏，mv, dj 数量
    [USERINFO_1](state, userinfo1){
        state.userinfo1 = userinfo1
    },
    //搜索音乐
    [SEARCHED_MUSIC](state, searchedmusic){
        state.searchedmusic = searchedmusic
    },
    //获取音乐可用性
    [SEARCHED_MUSIC_USABLE](state, arr){
        state.searchedmusicusable = arr
    },
    //保存要播放歌曲的信息
    [PLAYING_SONG](state, playingsong){
        state.playingsong = playingsong
    },
    //获取要播放歌曲的url
    [PLAYING_SONG_URL](state, playingsongurl){
        state.playingsongurl = playingsongurl
    }

}