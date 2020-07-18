import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet, Dimensions, FlatList, AsyncStorage, ToastAndroid } from 'react-native'
import firebase from "../db/FirebaseSetting";

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;

export default class Album extends Component {

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
            album: [],
            albumName: '',
            albumImage: '',
        }
    }

    componentDidMount() {
        this._mounted = true;
        firebase.database().ref('/Album').on('value', (childSnapshot) => {
            const album = [];
            childSnapshot.forEach((doc) => {
                album.push({
                    key: doc.key,
                    AlbumName: doc.toJSON().AlbumName,
                    AlbumImage: doc.toJSON().AlbumImage,
                });
                this.setState({
                    album: album,
                });
            });
        });
    }

    navigateNext(key) {
        AsyncStorage.setItem('@SelectedAlbum', key)
        this.props.navigation.navigate('AlbumImage', { Key: key })
    }

    navigateBack() {
        this.props.navigation.navigate('MainMenu')
    }

    renderRow({ item }) {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.navigateNext(item.key)}>
                <View style={{
                    width: '100%',
                    height: 300,
                    marginBottom: 16,
                    borderRadius: 10,
                    backgroundColor: 'white',
                    elevation: 10
                }}>
                    <Image
                        style={{
                            width: '100%',
                            height: 300,
                            borderRadius: 10
                        }}
                        source={{ uri: item.AlbumImage }}
                    />
                </View>
            </TouchableOpacity>
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
                    }}>Album</Text>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: '#777777'
                    }}>Berisi banyak potretan momen para santri</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.album}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 20,
                            paddingTop: 16
                        }}
                        renderItem={this.renderRow.bind(this)}
                    />
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
    },
    image: {
        height: 300,
        width: imageWidth,
    }
});