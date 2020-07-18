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

export default class Absen extends Component {

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
            absencerecord: []
            , loading: false
            , nis: ''
        }
        AsyncStorage.getItem('@Student_NIS').then(value => {
            firebase.database().ref("/AbsenceRecord").child(value).on('value', (childSnapshot) => {
                const absencerecord = [];
                childSnapshot.forEach((doc) => {
                    absencerecord.push({
                        key: doc.key,
                        Date: doc.toJSON().Date,
                        Info: doc.toJSON().Info,
                        Status: doc.toJSON().Status,
                        Subject: doc.toJSON().Subject
                    });
                    this.setState({
                        absencerecord: absencerecord,
                        loading: false,
                    });
                });
            });
            this.setState({ nis: value })
        });

    }

    renderRow({ item }) {
        //4dad4a
        //ec5252
        return (
            <View style={{
                padding: 16,
                borderRadius: 10,
                backgroundColor: item.Status == "Izin" ? '#4dad4a' : '#ec5252',
                marginBottom: 16
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.Date}</Text>
                    <BrHorizontal width={8}/>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.Subject}</Text>
                </View>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24 }}>{item.Status}</Text>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{item.Info}</Text>
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
                    }}>Attendance</Text>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: '#777777'
                    }}>Catatan aspek kehadiran santri dalam aktivitas KBM</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.absencerecord}
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
