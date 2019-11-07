import * as React from 'react';
import { View ,StyleSheet,Image,ToastAndroid } from 'react-native'
import { BottomNavigation, Text ,FAB,TouchableRipple,Surface} from 'react-native-paper';
import { connect } from 'react-redux'
import {setIsPlaying, setSongList, setUnikey} from '../redux/actions';

import Account from './Component/Account'
import DiscoveryMusic from './Component/DiscoveryMusic'
import MyMusic from './Component/MyMusic'
import randomImg from './utils/config';

// const DiscoveryMusicRoute = () => <DiscoveryMusic/>;
//
// const MyMusicRoute = () => <MyMusic/>;
//
// const AccountRoute = () => <Account/>;

class Main extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'discovery_music', title: '发现音乐', icon: 'queue-music' },
            { key: 'my_music', title: '我的音乐', icon: 'album' },
            { key: 'account', title: '账号', icon: 'account-circle' },
        ],
    };

    _handleIndexChange = index => {
        this.setState({ index });
        this.props.dispatch(setUnikey(Math.random().toString()));
        // alert(JSON.stringify(this.refs.bottomNavigat.props.renderScene))
    };

    _renderScene = BottomNavigation.SceneMap({
        discovery_music: ()=><DiscoveryMusic navigation={this.props.navigation}/>,
        my_music: ()=><MyMusic navigation={this.props.navigation}/>,
        account: ()=><Account navigation={this.props.navigation}/>,
    });

    render() {
        // alert(JSON.stringify(this.props))
        return (
            <View style={{width:'100%',height:'100%'}}>
                <BottomNavigation
                    ref={'bottomNavigat'}
                    navigationState={this.state}
                    onIndexChange={this._handleIndexChange}
                    // renderScene={this._renderScene}
                    renderScene={this._renderScene}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({

});


const mapStateToProps = ({playList,Unikey}) => ({
    list: playList.list,
    index:playList.index,
    playList,
    unikey:Unikey.unikey
});

export default connect(mapStateToProps)(Main);
