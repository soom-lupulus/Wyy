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
    REMOVE_ONE_FROM_PLAYLIST
} from './mutation-types'
//引入axios
import axios from 'axios'
const yyhaxios = axios.create({
    baseURL: 'http://polimin.top:3000',
    // baseURL: 'http://localhost:3000',
    withCredentials: true
})

export default {
    saveUserInfo({ commit }, userinfo) {
        commit(SAVE_USERINFO, userinfo)
    },
    async getUserInfo1({ commit }) {
        const { data: res } = await yyhaxios.get('/user/subcount', {
            params: {
                timestamp: new Date().getTime(),
            }
        })
        commit(USERINFO_1, res)
    },
    async getUserSongList({ commit }, uid) {
        const { data: res } = await yyhaxios.get('/user/playlist', {
            params: {
                uid,
            }
        })
        commit(USER_SONG_LIST, res)
    },
    async getSearchedMusic({ commit }, searchedmusic) {

        const { data: res } = await yyhaxios.get('/cloudsearch', {
            params: {
                keywords: searchedmusic,
            }
        })
        commit(SEARCHED_MUSIC, res.result.songs)

    },
    async getMusicUsable({ commit }, id) {

        const { data: res } = await yyhaxios.get('/check/music', {
            params: {
                id,
            }
        })
        commit(SEARCHED_MUSIC_USABLE, res)
    },
    savePlayingSong({ commit }, playingsong) {
        commit(PLAYING_SONG, playingsong)
    },
    async getPlayingSongUrl({ commit }, id) {
        const { data: res } = await yyhaxios.get('/song/url', {
            params: {
                id,
            }
        })
        commit(PLAYING_SONG_URL, res)
    },
    getPlayingSongDuration({ commit }, duration) {
        commit(PLAYING_SONG_DURATION, duration)
    },
    getPlayingSongCurrentTime({ commit }, currenttime) {
        // console.log(currenttime);
        commit(PLAYING_SONG_CURRENT_TIME, currenttime)
    },
    // 改变按钮状态
    toggleBtnState({ commit }, bool) {
        commit(PLAYING_BUTTON_STATE, /*optional*/ bool)
    },
    async getDayRecommendSong({ commit }) {
        const { data: res } = await yyhaxios.get('/recommend/songs', {
            params: {
                timestamp: new Date().getTime(),
            }
        })
        commit(DAY_RECOMMEND_SONG, res)
    },
    async getUserPlayedSongsRecord({ commit }, uid) {
        const { data: res } = await yyhaxios.get('/user/record', {
            params: {
                uid,
                type: 1
            }
        })
        commit(USER_PLAYEDSONGS_RECORD, res)
    },
    async getUserLikedSongsIds({ commit }, uid) {
        const { data: res } = await yyhaxios.get('/likelist', {
            params: {
                uid,
            }
        })
        if (res.code === 200) {
            commit(USER_LIKED_SONGS_IDS, res.ids)
        }

    },
    async getsonglistinfo({ commit }, songlist_id) {
        const { data: res } = await yyhaxios({
            url: '/playlist/detail',
            params: {
                id: songlist_id
            }
        })
        if (res.code === 200) {
            commit(SONG_LIST_INFO, res)
        }
        return new Promise((resolve, reject) => {
            resolve('我服了')
        })
    },
    // 从播放列表删除一个歌曲
    removeOneFromPlayList({commit}, index){
        commit(REMOVE_ONE_FROM_PLAYLIST, index)
    }






}