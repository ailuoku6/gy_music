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
                    source={{uri: musicUrl}}   // Can be a URL or a local file.
                    // ref={(ref) => {
                    //     this.player = ref
                    // }}                                      // Store reference
                    rate={1.0}                              // 0 is paused, 1 is normal.
                    volume={1.0}                            // 0 is muted, 1 is normal.
                    muted={false}                           // Mutes the audio entirely.
                    // paused={!currentPlay.playing}                          // Pauses playback entirely.
                    resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                    repeat={false}                           // Repeat forever.
                    playInBackground               // Audio continues to play when app entering background.
                    // playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
                    // progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                    // ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                    // onLoadStart={this.loadStart}            // Callback when video starts to load
                    // onLoad={this.setDuration}               // Callback when video loads
                    // onProgress={this.setTime}               // Callback every ~250ms with currentTime
                    // onEnd={this.onEnd}                      // Callback when playback finishes
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
    // playList
});



export default connect(mapStateToProps)(Player);
