import React, { PureComponent } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button,TouchableRipple,Menu } from 'react-native-paper';
import { screen } from '../utils';
import * as TextTool from './TextTool';
import Icon from 'react-native-vector-icons/Ionicons';


class MySonglist extends PureComponent {

    constructor(){
        super();
        this.state={
        }
    }

    render() {

        const data = this.props.ItemData;

        return (
            <TouchableOpacity style={[styles.container, this.props.style]} onPress={this.props.onPress}>

                <View style={styles.leftPart}>
                    <Image style={{height:80,width:80,borderRadius:5}} source={{uri:data.songListCover}}/>
                    <View style={styles.info}>
                        <TextTool.H2 color={'#5281ff'}>{data.songListTitle}</TextTool.H2>
                        <TextTool.Normal>{data.songListIntro}</TextTool.Normal>
                    </View>
                </View>
                {
                    this.props.onMoreClick?(
                        <TouchableRipple style={styles.rightPart} onPress={this.props.onMoreClick}>
                            <Image source={require('../../assets/more.png')} style={{width:20,height:20}}></Image>
                        </TouchableRipple>
                    ):null
                }

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
        flexDirection:'row',
        alignItems:'center',
        padding: 8,
    },
    info:{
        justifyContent:'space-around',
        marginLeft:10,
        height:'100%'
    },
    rightPart:{
        width:'10%',
        // backgroundColor: '#000fff',
        alignItems:'center',
        justifyContent:'center'
    }
});

export default MySonglist;
