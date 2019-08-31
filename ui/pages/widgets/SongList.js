import React, { PureComponent } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { screen } from '../utils';
import * as TextTool from './TextTool';
import Icon from 'react-native-vector-icons/Ionicons';


class SongList extends PureComponent {
    render() {
        const { H1, Small, Normal, H3, Tip } = TextTool;
        const { rowNum = 3, title, subTitle, image, picUrl, item } = this.props;
        const realWidth = 0.9;
        const styles = StyleSheet.create({
            container: {
                marginTop: 10,
                width: screen.width * (realWidth/rowNum),
                margin:(1-realWidth)*screen.width/(2*rowNum),
            },
            imgContainer: {
                width: screen.width * (realWidth/rowNum),
                height: screen.width * (realWidth/rowNum),
                backgroundColor: 'transparent',
                borderRadius:15,
            },
            img: {
                width: '100%',
                height: '100%',
                position: 'absolute',
                zIndex: 1,
                borderRadius:10,
            },
            tipText: {
                position: 'absolute',
                top: 2,
                right: 5,
                zIndex: 10,
                flexDirection: 'row',
                alignItems: 'center'
            },
            textContainer: {
                width: screen.width * (realWidth/rowNum),
                padding: 5,
            }
        });
        const calculateCount = count => count > 10000 && ((count / 10000).toFixed(0) + '万') || count;
        return (
            <TouchableOpacity style={[styles.container, this.props.style]} onPress={this.props.onPress}>
                <View style={styles.imgContainer}>

                    {image?(
                        <Image source={image} style={styles.img} />
                    ):null}
                    {picUrl?(
                        <Image source={{uri: picUrl}} style={styles.img} />
                    ):null}
                    {
                        item.playCount && (
                            <View style={styles.tipText} >
                                <Icon name="ios-volume-down-outline" color="#ffffff" size={16} />
                                <Small title={calculateCount(item.playCount)} style={{color: '#ffffff'}} />
                            </View>
                        )
                    }
                </View>
                <View style={styles.textContainer}>
                    {/*小标题存在则限制显示一行*/}
                    {/*"[日系]一开始就被前奏秒杀系列2"*/}
                    <Normal title={title} numberOfLines={subTitle ? 1 : 2} />
                    {subTitle && <Tip title={subTitle} numberOfLines={1} />}
                </View>
            </TouchableOpacity>


        )
    }
}


export default SongList;
