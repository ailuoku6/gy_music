import * as React from 'react';
import { View ,StyleSheet } from 'react-native'
import { BottomNavigation, Text ,FAB} from 'react-native-paper';
import { connect } from 'react-redux'
import { setSongList } from '../redux/actions'

class SearchPage extends React.Component {
    state = {

    };

    render() {
        return (
            <View style={{width:'100%',height:'100%'}}>

            </View>
        );
    }
}

const styles = StyleSheet.create({

});


const mapStateToProps = ({playList}) => ({
    list: playList.list,
    index:playList.index,
    playList
});

export default connect(mapStateToProps)(SearchPage);
