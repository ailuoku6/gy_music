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
    NativeModules
} from 'react-native';
import { Button,TextInput,Checkbox,Surface } from 'react-native-paper';

import { connect } from 'react-redux';
import { setSongList,setuserInfo } from '../redux/actions'


//import TestFlatListSelect from "../components/Test";

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


class Login extends Component {
    constructor() {
        super();
        this.state = {
            userName:'',
            passWord:'',
            checked:false
        };
    }
    // static navigationOptions = {
    //     // title: 'Home',
    //     header:null,
    // };

    // changeStore(){
    //     this.props.dispatch(setSongList(["chgdhcgvdh","gvxgsvcghvsc"]))
    // }

    Signin(){
        const DataBaseModule = NativeModules.DataBaseModule;
        if (!this.state.userName||!this.state.passWord) {
            ToastAndroid.show("请将表单填写完整",ToastAndroid.SHORT);
            return;
        }
        DataBaseModule.Signin(this.state.userName,this.state.passWord).then((result)=>{
            ToastAndroid.show(result,ToastAndroid.SHORT);
            this.props.dispatch(setuserInfo(JSON.parse(result)))

        });
    }

    Signup(){
        const DataBaseModule = NativeModules.DataBaseModule;
        if (!this.state.userName||!this.state.passWord) {
            ToastAndroid.show("请将表单填写完整",ToastAndroid.SHORT);
            return;
        }
        DataBaseModule.Signup(this.state.userName,this.state.passWord,this.state.checked).then((result)=>{
            ToastAndroid.show(result,ToastAndroid.SHORT);
            this.props.dispatch(setuserInfo(JSON.parse(result)))

        });
    }

    render() {

        // alert(JSON.stringify(this.props))

        const checked = this.state.checked;

        return (
            <View style={styles.container}>
                {/*<Text>{JSON.stringify(this.props)}</Text>*/}
                <Surface style={{width: '80%',padding:20,borderRadius:20,elevation: 8}}>
                    <TextInput
                        label='用户名'
                        value={this.state.userName}
                        mode={'outlined'}
                        onChangeText={text => this.setState({ userName:text })}
                    />
                    <TextInput
                        label='密码'
                        value={this.state.passWord}
                        mode={'outlined'}
                        onChangeText={text => this.setState({ passWord:text })}
                        secureTextEntry={true}
                    />
                    <View style={{flexDirection:'row',alignItems: 'center'}}>
                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => { this.setState({ checked: !checked }); }}
                        />
                        <Text>注册为管理员</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'space-around'}}>
                        <Button mode="contained" style={{width:'40%'}} onPress={() => {
                            this.Signup()
                        }}>
                            注册
                        </Button>
                        <Button mode="contained" style={{width:'40%'}} onPress={() => {
                            // this.changeStore()
                            this.Signin()
                        }}>
                            登陆
                        </Button>
                    </View>
                </Surface>
                {/*<View style={{width: '80%',padding:20,borderRadius:20}}>*/}
                {/*    */}
                {/*</View>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        height:'100%',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#518eff'
    }
});

const mapStateToProps = ({playList,UserInfo}) => ({
    list: playList.list,
    index:playList.index,
    // playList,
    userInfo:UserInfo.userInfo,
    // UserInfo,
});

export default connect(mapStateToProps)(Login);

// const AppNavigator = createStackNavigator(
//     {
//         Home: Home,
//     },
//     {
//         initialRouteName: "Home"
//     }
// );
//
// export default createAppContainer(AppNavigator);
