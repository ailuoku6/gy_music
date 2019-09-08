import * as React from 'react';
import {View, StyleSheet, NativeModules, ToastAndroid, FlatList, Image, Alert,ScrollView} from 'react-native';
import {Searchbar, Appbar, Subheading, TouchableRipple, Text, FAB, Dialog, Portal} from 'react-native-paper';
import { connect } from 'react-redux'
import {setCurrentIndex, setIsPlaying, setSongList} from '../redux/actions';

import SongItem from './widgets/SongItem'
import { screen } from './utils';
import judgeValue from './utils/judgeValue';
import AddSongList from './Component/AddSongList';
import MySonglist from './widgets/MySonglist';

class RankingDetail extends React.Component {
    state = {
        RankingId:'',
        Ranking:null,
        songs:[],
        selectSong:null,
        MoreVisible:false,
        AddListVisible:false,
        mySonglists:[]
    };

    static navigationOptions = {
        title: '排行榜详情',
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
    //
    //     let Ranking = this.props.navigation.state.params.Ranking;
    //
    //     let RankingId = Ranking.rankingId;
    //
    //     let items = this.props.navigation.state.params.songs;
    //
    //     // navigationOptions.title = Ranking.rankingName
    //
    //     this.setState({
    //         RankingId:RankingId,
    //         Ranking:Ranking
    //     });
    //     this.getSongs(items);
    //     // this.getRankingById(RankingId)
    //     this.getMysongLists();
    //
    // }

    componentDidMount(): void {
        let Ranking = this.props.navigation.state.params.Ranking;

        let RankingId = Ranking.rankingId;

        let items = this.props.navigation.state.params.songs;

        // navigationOptions.title = Ranking.rankingName

        this.setState({
            RankingId:RankingId,
            Ranking:Ranking
        });
        this.getSongs(items);
        // this.getRankingById(RankingId)
        this.getMysongLists();
    }

    getSongs(items){
        let songs = [];
        items.map((item,index)=>{
            songs[songs.length] = item.song;
        });
        this.setState({
            songs:songs
        })
        // const DataBaseModule = NativeModules.DataBaseModule;
        // DataBaseModule.getSongByListId(RankingId).then((result)=>{
        //     // let songlistSongs = JSON.parse(result);
        //     // let songs = [];
        //     // songlistSongs.map((item,index)=>{
        //     //     songs[songs.length] = item.song
        //     // });
        //     this.setState({
        //         songs:JSON.parse(result)
        //     })
        // })
    }

    // getRankingById(RankingId){
    //     const DataBaseModule = NativeModules.DataBaseModule;
    //     DataBaseModule.getRankingById(RankingId).then((result)=>{
    //         this.setState({
    //             Ranking:JSON.parse(result)
    //         })
    //     })
    // }

    // getSongList(songlistId){
    //     const DataBaseModule = NativeModules.DataBaseModule;
    //     DataBaseModule.getSongListById(songlistId).then((result)=>{
    //         this.setState({
    //             SongList:JSON.parse(result)
    //         })
    //     })
    // }

    getMysongLists(){
        const DataBaseModule = NativeModules.DataBaseModule;
        DataBaseModule.getMySongList(JSON.stringify(this.props.userInfo)).then((result)=>{
            // alert(result)
            this.setState({
                mySonglists:JSON.parse(result)
            })
        })
    }

    render() {
        // alert(JSON.stringify(this.props))

        // let keyword = this.state.keyword;
        // let data = {songName:'雅俗共赏',singer:'许嵩'}

        // let songs = [];
        // this.state.songlist.map((item)=>{
        //     let node = new Object();
        //
        // });

        // alert(JSON.stringify(this.state.songlist[0].album.singer.singerName))

        return (
            <View style={{width:'100%',height:'100%'}}>
                {/*<Searchbar*/}
                {/*    placeholder="搜索歌名"*/}
                {/*    onChangeText={query => { this.setState({ keyword: query}); }}*/}
                {/*    value={keyword}*/}
                {/*    ref={'searchbar'}*/}
                {/*    onSubmitEditing={()=>{*/}
                {/*    }}*/}
                {/*/>*/}

                {/*<Text>{JSON.stringify(this.state.songs)}</Text>*/}

                {this.state.songs&&this.state.songs[0].songCover?(
                    <View>
                        <Image source={{uri:this.state.songs[0].songCover}} style={{width:'100%',height:300}}/>
                        <Text style={{position: 'absolute',bottom: 0,left: 0,margin: 10,color:'#ffffff'}}>{this.state.Ranking.rankingName}</Text>
                    </View>
                ):null}

                {
                    this.state.songs.length===0?(
                        <Text>这里，空空如也</Text>
                    ):null
                }

                <FlatList
                    data={this.state.songs}
                    extraData={this.state}
                    keyExtractor={(item,index)=>JSON.stringify(item)}
                    renderItem={({item,index})=>(
                        <SongItem
                            ItemData={item}
                            onMoreClick={()=>{
                                this.setState({
                                    MoreVisible:true,
                                    selectSong:item
                                })
                            }}
                            index={index}
                            onPress={()=>{
                                let songlist = this.state.songs;
                                // songlist[songlist.length] = item;
                                this.props.dispatch(setIsPlaying(true));
                                this.props.dispatch(setSongList(songlist));
                                this.props.dispatch(setCurrentIndex(index))
                            }}

                        />)}
                />

                <Portal>
                    {this.state.MoreVisible?(
                        <Dialog
                            visible={this.state.MoreVisible}
                            onDismiss={()=>{
                                this.setState({
                                    MoreVisible:false,
                                    selectSong:null
                                    // selectSong:null
                                })
                            }}>
                            <Dialog.Content>

                                <ScrollView>
                                    <TouchableRipple style={{height:50,justifyContent:'center'}} onPress={()=>{
                                        this.setState({
                                            AddListVisible:true,
                                            MoreVisible:false,
                                        })
                                    }}>
                                        <Text>添加到歌单</Text>
                                    </TouchableRipple>
                                    <TouchableRipple style={{height:50,justifyContent:'center'}} onPress={()=>{
                                        // ToastAndroid.show("run here",ToastAndroid.SHORT)
                                        // alert(JSON.stringify(this.state.selectSong.album))
                                        let Album = this.state.selectSong.album;

                                        this.setState({
                                            MoreVisible:false,
                                            selectSong:null
                                        });
                                        this.props.navigation.navigate('AlbumPage',{
                                            Album:Album
                                        });
                                    }}>
                                        <Text>{'专辑:  '+this.state.selectSong.album.albumName}</Text>
                                    </TouchableRipple>
                                    <TouchableRipple style={{height:50,justifyContent:'center'}} onPress={()=>{
                                        // alert(JSON.stringify(this.state.selectSong.album))
                                        let singerId = this.state.selectSong.album.singer.singerId;
                                        this.setState({
                                            MoreVisible:false,
                                            selectSong:null
                                        });
                                        this.props.navigation.navigate('SingerPage',{
                                            SingerId:singerId
                                        });
                                    }}>
                                        <Text>{'歌手:  '+this.state.selectSong.album.singer.singerName}</Text>
                                    </TouchableRipple>
                                    <TouchableRipple style={{height:50,justifyContent:'center'}} onPress={()=>{
                                        // ToastAndroid.show("run here",ToastAndroid.SHORT)
                                        let songid = this.state.selectSong.songId;
                                        this.setState({
                                            MoreVisible:false,
                                            selectSong:null
                                        })
                                        this.props.navigation.navigate('Comment',{
                                            songId:songid
                                        });
                                    }}>
                                        <Text>评论</Text>
                                    </TouchableRipple>
                                </ScrollView>

                            </Dialog.Content>
                        </Dialog>
                    ):null}
                    {this.state.AddListVisible?(
                        <Dialog
                            visible={this.state.AddListVisible}
                            onDismiss={()=>{
                                this.setState({
                                    AddListVisible:false,
                                })
                            }}>
                            <Dialog.Content>
                                {this.state.mySonglists.map((item,index)=>{
                                    return (
                                        <MySonglist
                                            ItemData={item}
                                            onPress={()=>{
                                                const DataBaseModule = NativeModules.DataBaseModule;
                                                DataBaseModule.AddSonglistSong(item.songListId,this.state.selectSong.songId).then((result)=>{
                                                    if (result==='succ'){
                                                        ToastAndroid.show("添加成功",ToastAndroid.SHORT);
                                                    } else if (result==='fail'){
                                                        ToastAndroid.show("添加失败",ToastAndroid.SHORT);
                                                    }
                                                    this.setState({
                                                        AddListVisible:false,
                                                        selectSong:null
                                                    })
                                                });
                                            }}
                                        />
                                    )
                                })}
                            </Dialog.Content>
                        </Dialog>
                    ):null}
                </Portal>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 30,
        marginLeft:180,
        marginRight:180,
        right: 0,
        left:0,
        bottom: 0,
    },
});


const mapStateToProps = ({playList,UserInfo}) => ({
    list: playList.list,
    index:playList.index,
    playList,
    userInfo:UserInfo.userInfo
});

export default connect(mapStateToProps)(RankingDetail);
