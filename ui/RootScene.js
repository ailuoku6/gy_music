/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';

import {Provider as StoreProvider} from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import {createStore} from 'redux';
import reducer from './redux/reducer';
import Home from './Home';
import Player from './player/Player'


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
                </PaperProvider>
            </StoreProvider>
        );
    }
}

const styles = StyleSheet.create({

});

export default RootScene;
