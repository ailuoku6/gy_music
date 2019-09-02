import * as React from 'react';
import { View ,StyleSheet,ScrollView } from 'react-native'
import { Searchbar, Appbar,Button,Portal,Dialog} from 'react-native-paper';
import { connect } from 'react-redux'
import { setSongList } from '../redux/actions'

import AddSinger from './Component/AddSinger'
import AddAlbum from './Component/AddAlbum'
import AddSong from './Component/AddSong'
import AddSongList from './Component/AddSongList'
import AddSonglistSong from './Component/AddSonglistSong'
import AddRanking from './Component/AddRanking'
import AddRankingitem from './Component/AddRankingitem'

class AdminView extends React.Component {
    state = {
        optionList:["添加歌手","添加专辑","添加歌曲","创建歌单","添加歌曲到歌单","添加排行榜","添加歌曲到排行榜"],
        modalVisible:true
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
                    <View style={styles.ButtonWrap}>
                        {this.state.optionList.map((item,index)=>{
                            return(
                                <Button onPress={()=>{

                                }} style={{margin:15}} mode={'contained'}>{item}</Button>
                            )
                        })}
                    </View>
                </ScrollView>

                <Portal>
                    <Dialog
                        visible={this.state.modalVisible}
                        onDismiss={()=>{

                        }}>
                        <Dialog.Content>
                            <AddRankingitem/>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ButtonWrap:{
        padding:10,
        flexDirection:'row',
        flexWrap:'wrap'
    }
});


const mapStateToProps = ({playList,UserInfo}) => ({
    list: playList.list,
    index:playList.index,
    playList,
    userInfo:UserInfo.userInfo
});

export default connect(mapStateToProps)(AdminView);
