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
    ToastAndroid,
    Animated,
    Easing
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
        this.spinValue = new Animated.Value(0)
        this.state = {
            musicUrl:'https://nav.ailuoku6.top/yasugs.mp3'
        };
    }
    // static navigationOptions = {
    //     // title: 'Home',
    //     header:null,
    // };

    componentDidMount(){
        this.spin();
    }
    //旋转方法
    spin = () => {
        this.spinValue.setValue(0);
        Animated.timing(this.spinValue,{
            toValue: 1, // 最终值 为1，这里表示最大旋转 360度
            duration: 10000,
            easing: Easing.linear
        }).start(() => this.spin())
    };

    render() {

        let musicUrl = this.state.musicUrl;

        //映射 0-1的值 映射 成 0 - 360 度
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],//输入值
            outputRange: ['0deg', '360deg'] //输出值
        });

        let imgstyles = [];
        imgstyles[imgstyles.length] = styles.ImageStyle;

        if (this.props.isPlaying) {
            imgstyles[imgstyles.length] = {transform:[{rotate: spin }]}
        }else {
            imgstyles[imgstyles.length] = {transform:[{rotate: spin.__getValue() }]}
        }

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
                                    <Animated.Image
                                        source={{uri:this.props.list[this.props.index].songCover}}
                                        style={imgstyles}
                                    />
                                ):(
                                    <Image
                                        source={require('../assets/default_Cover.png')}
                                        style={styles.ImageStyle}
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
    ImageStyle:{
        height:'100%',
        width:'100%',
        position: 'absolute',
        borderRadius:35
    }
});

export default connect(mapStateToProps)(PlayerFab);
