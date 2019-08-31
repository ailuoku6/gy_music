import * as React from 'react';
import { View ,StyleSheet } from 'react-native'
import { BottomNavigation, Text ,FAB} from 'react-native-paper';
import { connect } from 'react-redux'
import { setSongList } from '../redux/actions'

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

class Main extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'discovery_music', title: '发现音乐', icon: 'queue-music' },
            { key: 'my_music', title: '我的音乐', icon: 'album' },
            { key: 'account', title: '账号', icon: 'account-circle' },
        ],
    };

    _handleIndexChange = index => this.setState({ index });

    _renderScene = BottomNavigation.SceneMap({
        discovery_music: MusicRoute,
        my_music: AlbumsRoute,
        account: RecentsRoute,
    });

    render() {
        return (
            <View style={{width:'100%',height:'100%'}}>
                <View style={styles.fab}>

                </View>
                <BottomNavigation
                    navigationState={this.state}
                    onIndexChange={this._handleIndexChange}
                    renderScene={this._renderScene}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        marginBottom:70,
        right: 0,
        bottom: 0,
    },
});


const mapStateToProps = ({playList}) => ({
    list: playList.list,
    index:playList.index,
    playList
});

export default connect(mapStateToProps)(Main);
