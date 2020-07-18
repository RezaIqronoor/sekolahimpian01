import React, { Component } from 'react';
import { View, Text, AsyncStorage, ToastAndroid, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import firebase from '../db/FirebaseSetting';

class BrHorizontal extends React.Component {
    render() {
        return (
            <View style={{ width: this.props.width }} />
        )
    }
}

export default class Tahfiz extends Component {

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
            tahfizhrecord: []
            , loading: false
            , nis: ''
        }

        AsyncStorage.getItem('@Student_NIS').then(value => {
            firebase.database().ref("/TahfizRecord").child(value).on('value', (childSnapshot) => {
                const tahfizhrecord = [];
                childSnapshot.forEach((doc) => {
                    tahfizhrecord.push({
                        key: doc.key,
                        Achievement: doc.toJSON().Achievement,
                        Info: doc.toJSON().Info,
                        Value: doc.toJSON().Value,
                    });
                    this.setState({
                        tahfizhrecord: tahfizhrecord,
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
                    <Text style={{ color: '#282c34', fontWeight: 'bold' }}>{item.key}</Text>
                    <BrHorizontal width={8}/>
                    <Text style={{ color: '#282c34', fontWeight: 'bold' }}>{item.Value}</Text>
                </View>
                <Text style={{ color: '#282c34', fontWeight: 'bold', fontSize: 24 }}>{item.Achievement}</Text>
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
                    }}>Tahfidz</Text>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: '#777777'
                    }}>Pencapaian santri bidang Tahfizul Quran</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.tahfizhrecord}
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
