import React, { Component } from 'react';
import { View, AsyncStorage, TouchableOpacity, FlatList, Image, Dimensions, StyleSheet, Text } from 'react-native';
import firebase from "../db/FirebaseSetting";
import ImageView from 'react-native-image-view';
const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;

//navigation.state.params.Key
export default class AlbumImage extends Component {

    static navigationOptions = {
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        headerStyle: {
            elevation: 0,
        },
    }

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            pos: 0,
            key: '',
            status: false,
        };

        AsyncStorage.getItem('@SelectedAlbum').then((value) => {
            this.setState({ key: value })
            firebase.database().ref(`/Album/${value}`).child('Images').once('value', (childSnapshot) => {
                const images = [];
                childSnapshot.forEach((doc) => {
                    images.push({
                        source: {
                            uri: doc.val()
                        },
                        title: 'image',
                        height: 450,
                        width: imageWidth,
                        key: doc.key,
                        pos: this.state.pos
                    });

                    this.setState({
                        images: images,
                        pos: this.state.pos + 1,
                        key: value
                    });
                });
            });
        })
    }

    navigateBack() {
        this.props.navigation.navigate('Album')
    }

    renderRow({ item }) {
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        this.setState({
                            status: true,
                            pos: item.pos
                        })
                    }}>
                    <Image
                        style={{ width: Dimensions.get('screen').width / 2, height: 165, alignSelf: 'center' }}
                        source={{ uri: item.source.uri }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f3f5fa' }}>
                <View
                    style={{
                        height: 100,
                        backgroundColor: 'white',
                        paddingHorizontal: 16
                    }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 32
                    }}>{this.props.navigation.state.params.Key}</Text>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: '#777777'
                    }}>Momen-momen tentang {this.props.navigation.state.params.Key}</Text>
                </View>
                <ImageView
                    images={this.state.images}
                    animationType="fade"
                    isVisible={this.state.status}
                    imageIndex={this.state.pos}
                    onClose={() => {
                        this.setState({
                            status: false,
                        })
                    }}
                />
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.images}
                        contentContainerStyle={styles.grid}
                        renderItem={this.renderRow.bind(this)}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        height: 300,
        width: imageWidth,
    },

    grid: {

        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});
