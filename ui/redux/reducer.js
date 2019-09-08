import {combineReducers} from 'redux';
import {TYPE} from './actions';

const currentPlay = (state = {}, action) => {
    switch (action.type) {
        case TYPE.SET_PLAY_ID:
            return {...state, id: action.id};
        case TYPE.SET_PLAY_SONG:
            return {...state, ...action.song};
        default:
            return {...state};
    }
};

const playList = (state = {list:[],index:-1,isPlaying:false},action)=>{
    switch (action.type) {
        case TYPE.SET_SONG_LIST:
            return {...state,list:action.list};
        case TYPE.SET_CURRENT_INDEX:
            return {...state,index:action.index};
        case TYPE.SET_ISPLAYING:
            return {...state,isPlaying:action.isPlaying}
        default:
            return {...state};
    }
};

const UserInfo = (state = {userInfo:null},action)=>{
    switch (action.type) {
        case TYPE.SET_USERINFO:
            return {...state,userInfo:action.userInfo};
        default:
            return {...state}
    }
};

const Unikey = (state = {unikey:'0.5'},action)=>{
    switch (action.type) {
        case TYPE.SET_UNIKEY:
            return {...state,unikey:action.unikey};
        default:
            return {...state}
    }
};

export default combineReducers({
    currentPlay,
    playList,
    UserInfo,
    Unikey
})
