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


class DownAlbum extends Component {
    constructor() {
        super();
        this.state = {
            albums:[],
            albumId:''
        };
    }

    componentDidMount(): void {
        // this.getAllSong();
        this.getAllAlbum()
    }

    getAllAlbum(){
        const DataBaseModule = NativeModules.DataBaseModule;
        DataBaseModule.getAllAlbum().then((reslut)=>{
            this.setState({
                albums:JSON.parse(reslut),
                albumId:''
            })
        });
    }

    // getAllSong(){
    //     const DataBaseModule = NativeModules.DataBaseModule;
    //     DataBaseModule.getAllSong().then((result)=>{
    //         this.setState({
    //             songId:'',
    //             songs:JSON.parse(result)
    //         })
    //     })
    // }

    render() {

        // alert(JSON.stringify(this.props))
        // let singerlist = [];

        let albums = [];
        this.state.albums.map((item,index)=>{
            let node = new Object();
            node.label = item.albumName;
            node.value = item.albumId;
            albums[albums.length] = node;
        });

        // this.state.albumList.map((item,index)=>{
        //     let node = new Object();
        //     node.label = item.albumName;
        //     node.value = item.albumId;
        //     albumList[albumList.length] = node;
        // });

        const placeholder = {
            label: '选择要下架的专辑',
            value: null,
            color: '#9EA0A4',
        };

        return (
            <View style={styles.container}>


                <RNPickerSelect
                    onValueChange={(value) => {
                        this.setState({
                            albumId:value
                        });
                    }}
                    value={this.state.albumId}
                    placeholder={placeholder}
                    items={albums}
                />
                <Button onPress={()=>{


                    if (!judgeValue(this.state.albumId)) {
                        ToastAndroid.show("请将信息填写完整",ToastAndroid.SHORT)
                        return;
                    }

                    // alert(judgeValue(this.state.SingerId,this.state.AlbumId,this.state.songName,this.state.link,this.state.songCover,this.state.price))
                    // ToastAndroid.show("runhere",ToastAndroid.SHORT)
                    const DataBaseModule = NativeModules.DataBaseModule;

                    DataBaseModule.DownAlbum(this.state.albumId).then((result)=>{
                        if (result==='succ'){
                            ToastAndroid.show("下架成功",ToastAndroid.SHORT);
                        } else if (result==='fail') {
                            ToastAndroid.show("下架失败",ToastAndroid.SHORT);
                        }
                        this.getAllAlbum()
                    })
                }} mode={'contained'}>下架</Button>
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

export default connect(mapStateToProps)(DownAlbum);

