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
import { setSongList } from '../../redux/actions'


//import TestFlatListSelect from "../components/Test";

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


class MyMusic extends Component {
    constructor() {
        super();
        this.state = {
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

        return (
            <View style={styles.container}>
                <Text>MyMusic</Text>
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

const mapStateToProps = ({playList}) => ({
    list: playList.list,
    index:playList.index,
    playList
});

export default connect(mapStateToProps)(MyMusic);

