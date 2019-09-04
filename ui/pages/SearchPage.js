import * as React from 'react';
import {View, StyleSheet, NativeModules, ToastAndroid, FlatList, Alert, ScrollView} from 'react-native';
import {Searchbar, Appbar, Subheading, TouchableRipple, Text, Dialog, Portal} from 'react-native-paper';
import { connect } from 'react-redux'
import { setSongList,setCurrentIndex,setIsPlaying } from '../redux/actions'

import SongItem from './widgets/SongItem'
import judgeValue from './utils/judgeValue';
import AddSongList from './Component/AddSongList';
import MySonglist from './widgets/MySonglist';

class SearchPage extends React.Component {
    state = {
        keyword:'',
        songlist:[],
        MoreVisible:false,
        AddListVisible:false,
        selectSong:null,
        mySonglists:[]
    };

    static navigationOptions = {
        title: '搜索结果',
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

        let keyword = this.props.navigation.state.params.keyword;

        this.setState({
            keyword:keyword
        },()=>{
            this.doSearch()
        });
        this.getMysongLists();
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

    doSearch(){
        if (!judgeValue(this.state.keyword)){
            ToastAndroid.show("关键字不能为空",ToastAndroid.SHORT);
            return;
        }
        const DataBaseModule = NativeModules.DataBaseModule;
        DataBaseModule.searchSong(this.state.keyword).then((result)=>{
            this.setState({
                songlist:JSON.parse(result)
            })
        })
    }

    render() {
        // alert(JSON.stringify(this.props))

        let keyword = this.state.keyword;
        // let data = {songName:'雅俗共赏',singer:'许嵩'}

        // let songs = [];
        // this.state.songlist.map((item)=>{
        //     let node = new Object();
        //
        // });

        // alert(JSON.stringify(this.state.songlist[0].album.singer.singerName))

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

                {/*<Text>{JSON.stringify(this.state)}</Text>*/}

                {
                    this.state.songlist.length===0?(
                        <Text>无数据</Text>
                    ):null
                }

                <FlatList
                    data={this.state.songlist}
                    extraData={this.state}
                    keyExtractor={(item,index)=>item}
                    renderItem={({item})=>(
                        <SongItem
                            ItemData={item}
                            onMoreClick={()=>{
                                this.setState({
                                    MoreVisible:true,
                                    selectSong:item
                                })
                            }}
                            onPress={()=>{
                                let songlist = this.props.list;
                                songlist[songlist.length] = item;
                                this.props.dispatch(setIsPlaying(true));
                                this.props.dispatch(setSongList(songlist));
                                this.props.dispatch(setCurrentIndex(songlist.length-1))
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
                                    // selectSong:null
                                })
                            }}>
                            <Dialog.Content>
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

                {/*{*/}
                {/*    this.state.songlist.map((item,index)=>{*/}
                {/*        return (*/}
                {/*            <SongItem*/}
                {/*                ItemData={item}*/}
                {/*                onMoreClick={*/}
                {/*                    ()=>{*/}

                {/*                    }*/}
                {/*                }*/}
                {/*                onPress={()=>{*/}

                {/*                }}*/}
                {/*            ></SongItem>*/}
                {/*        )*/}
                {/*    })*/}
                {/*}*/}
                {/*<SongItem*/}
                {/*    ItemData={data}*/}
                {/*    onMoreClick={*/}
                {/*        ()=>{*/}

                {/*        }*/}
                {/*    }*/}
                {/*></SongItem>*/}
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

export default connect(mapStateToProps)(SearchPage);
