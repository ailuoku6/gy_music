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
import { Button,List,TouchableRipple,Dialog, Portal,TextInput } from 'react-native-paper';
import { Avatar } from 'react-native-paper';

import { connect } from 'react-redux';
import { setSongList,setuserInfo } from '../../redux/actions'
import randomImg from '../utils/config';
import judgeValue from '../utils/judgeValue'


//import TestFlatListSelect from "../components/Test";

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


class AddSongList extends Component {
    constructor() {
        super();
        this.state = {
            songListTitle:'',
            songListIntro:'',
            songListCover:''
        };
    }
    // static navigationOptions = {
    //     // title: 'Home',
    //     header:null,
    // };

    // changeStore(){
    //     this.props.dispatch(setSongList(["chgdhcgvdh","gvxgsvcghvsc"]))
    // }

    render() {

        // alert(JSON.stringify(this.props))

        return (
            <View style={styles.container}>
                <TextInput
                    label='歌单名称'
                    value={this.state.songListTitle}
                    onChangeText={text => this.setState({ songListTitle:text })}
                />
                <View>
                    <TextInput
                        label='歌单封面'
                        value={this.state.songListCover}
                        onChangeText={text => this.setState({ songListCover:text })}
                    />
                    <Button onPress={()=>{
                        this.setState({
                            songListCover:randomImg()
                        })
                    }} mode={'contained'}>随机生成封面</Button>
                </View>
                <TextInput
                    label='歌单简介'
                    value={this.state.songListIntro}
                    onChangeText={text => this.setState({ songListIntro:text })}
                />

                <Button onPress={()=>{
                    // if (!this.state.SingerName||!this.state.SingerSex||!this.state.singerAvatar||!this.state.singerIntro){
                    //     ToastAndroid.show("请将信息填写完整",ToastAndroid.SHORT)
                    //     return;
                    // }
                    if (!judgeValue(this.props.userInfo.userId,this.state.songListTitle,this.state.songListIntro,this.state.songListCover)){
                        ToastAndroid.show("请将信息填写完整",ToastAndroid.SHORT)
                        return;
                    }
                    const DataBaseModule = NativeModules.DataBaseModule;
                    DataBaseModule.AddSongList(this.props.userInfo.userId,this.state.songListTitle,this.state.songListIntro,this.state.songListCover).then((result)=>{
                        if (result==='succ'){
                            ToastAndroid.show("添加成功",ToastAndroid.SHORT);
                        } else if (result==='fail'){
                            ToastAndroid.show("添加失败",ToastAndroid.SHORT);
                        }
                        this.setState({
                            songListTitle:'',
                            songListIntro:'',
                            songListCover:'',
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

export default connect(mapStateToProps)(AddSongList);

