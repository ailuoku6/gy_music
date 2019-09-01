import * as React from 'react';
import { View ,StyleSheet } from 'react-native'
import { Searchbar, Appbar, Subheading, TouchableRipple} from 'react-native-paper';
import { connect } from 'react-redux'
import { setSongList } from '../redux/actions'

import SongItem from './widgets/SongItem'

class SearchPage extends React.Component {
    state = {
        keyword:'',
        songlist:[]
    };

    static navigationOptions = {
        // title: 'Home',
        header:null,
    };

    componentWillMount(): void {

        let keyword = this.props.navigation.state.params.keyword;

        this.setState({
            keyword:keyword
        },()=>{
            this.doSearch()
        })
    }

    doSearch(){

    }

    render() {
        // alert(JSON.stringify(this.props))

        let keyword = this.state.keyword;
        let data = {songName:'雅俗共赏',singer:'许嵩'}

        return (
            <View style={{width:'100%',height:'100%'}}>
                <Searchbar
                    placeholder="搜索歌名"
                    onChangeText={query => { this.setState({ keyword: query}); }}
                    value={keyword}
                    ref={'searchbar'}
                    onSubmitEditing={()=>{
                        this.doSearch();
                    }}
                />
                <SongItem
                    ItemData={data}
                    onMoreClick={
                        ()=>{

                        }
                    }
                ></SongItem>
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
