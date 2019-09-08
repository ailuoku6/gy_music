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
import randomImg from '../utils/config';
import judgeValue from '../utils/judgeValue'
import RNPickerSelect from 'react-native-picker-select';



//import TestFlatListSelect from "../components/Test";

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


class AddAlbum extends Component {
    constructor() {
        super();
        this.state = {
            singerList:[],
            SingerId:'',
            albumName:'',
            albumCover:'',
            albumIntro:'',
            visible:true
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
    //     this.getAllSinger();
    // }

    componentDidMount(): void {
        this.getAllSinger();
    }

    getAllSinger(){
        const DataBaseModule = NativeModules.DataBaseModule;
        DataBaseModule.getAllSinger().then((reslut)=>{
            this.setState({
                singerList:JSON.parse(reslut)
            })
        });
    }

    render() {

        // alert(JSON.stringify(this.props))
        let list = [];
        this.state.singerList.map((item,index)=>{
            let node = new Object();
            node.label = item.singerName;
            node.value = item.singerId;
            list[list.length] = node;
        });

        const placeholder = {
            label: '选择此专辑所属歌手',
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
                    items={list}
                />

                <TextInput
                    label='专辑名称'
                    value={this.state.albumName}
                    onChangeText={text => this.setState({ albumName:text })}
                />

                <View>
                    <TextInput
                        label='专辑封面'
                        value={this.state.albumCover}
                        onChangeText={text => this.setState({ albumCover:text })}
                    />
                    <Button onPress={()=>{
                        this.setState({
                            albumCover:randomImg()
                        })
                    }} mode={'contained'}>随机生成封面</Button>
                </View>

                <TextInput
                    label='专辑简介'
                    value={this.state.albumIntro}
                    onChangeText={text => this.setState({ albumIntro:text })}
                />
                <Button onPress={()=>{
                    // if (!this.state.SingerId||!this.state.albumName||!this.state.albumCover||!this.state.albumIntro){
                    //     ToastAndroid.show("请将信息填写完整",ToastAndroid.SHORT)
                    //     return;
                    // }
                    if (!judgeValue(this.state.SingerId,this.state.albumName,this.state.albumCover,this.state.albumIntro)){
                        ToastAndroid.show("请将信息填写完整",ToastAndroid.SHORT)
                        return;
                    }
                    const DataBaseModule = NativeModules.DataBaseModule;
                    DataBaseModule.AddAlbum(this.state.SingerId,this.state.albumName,this.state.albumCover,this.state.albumIntro).then((result)=>{
                        if (result==='succ'){
                            ToastAndroid.show("添加成功",ToastAndroid.SHORT);
                        } else if (result==='fail'){
                            ToastAndroid.show("添加失败",ToastAndroid.SHORT);
                        }
                        this.setState({
                            SingerId:'',
                            albumName:'',
                            albumCover:'',
                            albumIntro:''
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

export default connect(mapStateToProps)(AddAlbum);

