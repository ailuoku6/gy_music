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
    Alert
} from 'react-native';

import Video from 'react-native-video';

import { connect } from 'react-redux';

import { setSongList,setCurrentIndex,setIsPlaying } from '../redux/actions'



//import TestFlatListSelect from "../components/Test";

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


class Player extends Component {
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

        // alert(JSON.stringify(this.props))

        return (
            musicUrl ? (
                <Video
                    source={{uri: this.props.list.length!==0&&this.props.index>=0&&this.props.index<this.props.list.length?this.props.list[this.props.index].link:""}}   // Can be a URL or a local file.
                    // ref={(ref) => {
                    //     this.player = ref
                    // }}                                      // Store reference
                    rate={1.0}                              // 0 is paused, 1 is normal.
                    volume={1.0}                            // 0 is muted, 1 is normal.
                    muted={false}                           // Mutes the audio entirely.
                    paused={!this.props.isPlaying}                          // Pauses playback entirely.
                    resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                    repeat={false}                           // Repeat forever.
                    playInBackground               // Audio continues to play when app entering background.
                    // onLoadStart={this.loadStart}            // Callback when video starts to load
                    // onLoad={this.setDuration}               // Callback when video loads
                    // onProgress={this.setTime}               // Callback every ~250ms with currentTime
                    onEnd={()=>{
                        // alert("播放完成")
                        this.props.dispatch(setIsPlaying(false));
                        if (this.props.list.length!=0){
                            this.props.dispatch(setCurrentIndex((this.props.index+1)%this.props.list.length))
                        }
                    }}                      // Callback when playback finishes
                    // onError={this.videoError}               // Callback when video cannot be loaded
                    // onBuffer={this.onBuffer}                // Callback when remote video is buffering
                    // onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
                    style={{width: 0, height: 0}}
                />
            ) : null
        );
    }
}

const mapStateToProps = ({playList}) => ({
    list: playList.list,
    index:playList.index,
    isPlaying:playList.isPlaying
    // playList
});



export default connect(mapStateToProps)(Player);
