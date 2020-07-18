import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import firebase from '../db/FirebaseSetting';

//http://192.168.100.244/video.cgi

export default class CCTV extends React.Component {

    static navigationOptions = {
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        headerStyle: {
            elevation: 0,
        },
    }

    state = {
        CCTV: []
    }

    componentDidMount = () => {
        firebase.database().ref('CCTV').on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                items.push({
                    id: child.key,
                    Name: child.val().Name,
                    Ip: child.val().Ip,
                });
            });

            this.setState({ CCTV: items });
        });
    }


    renderRow({ item }) {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.props.navigation.navigate('CCTV', { ip: item.Ip }, { name: 'Name' })}
                style={{
                    padding: 16,
                    borderRadius: 10,
                    backgroundColor: 'white',
                    marginBottom: 16,
                    alignItems: 'center'
                }}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 24 }}>{item.Name}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#f3f5fa',
            }}>
                <View
                    style={{
                        height: 100,
                        backgroundColor: 'white',
                        paddingHorizontal: 16
                    }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 32
                    }}>CCTV</Text>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: '#777777'
                    }}>Melihat aktifitas santri secara langsung</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.CCTV}
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

var styles = StyleSheet.create({
});