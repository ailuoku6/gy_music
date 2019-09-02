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


class AddSong extends Component {
    constructor() {
        super();
        this.state = {
            singerList:[],
            albumList:[],
            SingerId:'',
            AlbumId:'',
            songName:'',
            link:'',
            songCover:'',
            price:'',
        };
    }
    // static navigationOptions = {
    //     // title: 'Home',
    //     header:null,
    // };

    // changeStore(){
    //     this.props.dispatch(setSongList(["chgdhcgvdh","gvxgsvcghvsc"]))
    // }

    componentWillMount(): void {
        this.getAllSinger();
        this.getAll_Album();
    }

    getAllSinger(){
        const DataBaseModule = NativeModules.DataBaseModule;
        DataBaseModule.getAllSinger().then((reslut)=>{
            this.setState({
                singerList:JSON.parse(reslut)
            })
        });
    }

    getAll_Album(){
        const DataBaseModule = NativeModules.DataBaseModule;
        DataBaseModule.getAllAlbum().then((reslut)=>{
            this.setState({
                albumList:JSON.parse(reslut)
            })
        });
    }

    render() {

        // alert(JSON.stringify(this.props))
        let singerlist = [];
        let albumList = [];
        this.state.singerList.map((item,index)=>{
            let node = new Object();
            node.label = item.singerName;
            node.value = item.singerId;
            singerlist[singerlist.length] = node;
        });

        this.state.albumList.map((item,index)=>{
            let node = new Object();
            node.label = item.albumName;
            node.value = item.albumId;
            albumList[albumList.length] = node;
        });

        const placeholder = {
            label: '选择此音乐所属歌手',
            value: null,
            color: '#9EA0A4',
        };

        const placeholder2 = {
            label: '选择此音乐所属专辑',
            value: null,
            color: '#9EA0A4',
        };

        return (
            <View style={styles.container}>


                <RNPickerSelect
                    onValueChange={(value) => this.setState({
                        SingerId:value
                    })}
                    value={this.state.SingerId}
                    placeholder={placeholder}
                    items={singerlist}
                />

                <RNPickerSelect
                    onValueChange={(value) => this.setState({
                        AlbumId:value
                    })}
                    value={this.state.AlbumId}
                    placeholder={placeholder2}
                    items={albumList}
                />

                <TextInput
                    label='歌曲名称'
                    value={this.state.songName}
                    onChangeText={text => this.setState({ songName:text })}
                />

                <View>
                    <TextInput
                        label='歌曲链接'
                        value={this.state.link}
                        onChangeText={text => this.setState({ link:text })}
                    />
                    <Button onPress={()=>{
                        this.setState({
                            link:randomLink()
                        })
                    }} mode={'contained'}>随机生成歌曲链接</Button>
                </View>

                <View>
                    <TextInput
                        label='歌曲封面'
                        value={this.state.songCover}
                        onChangeText={text => this.setState({ songCover:text })}
                    />
                    <Button onPress={()=>{
                        this.setState({
                            songCover:randomImg()
                        })
                    }} mode={'contained'}>随机生成歌曲封面</Button>
                </View>

                <TextInput
                    label='歌曲价格'
                    value={this.state.price}
                    onChangeText={text => this.setState({ price:text })}
                />
                <Button onPress={()=>{
                    // SingerId:'',
                    //     AlbumId:'',
                    //     songName:'',
                    //     link:'',
                    //     songCover:'',
                    //     price:Number,
                    // if (!this.state.SingerId||!this.state.albumName||!this.state.albumCover||!this.state.albumIntro){
                    //     ToastAndroid.show("请将信息填写完整",ToastAndroid.SHORT)
                    //     return;
                    // }

                    if (!judgeValue(this.state.SingerId,this.state.AlbumId,this.state.songName,this.state.link,this.state.songCover,this.state.price)) {
                        ToastAndroid.show("请将信息填写完整",ToastAndroid.SHORT)
                        return;
                    }

                    // alert(judgeValue(this.state.SingerId,this.state.AlbumId,this.state.songName,this.state.link,this.state.songCover,this.state.price))
                    // ToastAndroid.show("runhere",ToastAndroid.SHORT)
                    const DataBaseModule = NativeModules.DataBaseModule;
                    DataBaseModule.AddSong(this.state.AlbumId,this.state.songName,this.state.SingerId,this.state.link,this.state.songCover,Number.parseInt(this.state.price)).then((result)=>{
                        if (result==='succ'){
                            ToastAndroid.show("添加成功",ToastAndroid.SHORT);
                        } else if (result==='fail'){
                            ToastAndroid.show("添加失败",ToastAndroid.SHORT);
                        }
                        this.setState({
                            AlbumId:'',
                            songName:'',
                            SingerId:'',
                            link:'',
                            songCover:'',
                            price:''
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

export default connect(mapStateToProps)(AddSong);

