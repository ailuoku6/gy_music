import * as React from 'react';
import {View, StyleSheet, NativeModules, ToastAndroid, FlatList, Image, Alert, ScrollView} from 'react-native';
import {Searchbar, Appbar, Subheading, TouchableRipple, Text, FAB, Dialog, Portal} from 'react-native-paper';
import { connect } from 'react-redux'
import { setSongList } from '../redux/actions'

import SongItem from './widgets/SongItem'
import { screen } from './utils';
import judgeValue from './utils/judgeValue';
import AddSongList from './Component/AddSongList';
import MySonglist from './widgets/MySonglist';

class SongListDetail extends React.Component {
    state = {
        SonglistId:'',
        SongList:'',
        songs:[],
        selectSong:null,
        MoreVisible:false,
        AddListVisible:false,
        mySonglists:[]
    };

    static navigationOptions = {
        title: '歌单详情',
        headerStyle: {
            backgroundColor: '#3685f4',
        },
        headerTintColor: '#fff',
    };

    // static navigationOptions = {
    //     // title: 'Home',
    //     header:null,
    // };

    componentWillMount(): void {

        let SonglistId = this.props.navigation.state.params.SonglistId;

        this.setState({
            SonglistId:SonglistId
        });
        this.getSongs(SonglistId);

        this.getSongList(SonglistId);

        this.getMysongLists();

    }

    getSongs(songlistId){
        const DataBaseModule = NativeModules.DataBaseModule;
        DataBaseModule.getSongByListId(songlistId).then((result)=>{
            // let songlistSongs = JSON.parse(result);
            // let songs = [];
            // songlistSongs.map((item,index)=>{
            //     songs[songs.length] = item.song
            // });
            this.setState({
                songs:JSON.parse(result)
            })
        })
    }

    getSongList(songlistId){
        const DataBaseModule = NativeModules.DataBaseModule;
        DataBaseModule.getSongListById(songlistId).then((result)=>{
            this.setState({
                SongList:JSON.parse(result)
            })
        })
    }

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

                {this.state.SongList&&this.state.SongList.songListCover?(
                    <View>
                        <Image source={{uri:this.state.SongList.songListCover}} style={{width:'100%',height:300}}/>
                        <Text style={{position: 'absolute',bottom: 0,left: 0,margin: 10,color:'#ffffff'}}>{this.state.SongList.songListIntro}</Text>
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
                    keyExtractor={(item,index)=>item}
                    renderItem={({item,index})=>(
                        <SongItem
                            ItemData={item}
                            index={index}
                            onMoreClick={()=>{
                                this.setState({
                                    MoreVisible:true,
                                    selectSong:item
                                })
                            }}
                            onPress={()=>{

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
                                <TouchableRipple style={{height:50,justifyContent:'center'}} onPress={()=>{
                                    // this.setState({
                                    //     AddListVisible:true,
                                    //     MoreVisible:false,
                                    // })
                                    const DataBaseModule = NativeModules.DataBaseModule;
                                    DataBaseModule.deleteSongFromList(JSON.stringify(this.state.selectSong),this.state.SonglistId).then((result)=>{
                                        if (result==='fail'){
                                            ToastAndroid.show("删除失败",ToastAndroid.SHORT);
                                        } else if (result==='succ'){
                                            ToastAndroid.show("删除成功",ToastAndroid.SHORT);
                                        }

                                        this.setState({
                                            MoreVisible:false,
                                            selectSong:null
                                        });

                                        this.getSongs(this.state.SonglistId);
                                    })
                                }}>
                                    <Text>从歌单中删除</Text>
                                </TouchableRipple>
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

export default connect(mapStateToProps)(SongListDetail);
