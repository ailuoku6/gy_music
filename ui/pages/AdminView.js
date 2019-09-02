import * as React from 'react';
import { View ,StyleSheet,ScrollView,Alert,ToastAndroid,BackHandler } from 'react-native'
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
        modalVisible:false,
        selectIndex:-1
    };

    static navigationOptions = {
        // title: 'Home',
        header:null,
    };

    componentWillMount(): void {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.state.modalVisible===true){
                this.setState({
                    modalVisible:false
                });
                return true;
            }
            return false;
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
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
                                    this.setState({
                                        modalVisible:true,
                                        selectIndex:index
                                    })
                                }} style={{margin:15}} mode={'contained'}>{item}</Button>
                            )
                        })}
                    </View>
                </ScrollView>

                <Portal>
                    {this.state.modalVisible?(
                        <Dialog
                            visible={this.state.modalVisible}
                            onDismiss={()=>{
                                this.setState({
                                    modalVisible:false,
                                    selectIndex:-1
                                })
                            }}>
                            <Dialog.Content>
                                {this.state.selectIndex===0?(<AddSinger/>):null}
                                {this.state.selectIndex===1?(<AddAlbum/>):null}
                                {this.state.selectIndex===2?(<AddSong/>):null}
                                {this.state.selectIndex===3?(<AddSongList/>):null}
                                {this.state.selectIndex===4?(<AddSonglistSong/>):null}
                                {this.state.selectIndex===5?(<AddRanking/>):null}
                                {this.state.selectIndex===6?(<AddRankingitem/>):null}
                            </Dialog.Content>
                        </Dialog>
                    ):null}
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
