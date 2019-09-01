import React, { PureComponent } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {Appbar, Button, Searchbar} from 'react-native-paper';

class HeadBar extends PureComponent {

    constructor(){
        super();
        this.state = {

        }
    }

    render() {

        const searchShow = this.props.searchShow;
        const title = this.props.title;
        const subtitle = this.props.subtitle;

        return (
            <Appbar.Header>
                {/*<Appbar.BackAction*/}
                {/*    onPress={}*/}
                {/*/>*/}
                {searchShow?(
                    <Searchbar
                        placeholder="搜索歌名"
                        onChangeText={query => {this.props.onChangeText(query)}}
                        value={this.props.keyword?this.props.keyword:''}
                        ref={'searchbar'}
                        onIconPress={()=>{
                            this.props.onIconPress()
                        }}
                        onSubmitEditing={()=>{
                            this.props.onSubmitEditing()
                        }}
                    />
                ):null}
                <Appbar.Content
                    title={title?title:'云音乐'}
                    subtitle={subtitle?subtitle:''}
                />
                <Appbar.Action icon="search" onPress={()=>{
                    this.props.ActionOne()
                }} />
                <Appbar.Action icon="more-vert" onPress={()=>{
                    this.props.ActionTwo()
                }} />
            </Appbar.Header>
        )
    }
}

const styles = StyleSheet.create({

});

export default HeadBar;
