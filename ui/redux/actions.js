export const TYPE = {
    SET_PLAY_ID:'SET_PLAY_ID',
    SET_PLAY_SONG:'SET_PLAY_SONG',
    SET_SONG_LIST:'SET_SONG_LIST',
    SET_CURRENT_INDEX:'SET_CURRENT_INDEX',
    SET_USERINFO:'SET_USERINFO',
    SET_ISPLAYING:'SET_ISPLAYING',
    SET_UNIKEY:'SET_UNIKEY'
};

// 设置播放歌曲id
export const setPlayId = id => ({
    type: TYPE.SET_PLAY_ID,
    id
});
// 设置播放歌曲详情
export const setPlaySong = song => ({
    type: TYPE.SET_PLAY_SONG,
    song
});
export const setSongList = list=>({
    type:TYPE.SET_SONG_LIST,
    list
});
export const setCurrentIndex = index=>({
    type:TYPE.SET_CURRENT_INDEX,
    index
});

export const setuserInfo = userInfo=>({
    type: TYPE.SET_USERINFO,
    userInfo
});

export const setIsPlaying = isPlaying=>({
    type:TYPE.SET_ISPLAYING,
    isPlaying
});

export const setUnikey = unikey=>({
    type:TYPE.SET_UNIKEY,
    unikey
});

