import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import firebase from '../db/FirebaseSetting'

export default class News extends React.Component {

    state = {
        news_list: [],
        height: 150
    }

    componentDidMount = () => {
        firebase.database().ref("/News").on('value', (childSnapshot) => {
            const news_list = [];
            childSnapshot.forEach((doc) => {
                console.log(doc.toJSON().title)
                news_list.push({
                    date: doc.key,
                    title: doc.toJSON().title,
                    sub_title: doc.toJSON().sub_title,
                    content: doc.toJSON().content,
                    image: doc.toJSON().image,
                })
                this.setState({
                    news_list: news_list
                }, () => console.log(this.state))
            });
        });
    }

    renderNewsCard = (item) => {
        return (
            <TouchableOpacity
                onPress={() => { this.props.navigation.navigate('NewsView', { data: item }) }}
                style={{
                    backgroundColor: 'white',
                    marginBottom: 8
                }}>
                <Image
                    style={{
                        height: 200,
                        width: '100%'
                    }}
                    source={{ uri: item.image }} />
                <View style={{
                    padding: 8
                }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                        }}>{item.title}</Text>
                    <Text
                        style={{
                            fontSize: 16,
                            color: 'grey',
                        }}>{item.sub_title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={s.container}>
                <FlatList
                    data={this.state.news_list}
                    renderItem={({ item }) => this.renderNewsCard(item)} />
            </View>
        )
    }
}

const s = StyleSheet.create({
    container: {
        flex: 1
    },
    cardStyle: {
        backgroundColor: 'grey'
    }
})