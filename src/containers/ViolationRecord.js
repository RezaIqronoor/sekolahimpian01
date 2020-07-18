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

export default class ViolationRecord extends Component {

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
            violation: []
            , loading: false
            , nis: ''
        }

        AsyncStorage.getItem('@Student_NIS').then(value => {
            firebase.database().ref("/ViolationRecord").child(value).on('value', (childSnapshot) => {
                const violation = [];
                childSnapshot.forEach((doc) => {
                    violation.push({
                        key: doc.key,
                        Date: doc.toJSON().Date,
                        Info: doc.toJSON().Info,
                        Punishment: doc.toJSON().Punishment,
                        Violation: doc.toJSON().Violation,
                        Nis: doc.toJSON().Nis,
                    });
                    this.setState({
                        violation: violation,
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
                backgroundColor: '#ec5252',
                marginBottom: 16
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.Date}</Text>
                    <BrHorizontal width={8} />
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.Punishment}</Text>
                </View>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24 }}>{item.Violation}</Text>
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
                    }}>Violation</Text>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: '#777777'
                    }}>Catatan pelanggaran santri</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.violation}
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