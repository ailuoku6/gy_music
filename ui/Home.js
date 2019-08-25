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
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Button,TextInput,Checkbox,Surface } from 'react-native-paper';
import Login from './pages/Login'

//import TestFlatListSelect from "../components/Test";

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


class Home extends Component {
    constructor() {
        super();
        this.state = {
            userName:'',
            passWord:'',
            checked:false
        };
    }
    componentDidMount() {
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
                this.forceUpdate();//返回到Home时自动刷新
                //console.debug('didBlur', payload);
                //ToastAndroid.show("willfocus"+payload,ToastAndroid.SHORT);
            }
        );
    }
    componentWillUnmount() {
        this.willFocusSubscription.remove();
    }
    static navigationOptions = {
        // title: 'Home',
        header:null,
    };

    render() {

        const checked = this.state.checked;

        return (
            <View style={styles.container}>
                <Login/>
                {/*<Surface style={{width: '80%',padding:20,borderRadius:20,elevation: 8}}>*/}
                {/*    <TextInput*/}
                {/*        label='用户名'*/}
                {/*        value={this.state.userName}*/}
                {/*        mode={'outlined'}*/}
                {/*        onChangeText={text => this.setState({ userName:text })}*/}
                {/*    />*/}
                {/*    <TextInput*/}
                {/*        label='密码'*/}
                {/*        value={this.state.passWord}*/}
                {/*        mode={'outlined'}*/}
                {/*        onChangeText={text => this.setState({ passWord:text })}*/}
                {/*        secureTextEntry={true}*/}
                {/*    />*/}
                {/*    <View style={{flexDirection:'row',alignItems: 'center'}}>*/}
                {/*        <Checkbox*/}
                {/*            status={checked ? 'checked' : 'unchecked'}*/}
                {/*            onPress={() => { this.setState({ checked: !checked }); }}*/}
                {/*        />*/}
                {/*        <Text>注册为管理员</Text>*/}
                {/*    </View>*/}
                {/*    <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'space-around'}}>*/}
                {/*        <Button mode="contained" style={{width:'40%'}} onPress={() => {*/}

                {/*        }}>*/}
                {/*            注册*/}
                {/*        </Button>*/}
                {/*        <Button mode="contained" style={{width:'40%'}} onPress={() => {*/}

                {/*        }}>*/}
                {/*            登陆*/}
                {/*        </Button>*/}
                {/*    </View>*/}
                {/*</Surface>*/}
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

const AppNavigator = createStackNavigator(
    {
        Home: Home,
    },
    {
        initialRouteName: "Home"
    }
);

export default createAppContainer(AppNavigator);
