import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, ToastAndroid, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import firebase from '../db/FirebaseSetting';

class BrHorizontal extends React.Component {
    render() {
        return (
            <View style={{ width: this.props.width }} />
        )
    }
}

export default class Disease extends Component {

    static navigationOptions = {
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        headerStyle: {
            elevation: 0,
        },
    }

    constructor(props) {
        super(props)
        this.state = {
            diseaserecord: []
            , loading: false
            , nis: ''
        }

        AsyncStorage.getItem('@Student_NIS').then(value => {
            firebase.database().ref("/DiseaseRecord").child(value).on('value', (childSnapshot) => {
                const diseaserecord = [];
                childSnapshot.forEach((doc) => {
                    diseaserecord.push({
                        key: doc.key,
                        Date: doc.toJSON().Date,
                        // DateEnd: doc.toJSON().DateEnd,
                        Disease: doc.toJSON().Disease,
                        Info: doc.toJSON().Info
                    });
                    this.setState({
                        diseaserecord: diseaserecord,
                        loading: false,
                    });
                });
            });
            this.setState({ nis: value })
        });
    }

    renderRow({ item }) {
        return (
            <View style={{
                padding: 16,
                borderRadius: 10,
                backgroundColor: 'white',
                marginBottom: 16
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: '#282c34', fontWeight: 'bold' }}>{item.Date}</Text>
                </View>
                <Text style={{ color: '#282c34', fontWeight: 'bold', fontSize: 24 }}>{item.Disease}</Text>
                <Text style={{ color: '#282c34', fontWeight: 'bold', fontSize: 16 }}>{item.Info}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.maincontainer}>
                <View
                    style={{
                        height: 100,
                        backgroundColor: 'white',
                        paddingHorizontal: 16
                    }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 32
                    }}>Illness</Text>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: '#777777'
                    }}>Catatan aspek kesehatan santri</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.diseaserecord}
                        keyExtractor={item => item.id}
                        renderItem={this.renderRow.bind(this)}
                        contentContainerStyle={{
                            paddingTop: 20,
                            paddingHorizontal: 16
                        }}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#f3f5fa',
    },

})
