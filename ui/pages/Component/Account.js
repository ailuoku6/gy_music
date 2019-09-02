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
    ScrollView,
    Alert
} from 'react-native';
import { Button,List,TouchableRipple,Dialog, Portal,TextInput } from 'react-native-paper';
import { Avatar } from 'react-native-paper';

import { connect } from 'react-redux';
import { setSongList,setuserInfo } from '../../redux/actions'
import randomImg from '../utils/config';
import * as TextTool from '../widgets/TextTool'
import AdminView from '../AdminView'


//import TestFlatListSelect from "../components/Test";

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


class Account extends Component {
    constructor() {
        super();
        this.state = {
            oldpassword:'',
            newpassword:'',
            newpassword2:'',
            passwordvisible:false,
            changed:false,
            chargeNum:'',
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

                <ScrollView>
                    <View style={{width: '100%',alignItems:'center',justifyContent:'center',padding:15}}>
                        <Avatar.Image size={100} source={{uri:this.props.userInfo.avatar?this.props.userInfo.avatar:randomImg()}} />
                        <TextTool.H4>{this.props.userInfo.userName}</TextTool.H4>
                    </View>

                    <TouchableRipple onPress={()=>{

                    }}>
                        <List.Item
                            title={'用户名:  '+this.props.userInfo.userName}
                            // description="Item description"
                            left={props => <List.Icon {...props} icon="account-circle" />}
                        />
                    </TouchableRipple>

                    <TouchableRipple onPress={()=>{
                        this.setState({
                            passwordvisible:true
                        })
                    }}>
                        <List.Item
                            title={'修改密码'}
                            // description="Item description"
                            left={props => <List.Icon {...props} icon="folder" />}
                        />
                    </TouchableRipple>
                    <TouchableRipple onPress={()=>{

                    }}>
                        <List.Item
                            title={'用户角色:  ' + (this.props.userInfo.role==='1'?"管理员":"普通用户")}
                            // description="Item description"
                            left={props => <List.Icon {...props} icon="account-circle" />}
                        />
                    </TouchableRipple>

                    {this.props.userInfo.role==='1'?(
                        <TouchableRipple onPress={()=>{
                            this.props.navigation.navigate('AdminView');
                        }}>
                            <List.Item
                                title={'管理员选项'}
                                // description="Item description"
                                left={props => <List.Icon {...props} icon="account-circle" />}
                            />
                        </TouchableRipple>
                    ):null}

                    <TouchableRipple onPress={()=>{
                        this.setState({
                            changed:true
                        })
                    }}>
                        <List.Item
                            title={'余额:  ' + (this.props.userInfo.balance)}
                            // description="Item description"
                            left={props => <List.Icon {...props} icon="folder" />}
                        />
                    </TouchableRipple>

                    <Button mode="contained" style={{margin:15}} onPress={() => {
                        Alert.alert(
                            '确认退出登录',
                            null,
                            [
                                {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                {text: '确认', onPress: () => this.props.dispatch(setuserInfo(null))},
                            ],
                            { cancelable: true }
                        )
                    }}>
                        退出登录
                    </Button>
                    <Text>{JSON.stringify(this.props)}</Text>
                </ScrollView>


                <Portal>
                    <Dialog
                        visible={this.state.passwordvisible}
                        onDismiss={()=>{
                            this.setState({
                                passwordvisible:false
                            })
                        }}>
                        <Dialog.Title>修改密码</Dialog.Title>
                        <Dialog.Content>
                            <TextInput
                                label='旧密码'
                                value={this.state.oldpassword}
                                onChangeText={text => this.setState({ oldpassword:text })}
                            />
                            <TextInput
                                label='新密码'
                                value={this.state.newpassword}
                                onChangeText={text => this.setState({ newpassword:text })}
                            />
                            <TextInput
                                label='重新输入新密码'
                                value={this.state.newpassword2}
                                onChangeText={text => this.setState({ newpassword2:text })}
                            />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => this.setState({passwordvisible:false})}>取消</Button>
                            <Button onPress={() => {
                                if (!this.state.oldpassword||!this.state.newpassword||!this.state.newpassword2) {
                                    ToastAndroid.show("请输入旧密码和新密码",ToastAndroid.SHORT)
                                    return;
                                }
                                if (this.state.newpassword!==this.state.newpassword2) {
                                    ToastAndroid.show("两次输入的密码不一致",ToastAndroid.SHORT);
                                    return;
                                }

                                const DataBaseModule = NativeModules.DataBaseModule;

                                DataBaseModule.ChangePassword(JSON.stringify(this.props.userInfo),this.state.oldpassword,this.state.newpassword).then((result)=>{
                                    if (result==='fail'){
                                        ToastAndroid.show("旧密码错误",ToastAndroid.SHORT)
                                        return;
                                    }

                                    this.props.dispatch(setuserInfo(JSON.parse(result)));

                                });

                                this.setState({
                                    oldpassword:'',
                                    newpassword:'',
                                    newpassword2:'',
                                    passwordvisible:false
                                })

                            }}>确认</Button>
                        </Dialog.Actions>
                    </Dialog>
                    <Dialog
                        visible={this.state.changed}
                        onDismiss={()=>{
                            this.setState({
                                changed:false
                            })
                        }}>
                        <Dialog.Title>充值</Dialog.Title>
                        <Dialog.Content>
                            <TextInput
                                label='输入充值数'
                                value={this.state.chargeNum}
                                onChangeText={text => this.setState({ chargeNum:text })}
                                keyboardType={'numeric'}
                            />

                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => this.setState({changed:false})}>取消</Button>
                            <Button onPress={() => {
                                const DataBaseModule = NativeModules.DataBaseModule;
                                DataBaseModule.Recharge(JSON.stringify(this.props.userInfo),Number.parseInt(this.state.chargeNum)).then((result)=>{
                                    if (result==='fail'){
                                        ToastAndroid.show("发生错误",ToastAndroid.SHORT);
                                        return;
                                    }
                                    this.props.dispatch(setuserInfo(JSON.parse(result)));
                                });
                                this.setState({
                                    changed:false,
                                    chargeNum:''
                                })
                            }}>确认</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        height:'100%',
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

export default connect(mapStateToProps)(Account);

