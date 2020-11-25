import state from "./state"

export default {
    //所有歌曲的id
    searchedSongsIds(state) {
        return state.searchedmusic.map(val => {
            return val.id
        })
    },
    //正在播放的歌名
    songname() {
        // return state.playingsong === undefined ? 'none' : state.playingsong.name
        return (state.playingsong && state.playingsong.name) || 'none'
    },
    //正在播放的歌手名
    singername() {
        return (state.playingsong.ar && state.playingsong.ar[0].name) || 'none'
        // return state.playingsong.ar[0] === undefined ? 'none' : state.playingsong.ar[0].name
    },
    //正在播放歌的图片
    songavatar(){
        return (state.playingsong.al && `${state.playingsong.al.picUrl}?param=50y50`) || ''
    }
}