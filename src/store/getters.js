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
    //正在播放歌的小图片
    songavatar() {
        return (state.playingsong.al && `${state.playingsong.al.picUrl}?param=50y50`) || ''
    },
    //正在播放歌的大图片
    songpic() {
        return (state.playingsong.al && `${state.playingsong.al.picUrl}?param=250y250`) || ''
    },
    //正在播放的歌的url
    songurl() {
        return (state.playingsongurl.data && state.playingsongurl.data[0].url) || ''
    },
    //我创建的歌单
    mycreatedsonglist() {
        if (Object.keys(state.usersonglist).length !== 0) {
            return state.usersonglist.playlist.filter(item => {
                return item.creator.userId === state.userinfo.account.id
            })
        }
    },
    
}