import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import firebase from '../db/FirebaseSetting'

export default class NewsView extends React.Component {

    state = {
        news_list: [],
        height: 150,
        data: this.props.navigation.getParam('data')
    }

    render() {
        return (
            <View style={s.container}>
                <Image
                    style={{
                        height: 200,
                        width: '100%'
                    }}
                    source={{ uri: this.state.data.image }} />
                <View style={{
                    padding: 8
                }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}>{this.state.data.title}</Text>
                    <Text
                        style={{
                            fontSize: 16,
                            color: 'grey',
                        }}>{this.state.data.sub_title}</Text>
                    <Text
                        style={{
                            color: 'grey',
                            marginTop: 16
                        }}>{this.state.data.date}</Text>
                    <Text
                        style={{
                            color: 'black',
                            marginTop: 16
                        }}>{this.state.data.content}</Text>
                </View>
            </View>
        )
    }
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    cardStyle: {
        backgroundColor: 'grey'
    }
})