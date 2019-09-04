/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text, View,
} from 'react-native';

import {Provider as StoreProvider} from 'react-redux';
import {Provider as PaperProvider, Surface, TouchableRipple} from 'react-native-paper';
import {createStore} from 'redux';
import reducer from './redux/reducer';
import Home from './Home';
import Player from './player/Player'
import randomImg from './pages/utils/config';
import PlayFab from './player/PlayerFab'


const store = createStore(reducer)

class RootScene extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        return (
            <StoreProvider store={store}>
                <PaperProvider>
                    <Home/>
                    <Player/>
                    <PlayFab style={styles.surface}/>
                </PaperProvider>
            </StoreProvider>
        );
    }
}

const styles = StyleSheet.create({

    surface:{
        width:70,
        height:70,
        borderRadius:35,
        elevation: 4,
        position: 'absolute',
        margin: 16,
        marginBottom:70,
        // backgroundColor:'#fff000',
        right: 0,
        bottom: 0,
    }
});

export default RootScene;
