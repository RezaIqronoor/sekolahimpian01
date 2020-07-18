import React from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import firebase from '../db/FirebaseSetting';
import email from 'react-native-email'

class Br extends React.Component {
    render() {
        return (
            <View style={{ height: this.props.height }} />
        )
    }
}

export default class Pengaduan extends React.Component {

    static navigationOptions = {
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        headerStyle: {
            elevation: 0,
        },
    }

    state = {
        subject: '',
        message: '',
        user_email: ''
    }

    componentDidMount = () => {
        var user = firebase.auth().currentUser;
        this.setState({ user_email: user.email })
    }

    handleEmail = () => {
        const to = ['support@sekolahimpian.com'] // string or array of email addresses
        email(to, {
            subject: this.state.subject,
            body: this.state.message
        }).catch(console.error)
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
                    }}>Complaint</Text>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: '#777777'
                    }}>Terdapat hal yang ingin di adukan? hubungi kami</Text>
                </View>
                <View style={{
                    flex: 1,
                    paddingHorizontal: 16,
                    paddingTop: 16,
                    justifyContent: 'space-between'
                }}>
                    <View>
                        <View style={{
                            width: '100%',
                            padding: 16,
                            backgroundColor: 'white',
                            borderRadius: 10
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>Topik</Text>
                            <TextInput
                                placeholder='Masukkan Topik'
                                placeholderTextColor='#888888'
                                onChangeText={subject => this.setState({ subject })}
                                value={this.state.subject}
                                style={{
                                    color: '#888888',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    width: '100%'
                                }} />
                        </View>
                        <Br height={16} />
                        <View style={{
                            width: '100%',
                            padding: 16,
                            backgroundColor: 'white',
                            borderRadius: 10,
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>Pesan</Text>
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="Pesan anda"
                                placeholderTextColor="grey"
                                multiline={true}
                                onChangeText={message => this.setState({ message })}
                                value={this.state.message}
                                style={{
                                    color: '#888888',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    width: '100%',
                                    alignItems: 'flex-start'
                                }}
                            />
                        </View>
                    </View>
                    <Button onPress={() => this.handleEmail()}/>
                </View>
            </View>
        )
    }
}

class Button extends React.Component {
    render() {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={this.props.onPress}
                style={{
                    width: '100%',
                    padding: 16,
                    backgroundColor: '#eb9e3e',
                    borderRadius: 10,
                    marginBottom: 16,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: 'white'
                }}>Kirimkan</Text>
            </TouchableOpacity>
        )
    }
}