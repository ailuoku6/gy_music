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


class AddRanking extends Component {
    constructor() {
        super();
        this.state = {
            rankingName:'',
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
                    label='排行榜名称'
                    value={this.state.rankingName}
                    onChangeText={text => this.setState({ rankingName:text })}
                />
                <Button onPress={()=>{
                    // if (!this.state.SingerName||!this.state.SingerSex||!this.state.singerAvatar||!this.state.singerIntro){
                    //     ToastAndroid.show("请将信息填写完整",ToastAndroid.SHORT)
                    //     return;
                    // }
                    if (!judgeValue(this.state.rankingName)){
                        ToastAndroid.show("请将信息填写完整",ToastAndroid.SHORT)
                        return;
                    }
                    const DataBaseModule = NativeModules.DataBaseModule;
                    DataBaseModule.AddRanking(this.state.rankingName).then((result)=>{
                        if (result==='succ'){
                            ToastAndroid.show("添加成功",ToastAndroid.SHORT);
                        } else if (result==='fail'){
                            ToastAndroid.show("添加失败",ToastAndroid.SHORT);
                        }
                        this.setState({
                            rankingName:'',
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

export default connect(mapStateToProps)(AddRanking);

