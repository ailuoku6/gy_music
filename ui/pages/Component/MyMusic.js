/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    BackHandler,
    NativeModules, ScrollView, Alert, StatusBar,
} from 'react-native';
import {Searchbar, Appbar, Subheading, TouchableRipple, Button, Dialog, Portal} from 'react-native-paper';

import { connect } from 'react-redux';
import {setSongList, setuserInfo} from '../../redux/actions';
import SongList from '../widgets/SongList';
import randomImg from '../utils/config';
import MySonglist from '../widgets/MySonglist';
import AddSongList from './AddSongList';


//import TestFlatListSelect from "../components/Test";

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


class MyMusic extends Component {
    constructor() {
        super();
        this.state = {
            searchShow:false,
            keyword:'',
            mySonglists:[],
            modalVisible:false,
            changeSonglistInfo:false,
            selectSongList:null,
            editSonglist:false
        };
    }
    // static navigationOptions = {
    //     // title: 'Home',
    //     header:null,
    // };

    // changeStore(){
    //     this.props.dispatch(setSongList(["chgdhcgvdh","gvxgsvcghvsc"]))
    // }

    // componentWillMount(): void {
    //     this.getMysongLists();
    // }

    componentDidMount(): void {
        this.getMysongLists();
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        this.getMysongLists();
    }

    componentWillUnmount() {
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

    wrapClick(){
        if (this.state.searchShow){
            this.setState({
                searchShow:false
            })
        }
    }

    doSearch(){
        this.props.navigation.navigate('SearchPage',{
            keyword:this.state.keyword
        })
        // alert(JSON.stringify(this.props))
    }

    render() {

        let keyword = this.state.keyword;

        return (
            <TouchableRipple onPress={()=>{
                this.wrapClick()
            }}>

                <ScrollView style={styles.container}>
                    <StatusBar
                        backgroundColor="blue"
                        barStyle="light-content"
                    />

                    <Appbar.Header>
                        {/*<Appbar.BackAction*/}
                        {/*    onPress={}*/}
                        {/*/>*/}
                        {this.state.searchShow?(
                            <Searchbar
                                placeholder="搜索歌名"
                                onChangeText={query => { this.setState({ keyword: query}); }}
                                value={keyword}
                                ref={'searchbar'}
                                onIconPress={()=>{
                                    this.setState({
                                        searchShow:false
                                    })
                                }}
                                onSubmitEditing={()=>{
                                    this.setState({
                                        searchShow:false
                                    });
                                    this.doSearch();
                                }}
                            />
                        ):null}
                        <Appbar.Content
                            title="云音乐"
                            subtitle="我的音乐"
                        />
                        <Appbar.Action icon="search" onPress={()=>{
                            this.setState({
                                searchShow:true
                            })
                        }} />
                        <Appbar.Action icon="more-vert" onPress={()=>{

                        }} />
                    </Appbar.Header>

                    <Subheading style={{marginLeft:5,marginTop:10}}>我创建的歌单</Subheading>

                    {
                        this.state.mySonglists.map((item,index)=>{
                            return (
                                <MySonglist
                                    key={JSON.stringify(item)}
                                    ItemData={item}
                                    onPress={()=>{
                                        this.props.navigation.navigate('SongListDetail',{
                                            SonglistId:item.songListId
                                        });
                                    }}
                                    onMoreClick={()=>{
                                        this.setState({
                                            changeSonglistInfo:true,
                                            selectSongList:item
                                        })
                                    }}
                                />
                            )
                        })
                    }

                    <Button mode="contained" style={{margin:15}} onPress={() => {
                        this.setState({
                            modalVisible:true
                        })
                    }}>
                        新建歌单
                    </Button>

                    <Portal>
                        {this.state.modalVisible?(
                            <Dialog
                                visible={this.state.modalVisible}
                                onDismiss={()=>{
                                    this.setState({
                                        modalVisible:false,
                                    })
                                }}>
                                <Dialog.Content>
                                    <AddSongList onAddpress={()=>{
                                        this.getMysongLists();
                                    }}/>
                                </Dialog.Content>
                            </Dialog>
                        ):null}
                        {this.state.editSonglist?(
                            <Dialog
                                visible={this.state.editSonglist}
                                onDismiss={()=>{
                                    this.setState({
                                        editSonglist:false,
                                    })
                                }}>
                                <Dialog.Content>
                                    <AddSongList mode={'edit'} Songlist={this.state.selectSongList} onAddpress={()=>{
                                        this.getMysongLists();
                                        this.setState({
                                            editSonglist:false
                                        })
                                    }}/>
                                </Dialog.Content>
                            </Dialog>
                        ):null}
                        {this.state.changeSonglistInfo?(
                            <Dialog
                                visible={this.state.changeSonglistInfo}
                                onDismiss={()=>{
                                    this.setState({
                                        changeSonglistInfo:false,
                                        selectSongList:null
                                    })
                                }}>
                                <Dialog.Content>
                                    <TouchableRipple style={{height:50,justifyContent:'center'}} onPress={()=>{
                                        this.setState({
                                            changeSonglistInfo:false,
                                            editSonglist:true,
                                        });
                                    }}>
                                        <Text>编辑歌单信息</Text>
                                    </TouchableRipple>
                                    <TouchableRipple style={{height:50,justifyContent:'center'}} onPress={()=>{
                                        this.setState({
                                            changeSonglistInfo:false
                                        });
                                        Alert.alert(
                                            '确认删除?',
                                            null,
                                            [
                                                {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                                {text: '确认', onPress: () => {
                                                        const DataBaseModule = NativeModules.DataBaseModule;
                                                        DataBaseModule.deleteSongList(JSON.stringify(this.state.selectSongList)).then((result)=>{
                                                            if (result==='succ'){
                                                                ToastAndroid.show("删除成功",ToastAndroid.SHORT);
                                                                this.getMysongLists();
                                                            } else if (result==='fail') {
                                                                ToastAndroid.show("删除失败",ToastAndroid.SHORT);
                                                                this.getMysongLists();
                                                            }
                                                        });
                                                        this.setState({
                                                            changeSonglistInfo:false,
                                                            selectSongList:null
                                                        })
                                                    }},
                                            ],
                                            { cancelable: true }
                                        )
                                    }}>
                                        <Text>删除歌单</Text>
                                    </TouchableRipple>
                                </Dialog.Content>
                            </Dialog>
                        ):null}
                    </Portal>
                </ScrollView>


            </TouchableRipple>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        // height:'100%',
        width:'100%',
        // alignItems:'center',
        // justifyContent:'center',
        // backgroundColor:'#518eff'
    }
});

const mapStateToProps = ({playList,UserInfo,Unikey}) => ({
    list: playList.list,
    index:playList.index,
    playList,
    userInfo:UserInfo.userInfo,
    unikey:Unikey.unikey
});

export default connect(mapStateToProps)(MyMusic);

