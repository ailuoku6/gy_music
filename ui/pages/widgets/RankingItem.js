import React, { PureComponent } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { screen } from '../utils';
import * as TextTool from './TextTool';
import Icon from 'react-native-vector-icons/Ionicons';


class RankingItem extends PureComponent {
    render() {

        const data = this.props.ItemData;

        return (
            <TouchableOpacity style={[styles.container, this.props.style]} onPress={this.props.onPress}>
                <View style={styles.container}>
                    <View style={styles.leftPart}>
                        {data&&data.cover?(
                            <Image source={{uri:data.cover}} style={styles.img} />
                        ):null}
                        <Text style={styles.label}>{data.intro}</Text>
                    </View>
                    <View style={styles.rightPart}>
                        {data.song.map((item,index)=>{
                            return (index>2?null:(
                                <Text>{(index+1)+'.'+item}</Text>
                            ))
                        })}
                        {/*<Text>{data.song[0]}</Text>*/}
                        {/*<Text>{data.song[1]}</Text>*/}
                        {/*<Text>{data.song[2]}</Text>*/}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:'row',
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

export default RankingItem;
