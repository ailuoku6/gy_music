import * as React from 'react';
import {View, StyleSheet, NativeModules,ToastAndroid,FlatList,Image} from 'react-native';
import { Searchbar, Appbar, Subheading, TouchableRipple,Text,FAB} from 'react-native-paper';
import { connect } from 'react-redux'
import { setSongList } from '../redux/actions'

import SongItem from './widgets/SongItem'
import { screen } from './utils';
import judgeValue from './utils/judgeValue';

class SongListDetail extends React.Component {
    state = {
        SonglistId:'',
        SongList:'',
        songs:[]
    };

    static navigationOptions = {
        // title: 'Home',
        header:null,
    };

    componentWillMount(): void {

        let SonglistId = this.props.navigation.state.params.SonglistId;

        this.setState({
            SonglistId:SonglistId
        });
        this.getSongs(SonglistId);

        this.getSongList(SonglistId);

    }

    getSongs(songlistId){
        const DataBaseModule = NativeModules.DataBaseModule;
        DataBaseModule.getSongByListId(songlistId).then((result)=>{
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

                <Text>{JSON.stringify(this.state.SongList)}</Text>

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
                    renderItem={({item})=>(
                        <SongItem
                            ItemData={item}
                            onMoreClick={()=>{

                            }}
                            onPress={()=>{

                            }}

                        />)}
                />

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

                {/*<FAB*/}
                {/*    style={styles.fab}*/}
                {/*    icon="plus"*/}
                {/*    onPress={() => {*/}
                {/*        */}
                {/*    }}*/}
                {/*/>*/}
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
