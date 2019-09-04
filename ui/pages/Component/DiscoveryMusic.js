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
    NativeModules,
    ScrollView
} from 'react-native';
import { Searchbar, Appbar, Subheading, TouchableRipple} from 'react-native-paper';

import { connect } from 'react-redux';
import { setSongList } from '../../redux/actions'
import SongList from '../widgets/SongList'
import RankingItem from '../widgets/RankingItem'
import randomImg from '../utils/config'
import HeadBar from '../widgets/HeadBar'


//import TestFlatListSelect from "../components/Test";

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


class DiscoveryMusic extends Component {
    constructor() {
        super();
        this.state = {
            keyword:'',
            searchShow:false,
            songLists:[],
            Rankings:[]
        };
    }
    // static navigationOptions = {
    //     // title: 'Home',
    //     header:null,
    // };

    // changeStore(){
    //     this.props.dispatch(setSongList(["chgdhcgvdh","gvxgsvcghvsc"]))
    // }

    componentWillMount(): void {
        this.getrecommendSongList();
        this.getRankings();
    }

    getrecommendSongList(){
        const DataBaseModule = NativeModules.DataBaseModule;
        DataBaseModule.getrecommendSongList().then((result)=>{
            this.setState({
                songLists:JSON.parse(result)
            })
        })
    }

    getRankings(){
        const DataBaseModule = NativeModules.DataBaseModule;
        DataBaseModule.getRankings().then((result)=>{
            this.setState({
                Rankings:JSON.parse(result)
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

        const { keyword } = this.state;

        return (
            <TouchableRipple onPress={()=>{
                this.wrapClick()
            }}>

                <View style={{width: '100%',height:'100%'}}>
                    <ScrollView style={styles.container}>

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
                                subtitle="发现音乐"
                            />
                            <Appbar.Action icon="search" onPress={()=>{
                                this.setState({
                                    searchShow:true
                                })
                            }} />
                            <Appbar.Action icon="more-vert" onPress={()=>{

                            }} />
                        </Appbar.Header>

                        <Subheading style={{marginLeft:5,marginTop:10}}>推荐歌单</Subheading>


                        <View style={styles.songListWrap}>

                            {this.state.songLists.length===0?(
                                <Text>这里，空空的</Text>
                            ):null}

                            {
                                this.state.songLists.map((item,index)=>{
                                    return (
                                        <SongList
                                            title={item.songListTitle}
                                            subTitle={item.songListIntro}
                                            picUrl={item.songListCover}
                                            rowNum={3}
                                            item={{playCount:100000}}
                                            onPress={()=>{
                                                this.props.navigation.navigate('SongListDetail',{
                                                    SonglistId:item.songListId
                                                });
                                            }}
                                        />
                                    )
                                })
                            }

                            {/*<SongList*/}
                            {/*    title={'雅俗共赏'}*/}
                            {/*    subTitle={'快写一首情歌雅俗共赏'}*/}
                            {/*    picUrl={randomImg()}*/}
                            {/*    rowNum={3}*/}
                            {/*    item={{playCount:100000000}}*/}
                            {/*/>*/}
                            {/*<SongList*/}
                            {/*    title={'雅俗共赏'}*/}
                            {/*    subTitle={'快写一首情歌雅俗共赏'}*/}
                            {/*    picUrl={randomImg()}*/}
                            {/*    rowNum={3}*/}
                            {/*    item={{playCount:100000000}}*/}
                            {/*/>*/}
                            {/*<SongList*/}
                            {/*    title={'雅俗共赏'}*/}
                            {/*    subTitle={'快写一首情歌雅俗共赏'}*/}
                            {/*    picUrl={randomImg()}*/}
                            {/*    rowNum={3}*/}
                            {/*    item={{playCount:100000000}}*/}
                            {/*/>*/}
                            {/*<SongList*/}
                            {/*    title={'雅俗共赏'}*/}
                            {/*    subTitle={'快写一首情歌雅俗共赏'}*/}
                            {/*    picUrl={randomImg()}*/}
                            {/*    rowNum={3}*/}
                            {/*    item={{playCount:100000000}}*/}
                            {/*/>*/}
                            {/*<SongList*/}
                            {/*    title={'雅俗共赏'}*/}
                            {/*    subTitle={'快写一首情歌雅俗共赏'}*/}
                            {/*    picUrl={randomImg()}*/}
                            {/*    rowNum={3}*/}
                            {/*    item={{playCount:100000000}}*/}
                            {/*/>*/}
                        </View>

                        <Subheading style={{marginLeft:5,marginTop:10}}>排行榜</Subheading>

                        {/*<Text>{JSON.stringify(this.state.Rankings[0])}</Text>*/}

                        {this.state.Rankings.map((item,index)=>{
                            return (
                                <RankingItem
                                    ItemData={{cover:item.items[0].song.songCover,intro:item.ranking.rankingName,song:item.items}}
                                    onPress={()=>{
                                        this.props.navigation.navigate('RankingDetail',{
                                            songs:item.items,
                                            Ranking:item.ranking,
                                        });
                                    }}
                                />
                            )
                        })}

                    </ScrollView>
                </View>
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
        // backgroundColor:'#f8ffc8'
    },
    songListWrap:{
        // width:'100%',
        // justifyContent:'space-around',
        flexWrap:'wrap',
        flexDirection:'row',
    }
});

const mapStateToProps = ({playList}) => ({
    list: playList.list,
    index:playList.index,
    playList
});

export default connect(mapStateToProps)(DiscoveryMusic);

