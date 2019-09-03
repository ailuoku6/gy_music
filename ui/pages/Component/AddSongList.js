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

    componentWillMount(): void {
        if (this.props.mode&&this.props.mode==='edit'&&this.props.Songlist!=null){
            this.setState({
                songListTitle:this.props.Songlist.songListTitle,
                songListIntro:this.props.Songlist.songListIntro,
                songListCover:this.props.Songlist.songListCover,
            })
        }
    }

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
                    if (this.props.mode&&this.props.mode==='edit'&&this.props.Songlist!=null) {
                        const DataBaseModule = NativeModules.DataBaseModule;
                        let Songlist = this.props.Songlist;
                        Songlist.songListTitle = this.state.songListTitle;
                        Songlist.songListIntro = this.state.songListIntro;
                        Songlist.songListCover = this.state.songListCover;
                        DataBaseModule.editSonglist(JSON.stringify(Songlist)).then((result)=>{
                            if (result==='fail'){
                                ToastAndroid.show("更新失败",ToastAndroid.SHORT);
                            } else if (result==='succ'){
                                ToastAndroid.show("更新成功",ToastAndroid.SHORT)
                            }
                        });
                        if (this.props.onAddpress){
                            this.props.onAddpress();
                        }
                    }else {
                        const DataBaseModule = NativeModules.DataBaseModule;
                        DataBaseModule.AddSongList(this.props.userInfo.userId,this.state.songListTitle,this.state.songListIntro,this.state.songListCover).then((result)=>{
                            if (result==='succ'){
                                ToastAndroid.show("添加成功",ToastAndroid.SHORT);
                                if (this.props.onAddpress){
                                    this.props.onAddpress();
                                }
                            } else if (result==='fail'){
                                ToastAndroid.show("添加失败",ToastAndroid.SHORT);
                            }
                            this.setState({
                                songListTitle:'',
                                songListIntro:'',
                                songListCover:'',
                            })
                        });
                    }

                }} mode={'contained'}>{this.props.mode&&this.props.mode==='edit'?'编辑':'添加'}</Button>
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

