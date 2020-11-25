import {
    SAVE_USERINFO,
    USERINFO_1,
    SEARCHED_MUSIC,
    SEARCHED_MUSIC_USABLE,
    PLAYING_SONG,
    PLAYING_SONG_URL
} from './mutation-types'
//引入axios
import axios from 'axios'
const yyhaxios = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})

export default {
    saveUserInfo({ commit }, userinfo) {
        commit(SAVE_USERINFO, userinfo)
        // console.log(userinfo);
    },
    async getUserInfo1({ commit }, userinfo1) {
        const { data: res } = await yyhaxios.get('/user/subcount', {
            params: {
                timestamp: new Date().getTime(),
            }
        })
        commit(USERINFO_1, res)
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
    savePlayingSong({ commit }, playingsong){
        commit(PLAYING_SONG, playingsong)
    },
    async getPlayingSongUrl({commit}, id){
        const {data: res} = await yyhaxios.get('/song/url',{
            params: {
                id,
            }
        })
        commit(PLAYING_SONG_URL, res)
    }

}