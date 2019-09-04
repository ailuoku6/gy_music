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
import AdminView from './pages/AdminView'
import SongListDetail from './pages/SongListDetail'
import RankingDetail from './pages/RankingDetail'
import Comment from './pages/Comment'
import SingerPage from './pages/SingerPage'
import AlbumPage from './pages/AlbumPage'

import { connect } from 'react-redux'
import { setSongList } from './redux/actions'

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
                {this.props.userInfo===null?(
                    <Login/>
                ):(
                    <Main
                        navigation={this.props.navigation}
                    />
                )}

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

const AppNavigator = createStackNavigator(
    {
        // Home: Home,
        Home:connect(mapStateToProps)(Home),
        SearchPage:SearchPage,
        AdminView:AdminView,
        SongListDetail:SongListDetail,
        Comment:Comment,
        RankingDetail:RankingDetail,
        SingerPage:SingerPage,
        AlbumPage:AlbumPage
    },
    {
        initialRouteName: 'Home'
    }
);

export default createAppContainer(AppNavigator);


// export default connect(mapStateToProps)(createAppContainer(AppNavigator));

// export default createAppContainer()
