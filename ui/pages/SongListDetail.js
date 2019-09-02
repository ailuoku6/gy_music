import * as React from 'react';
import {View, StyleSheet, NativeModules,ToastAndroid} from 'react-native';
import { Searchbar, Appbar, Subheading, TouchableRipple,Text} from 'react-native-paper';
import { connect } from 'react-redux'
import { setSongList } from '../redux/actions'

import SongItem from './widgets/SongItem'
import judgeValue from './utils/judgeValue';

class SongListDetail extends React.Component {
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

                {
                    this.state.songlist.length===0?(
                        <Text>无数据</Text>
                    ):null
                }

                {
                    this.state.songlist.map((item,index)=>{
                        return (
                            <SongItem
                                ItemData={item}
                                onMoreClick={
                                    ()=>{

                                    }
                                }
                                onPress={()=>{

                                }}
                            ></SongItem>
                        )
                    })
                }
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

export default connect(mapStateToProps)(SongListDetail);
