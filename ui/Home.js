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
import Main from './pages/Main'
import SearchPage from './pages/SearchPage'

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
        // alert(JSON.stringify(this.props))
        return (
            <View style={styles.container}>
                {/*<Login/>*/}
                <Main
                    navigation={this.props.navigation}
                />
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

const AppNavigator = createStackNavigator(
    {
        Home: Home,
        SearchPage:SearchPage
    },
    {
        initialRouteName: "Home"
    }
);

export default createAppContainer(AppNavigator);
