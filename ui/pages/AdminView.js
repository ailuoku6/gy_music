import * as React from 'react';
import {View, StyleSheet, ScrollView, Alert, ToastAndroid, BackHandler, NativeModules,DeviceEventEmitter} from 'react-native';
import { Searchbar, Appbar,Button,Portal,Dialog,ActivityIndicator, Colors} from 'react-native-paper';
import { connect } from 'react-redux'
import { setSongList } from '../redux/actions'

import AddSinger from './Component/AddSinger'
import AddAlbum from './Component/AddAlbum'
import AddSong from './Component/AddSong'
import AddSongList from './Component/AddSongList'
import AddSonglistSong from './Component/AddSonglistSong'
import AddRanking from './Component/AddRanking'
import AddRankingitem from './Component/AddRankingitem'
import DownAlbum from './Component/DownAlbum'
import DownSong from './Component/DownSong'

class AdminView extends React.Component {
    state = {
        optionList:["添加歌手","添加专辑","添加歌曲","创建歌单","添加歌曲到歌单","添加排行榜","添加歌曲到排行榜","下架歌曲","下架专辑"],
        modalVisible:false,
        selectIndex:-1,
        spiderRunning:false
    };

    static navigationOptions = {
        title: '管理员页面',
        headerStyle: {
            backgroundColor: '#3685f4',
        },
        headerTintColor: '#fff',
    };

    // static navigationOptions = {
    //     // title: 'Home',
    //     header:null,
    // };

    // componentWillMount(): void {
    //     this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    //         // ToastAndroid.show("backclick",ToastAndroid.SHORT)
    //         if (this.state.modalVisible){
    //             this.setState({
    //                 modalVisible:false,
    //                 selectIndex:-1
    //             });
    //             return true;
    //         }
    //         return false;
    //     });
    // }

    componentDidMount(): void {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            // ToastAndroid.show("backclick",ToastAndroid.SHORT)
            if (this.state.modalVisible){
                this.setState({
                    modalVisible:false,
                    selectIndex:-1
                });
                return true;
            }
            return false;
        });
        this.updataListener = DeviceEventEmitter.addListener('updataProcess', (e: Event) => {
            // handle event.
            if (e['msg']=='succ'){
                ToastAndroid.show('爬取成功!',ToastAndroid.SHORT)
                // this.setState({
                //     upLoadingVisible:false,
                // })
            }else{
                ToastAndroid.show("爬取失败",ToastAndroid.SHORT)
            }
            this.setState({
                spiderRunning:false
            })
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
        this.updataListener.remove();
    }

    render() {
        // alert(JSON.stringify(this.props))

        return (
            <View style={{width:'100%',height:'100%'}}>
                <ScrollView>
                    <View style={styles.ButtonWrap}>
                        {this.state.optionList.map((item,index)=>{
                            return(
                                <Button
                                    key={JSON.stringify(item)}
                                    onPress={()=>{
                                        this.setState({
                                            modalVisible:true,
                                            selectIndex:index
                                        })
                                    }}
                                    style={{margin:15}}
                                    mode={'contained'}>

                                    {item}
                                </Button>
                            )
                        })}
                        <Button onPress={()=>{
                            const DataBaseModule = NativeModules.DataBaseModule;
                            this.setState({
                                spiderRunning:true
                            },()=>{
                                DataBaseModule.Singerspider().then((result)=>{
                                    // if (result==='succ'){
                                    //     ToastAndroid.show("成功",ToastAndroid.SHORT)
                                    // } else if (result==='fail'){
                                    //     ToastAndroid.show("失败",ToastAndroid.SHORT)
                                    // }
                                })
                            });
                            // DataBaseModule.Singerspider().then((result)=>{
                            //     // if (result==='succ'){
                            //     //     ToastAndroid.show("成功",ToastAndroid.SHORT)
                            //     // } else if (result==='fail'){
                            //     //     ToastAndroid.show("失败",ToastAndroid.SHORT)
                            //     // }
                            // })
                        }} style={{margin:15}} mode={'contained'}>{'自动爬取'}</Button>
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
                                {this.state.selectIndex===7?(<DownSong/>):null}
                                {this.state.selectIndex===8?(<DownAlbum/>):null}
                            </Dialog.Content>
                        </Dialog>
                    ):null}
                    <Dialog
                        visible={this.state.spiderRunning}
                        onDismiss={()=>{
                            // this.setState({
                            //     spiderRunning:false
                            // })
                        }}>
                        <Dialog.Title>
                            爬取中...
                        </Dialog.Title>
                        <Dialog.Content>
                            {/*<Paragraph>This is simple dialog</Paragraph>*/}
                            <ActivityIndicator animating={true} color={Colors.red800} />
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
