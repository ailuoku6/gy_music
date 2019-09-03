import * as React from 'react';
import {View, StyleSheet, NativeModules, ToastAndroid, FlatList, Alert,ScrollView} from 'react-native';
import {Searchbar, TouchableRipple, Text, Dialog, Portal,TextInput,Button} from 'react-native-paper';
import { connect } from 'react-redux'
import { setSongList } from '../redux/actions'

import SongItem from './widgets/SongItem'
import judgeValue from './utils/judgeValue';
import AddSongList from './Component/AddSongList';
import MySonglist from './widgets/MySonglist';
import CommentItem from './widgets/CommentItem'

class Comment extends React.Component {
    state = {
        comments:[],
        song:null,
        comment:'',
        MoreVisible:false,
        selectComment:null,
    };

    static navigationOptions = {
        title: '评论',
        // header:null,
        headerStyle: {
            backgroundColor: '#3685f4',
        },
        headerTintColor: '#fff',
    };

    componentWillMount(): void {
        let songid = this.props.navigation.state.params.songId;
        // alert(songid)
        this.getCommentByid(songid);
        this.getSongById(songid);
    }

    getCommentByid(songid){
        const DataBaseModule = NativeModules.DataBaseModule;
        DataBaseModule.getCommentByid(songid).then((result)=>{
            this.setState({
                comments:JSON.parse(result)
            })
        })
    }

    getSongById(songid){
        const DataBaseModule = NativeModules.DataBaseModule;
        DataBaseModule.getSongById(songid).then((result)=>{
            this.setState({
                song:JSON.parse(result)
            })
        })
    }

    render() {
        // alert(JSON.stringify(this.props))

        // let keyword = this.state.keyword;

        // let songs = [];
        // this.state.songlist.map((item)=>{
        //     let node = new Object();
        //
        // });

        // alert(JSON.stringify(this.state.songlist[0].album.singer.singerName))

        return (
            <View style={{width:'100%',height:'100%'}}>

                <ScrollView style={{marginBottom:60}}>
                    {/*<Text>{JSON.stringify(this.state)}</Text>*/}
                    {/*<Searchbar*/}
                    {/*    placeholder="搜索歌名"*/}
                    {/*    onChangeText={query => { this.setState({ keyword: query}); }}*/}
                    {/*    value={keyword}*/}
                    {/*    ref={'searchbar'}*/}
                    {/*    onSubmitEditing={()=>{*/}
                    {/*        this.doSearch();*/}
                    {/*    }}*/}
                    {/*/>*/}

                    <Text>{JSON.stringify(this.state.comments[0])}</Text>

                    <FlatList
                        data={this.state.comments}
                        extraData={this.state}
                        keyExtractor={(item,index)=>JSON.stringify(item)}
                        renderItem={({item})=>(
                            <CommentItem
                                ItemData={item}
                                onPress={()=>{
                                    if (item.user.userId===this.props.userInfo.userId){
                                        // ToastAndroid.show("我的",ToastAndroid.SHORT);
                                        this.setState({
                                            MoreVisible:true,
                                            selectComment:item
                                        })
                                    }
                                }}
                            />
                        )}
                    />

                    <Portal>
                        {this.state.MoreVisible?(
                            <Dialog
                                visible={this.state.MoreVisible}
                                onDismiss={()=>{
                                    this.setState({
                                        MoreVisible:false,
                                        selectComment:null
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
                                        DataBaseModule.deleteComment(this.state.selectComment.commentId).then((result)=>{
                                            if (result==='fail'){
                                                ToastAndroid.show("删除失败",ToastAndroid.SHORT)
                                            } else if (result==='succ'){
                                                ToastAndroid.show("删除成功",ToastAndroid.SHORT)
                                            }
                                            this.getCommentByid(this.state.song.songId);
                                            this.setState({
                                                MoreVisible:false,
                                                selectComment:null
                                            })
                                        })
                                    }}>
                                        <Text>删除</Text>
                                    </TouchableRipple>
                                </Dialog.Content>
                            </Dialog>
                        ):null}
                    </Portal>

                </ScrollView>

                <View style={styles.writecomment}>
                    <TextInput
                        label='comment'
                        value={this.state.comment}
                        onChangeText={text => this.setState({ comment:text })}
                        style={{width:'80%',height:'90%'}}
                    />
                    <Button mode="contained" onPress={() => {
                        if (this.state.comment===''){
                            ToastAndroid.show("评论不能为空",ToastAndroid.SHORT);
                            return;
                        }
                        const DataBaseModule = NativeModules.DataBaseModule;
                        DataBaseModule.sendComment(this.props.userInfo.userId,this.state.song.songId,1,this.state.comment).then((result)=>{
                            if (result==='fail'){
                                ToastAndroid.show("评论失败",ToastAndroid.SHORT)
                            } else if (result==='succ'){
                                ToastAndroid.show("评论成功",ToastAndroid.SHORT)
                            }
                        });
                        this.setState({
                            comment:''
                        });
                        this.getCommentByid(this.state.song.songId)
                    }}>
                        发送
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    writecomment:{
        position:'absolute',
        bottom:0,
        height: 60,
        width: '100%',
        // backgroundColor: '#fff000',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        borderTopWidth:1
    }
});


const mapStateToProps = ({playList,UserInfo}) => ({
    list: playList.list,
    index:playList.index,
    playList,
    userInfo:UserInfo.userInfo
});

export default connect(mapStateToProps)(Comment);
