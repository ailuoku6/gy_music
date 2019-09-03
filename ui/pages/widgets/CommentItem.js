import React, { PureComponent } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { screen } from '../utils';
import * as TextTool from './TextTool';
import Icon from 'react-native-vector-icons/Ionicons';
import randomImg from '../utils/config';
import time from '../utils/time'


class CommentItem extends PureComponent {
    render() {

        const data = this.props.ItemData;

        return (
            <TouchableOpacity style={[styles.container, this.props.style]} onPress={this.props.onPress}>
                <View style={styles.container}>
                    <View style={{height: 40,width:'100%',flexDirection: 'row',alignItems:'center'}}>
                        <Image
                            source={{uri:data.user.avatar?data.user.avatar:randomImg()}}
                            style={{width:36,height:36,borderRadius: 18}}
                        />
                        <View style={{justifyContent:'space-around',marginLeft: 10}}>
                            <Text>{data.user.userName}</Text>
                            <Text>{time(data.commentDate)}</Text>
                        </View>
                    </View>
                    <View style={{marginLeft:45}}>
                        <Text>{data.commentText}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        // flexDirection:'row',
        padding:10,
        // backgroundColor:'#fff000'
    },
    leftPart:{
        // alignItems:'flex-start',
        // justifyContent:'center'
    },
    img:{
        height:120,
        width:120,
        borderRadius:10,
    },
    rightPart:{
        // backgroundColor: '#000fff',
        marginLeft:10,
        justifyContent:'space-around'
    },
    label:{
        position:'absolute',
        left:5,
        bottom:5,
        color:'#ffffff'
    }
});

export default CommentItem;
