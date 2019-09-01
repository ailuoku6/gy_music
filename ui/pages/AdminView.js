import * as React from 'react';
import { View ,StyleSheet,ScrollView } from 'react-native'
import { Searchbar, Appbar, Subheading, TouchableRipple} from 'react-native-paper';
import { connect } from 'react-redux'
import { setSongList } from '../redux/actions'

class AdminView extends React.Component {
    state = {
    };

    static navigationOptions = {
        // title: 'Home',
        header:null,
    };

    componentWillMount(): void {

    }

    render() {
        // alert(JSON.stringify(this.props))

        return (
            <View style={{width:'100%',height:'100%'}}>
                <ScrollView>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});


const mapStateToProps = ({playList,UserInfo}) => ({
    list: playList.list,
    index:playList.index,
    playList,
    userInfo:UserInfo.userInfo
});

export default connect(mapStateToProps)(AdminView);
