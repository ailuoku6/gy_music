/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
    ToastAndroid
} from 'react-native';

import Video from 'react-native-video';

import { connect } from 'react-redux';
import {Surface, TouchableRipple} from 'react-native-paper';
import randomImg from '../pages/utils/config';

import { setSongList,setIsPlaying } from '../redux/actions'


//import TestFlatListSelect from "../components/Test";

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


class PlayerFab extends Component {
    constructor() {
        super();
        this.state = {
            musicUrl:'https://nav.ailuoku6.top/yasugs.mp3'
        };
    }
    // static navigationOptions = {
    //     // title: 'Home',
    //     header:null,
    // };

    render() {

        let musicUrl = this.state.musicUrl;

        return (
            <View>
                {this.props.userInfo===null?(null):(
                    <Surface style={this.props.style}>
                        <TouchableRipple style={styles.fab} onPress={()=>{
                            // alert(JSON.stringify(this.props))
                            if (this.props.list.length===0&&!this.props.isPlaying){
                                ToastAndroid.show("当前播放列表为空，选择一个歌单播放吧",ToastAndroid.SHORT)
                                return;
                            }
                            this.props.dispatch(setIsPlaying(!this.props.isPlaying))
                        }}>
                            <View style={{height:'100%',width:'100%',alignItems: 'center',justifyContent: 'center'}}>
                                {this.props.list.length>0&&this.props.index>=0&&this.props.index<this.props.list.length?(
                                    <Image
                                        source={{uri:this.props.list[this.props.index].songCover}}
                                        style={{height:'100%',width:'100%',position: 'absolute',borderRadius:35}}
                                    />
                                ):(
                                    <Image
                                        source={require('../assets/default_Cover.png')}
                                        style={{height:'100%',width:'100%',position: 'absolute',borderRadius:35}}
                                    />
                                )}
                                {this.props.isPlaying?(
                                    <Image source={require('../assets/playing.png')} style={{width:30,height:30}}></Image>
                                ):(
                                    <Image source={require('../assets/pause.png')} style={{width:30,height:30}}></Image>
                                )}
                            </View>
                        </TouchableRipple>

                    </Surface>
                )}

            </View>
        );
    }
}

const mapStateToProps = ({playList,UserInfo}) => ({
    list: playList.list,
    index:playList.index,
    isPlaying:playList.isPlaying,
    userInfo:UserInfo.userInfo
    // playList
});

const styles = StyleSheet.create({

    fab: {
        height:'100%',
        width:'100%',
        borderRadius: 35,
        alignItems:'center',
        justifyContent:'center'
    },
});

export default connect(mapStateToProps)(PlayerFab);
