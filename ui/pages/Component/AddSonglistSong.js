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
    ToastAndroid,
    BackHandler,
    NativeModules,
    Alert
} from 'react-native';
import { Button,List,TouchableRipple,Dialog, Portal,TextInput,Menu } from 'react-native-paper';
import { Avatar } from 'react-native-paper';

import { connect } from 'react-redux';
import { setSongList,setuserInfo } from '../../redux/actions'
import {randomLink} from '../utils/config';
import randomImg from '../utils/config'
import judgeValue from '../utils/judgeValue'
import RNPickerSelect from 'react-native-picker-select';



//import TestFlatListSelect from "../components/Test";

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


class AddSonglistSong extends Component {
    constructor() {
        super();
        this.state = {
            songlists:[],
            songs:[],
            songlistId:'',
            songId:''
        };
    }
    // static navigationOptions = {
    //     // title: 'Home',
    //     header:null,
    // };

    // changeStore(){
    //     this.props.dispatch(setSongList(["chgdhcgvdh","gvxgsvcghvsc"]))
    // }

    // componentWillMount(): void {
    //     this.getSongLists();
    //     this.getSongs();
    // }

    componentDidMount(): void {
        this.getSongLists();
        this.getSongs();
    }

    getSongLists(){
        const DataBaseModule = NativeModules.DataBaseModule;
        DataBaseModule.getAllSonglist().then((result)=>{
            this.setState({
                songlists:JSON.parse(result)
            })
        })
    }

    getSongs(){
        const DataBaseModule = NativeModules.DataBaseModule;
        DataBaseModule.getAllSong().then((result)=>{
            this.setState({
                songs:JSON.parse(result)
            })
        })
    }

    render() {

        // alert(JSON.stringify(this.props))
        let songlists = [];
        let songs = [];
        this.state.songlists.map((item,index)=>{
            let node = new Object();
            node.label = item.songListTitle;
            node.value = item.songListId;
            songlists[songlists.length] = node;
        });

        this.state.songs.map((item,index)=>{
            let node = new Object();
            node.label = item.songName;
            node.value = item.songId;
            songs[songs.length] = node;
        });

        const placeholder = {
            label: '选择目标歌单',
            value: null,
            color: '#9EA0A4',
        };

        const placeholder2 = {
            label: '选择要添加的歌曲',
            value: null,
            color: '#9EA0A4',
        };

        return (
            <View style={styles.container}>


                <RNPickerSelect
                    onValueChange={(value) => this.setState({
                        songlistId:value
                    })}
                    value={this.state.songlistId}
                    placeholder={placeholder}
                    items={songlists}
                />

                <RNPickerSelect
                    onValueChange={(value) => this.setState({
                        songId:value
                    })}
                    value={this.state.songId}
                    placeholder={placeholder2}
                    items={songs}
                />
                <Button onPress={()=>{

                    if (!judgeValue(this.state.songlistId,this.state.songId)) {
                        ToastAndroid.show("请将信息填写完整",ToastAndroid.SHORT)
                        return;
                    }

                    // alert(judgeValue(this.state.SingerId,this.state.AlbumId,this.state.songName,this.state.link,this.state.songCover,this.state.price))
                    // ToastAndroid.show("runhere",ToastAndroid.SHORT)
                    const DataBaseModule = NativeModules.DataBaseModule;
                    DataBaseModule.AddSonglistSong(this.state.songlistId,this.state.songId).then((result)=>{
                        if (result==='succ'){
                            ToastAndroid.show("添加成功",ToastAndroid.SHORT);
                        } else if (result==='fail'){
                            ToastAndroid.show("添加失败",ToastAndroid.SHORT);
                        }
                        this.setState({
                            songlistId:'',
                            songId:''
                        })
                    });
                }} mode={'contained'}>添加</Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        // height:'100%',
        width:'100%',
        // alignItems:'center',
        // justifyContent:'center',
        // backgroundColor:'#518eff'
    }
});

const mapStateToProps = ({playList,UserInfo}) => ({
    list: playList.list,
    index:playList.index,
    playList,
    userInfo:UserInfo.userInfo
});

export default connect(mapStateToProps)(AddSonglistSong);

