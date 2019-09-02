import React, { PureComponent } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button,TouchableRipple,Menu } from 'react-native-paper';
import { screen } from '../utils';
import * as TextTool from './TextTool';
import Icon from 'react-native-vector-icons/Ionicons';


class SongItem extends PureComponent {

    constructor(){
        super();
        this.state={
            visible:false
        }
    }

    _closeMenu(){

    }

    _openMenu(){
        this.setState({
            visible:true
        })
    }

    render() {

        const data = this.props.ItemData;

        return (
            <TouchableOpacity style={[styles.container, this.props.style]} onPress={this.props.onPress}>
                <View style={styles.leftPart}>
                    <TextTool.H2 color={'#5281ff'}>{data.songName}</TextTool.H2>
                    <TextTool.Normal>{data.album.singer.singerName+"-"+data.songName}</TextTool.Normal>
                </View>
                <TouchableRipple style={styles.rightPart} onPress={this.props.onMoreClick}>
                        <Image source={require('../../assets/more.png')} style={{width:20,height:20}}></Image>
                </TouchableRipple>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:100,
        flexDirection:'row',
        padding:10,
        // backgroundColor:'#fff000'
    },
    leftPart:{
        width: '90%',
        // backgroundColor:'#fff000',
        justifyContent:'space-around',
        padding: 8,
    },
    rightPart:{
        width:'10%',
        // backgroundColor: '#000fff',
        alignItems:'center',
        justifyContent:'center'
    }
});

export default SongItem;
