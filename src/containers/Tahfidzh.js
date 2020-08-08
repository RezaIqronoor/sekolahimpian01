import React, { Component } from 'react';
import { View, Text, AsyncStorage, Image, TouchableOpacity, StyleSheet, FlatList, Linking } from 'react-native';
import firebase from '../db/FirebaseSetting';

export default class Tahfidzh extends Component {

    static navigationOptions = {
        title: 'Tahfidzh',
        headerStyle: {
            elevation: 0
        },
    };

    constructor(props) {
        super(props)
        this.state = {
            tahfizhrecord: [],
            loading: false,
            nis: '',
            teacher_list: []
        }

        AsyncStorage.getItem('@Student_NIS').then(value => {
            firebase.database().ref("/Tahfidzh").child(value).on('value', (childSnapshot) => {
                const tahfizhrecord = [];
                childSnapshot.forEach((doc) => {
                    tahfizhrecord.push({
                        date: doc.key,
                        achievement: doc.toJSON().achievement,
                        additional_info: doc.toJSON().additional_info,
                        score: doc.toJSON().score,
                        type: doc.toJSON().type,
                    });
                    this.setState({
                        tahfizhrecord: tahfizhrecord,
                        loading: false,
                    });
                });
            });
            this.setState({ nis: value })

            firebase.database().ref("/AssignedTeacher").on('value', (childSnapshot) => {
                let teacher_list = [];
                childSnapshot.forEach((doc) => {
                    if (doc.toJSON().subject == 'Tahfidzh') {
                        teacher_list.push({
                            id: doc.key,
                            name: doc.toJSON().name,
                            phone_number: doc.toJSON().phone_number,
                            profile_picture: doc.toJSON().profile_picture,
                            subject_type: doc.toJSON().subject_type,
                        });
                        this.setState({
                            teacher_list: teacher_list,
                            loading: false,
                        }, () => console.log(this.state.teacher_list));
                    }
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
                <Text style={{ color: '#282c34', fontWeight: 'bold' }}>{item.type}</Text>
                    <BrHorizontal width={8} />
                    <Text style={{ color: '#282c34', fontWeight: 'bold' }}>{item.date}</Text>
                    <BrHorizontal width={8} />
                    <Text style={{ color: '#282c34', fontWeight: 'bold' }}>{item.score}</Text>
                </View>
                <Text style={{ color: '#282c34', fontWeight: 'bold', fontSize: 24 }}>{item.achievement}</Text>
                <Text style={{ color: '#282c34', fontWeight: 'bold', fontSize: 16 }}>{item.additional_info}</Text>
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
                        paddingHorizontal: 16,
                        justifyContent: 'space-evenly'
                    }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: '#777777'
                    }}>Pendamping Tahfidzh</Text>
                    <Br height={8} />
                    <FlatList
                        data={this.state.teacher_list}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => {
                                    try {
                                        Linking.openURL('whatsapp://send?text=Assalamualaikum&phone=' + item.phone_number)
                                    } catch (error) {
                                        console.log(error)
                                    }
                                }}
                                style={{
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: '#f3f5fa',
                                    paddingHorizontal: 8,
                                    borderRadius: 10,
                                    marginRight: 8
                                }}>
                                <Image
                                    source={{ uri: item.profile_picture }}
                                    style={{ height: 50, width: 50, backgroundColor: 'grey', borderRadius: 50 }} />
                                <BrHorizontal width={8} />
                                <View style={{ flexDirection: 'column' }}>
                                    <Text>{item.name} / {item.subject_type}</Text>
                                    <Text>{item.phone_number}</Text>
                                </View>
                            </TouchableOpacity>} />
                    <Br height={8} />
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

class BrHorizontal extends React.Component {
    render() {
        return (
            <View style={{ width: this.props.width }} />
        )
    }
}

const Br = ({ height }) => {
    return (
        <View style={{ height: height }} />
    )
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#f3f5fa',
    },

})
