import React, { Component } from 'react'
import { StyleSheet, BackHandler, Text, TextInput, View, ToastAndroid, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import firebase from '../db/FirebaseSetting';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = { email: '', password: '', errorMessage: null, loading: false }
    }

    handleLogin = () => {
        this.setState({ loading: true });
        const { email, password } = this.state
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('ChooseChild'))
            .catch(error => {
                this.setState({ errorMessage: 'Username & Password tidak cocok', loading: false })
                alert(error)
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ height: '60%' }}>
                    <Image
                        resizeMode={"contain"}
                        source={require('src/images/logo.png')}
                        style={{
                            height: 50,
                            width: 50
                        }} />
                    <Br height={16} />
                    <Text style={{ fontWeight: '500', fontSize: 24, fontWeight: 'bold', color: 'black' }}>Masuk dengan email</Text>
                    <Br height={32} />
                    <View style={{ justifyContent: 'space-between' }}>
                        <View>
                            <TextInput
                                placeholder='Email'
                                placeholderTextColor='#888888'
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                                style={{
                                    color: '#888888',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    width: '100%',
                                    backgroundColor: '#F7F7F7',
                                    paddingHorizontal: 16,
                                    borderRadius: 8
                                }} />
                            <Br height={16} />
                            <TextInput
                                placeholder='Password'
                                secureTextEntry={true}
                                placeholderTextColor='#888888'
                                onChangeText={(password) => this.setState({ password })}
                                value={this.state.password}
                                style={{
                                    color: '#888888',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    width: '100%',
                                    backgroundColor: '#F7F7F7',
                                    paddingHorizontal: 16,
                                    borderRadius: 8
                                }} />
                        </View>
                        <Br height={32} />
                        <View>
                            <Button
                                backgroundColor={'#4a8af4'}
                                text="Masuk"
                                textColor="white"
                                onPress={() => this.handleLogin()} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

class Br extends React.Component {
    render() {
        return (
            <View style={{ height: this.props.height }} />
        )
    }
}

class Button extends React.Component {
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={{
                    width: '100%',
                    height: 48,
                    backgroundColor: this.props.backgroundColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8
                }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: this.props.textColor
                }}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        backgroundColor: 'white',
        height: '60%'
    },
    textInput: {
        height: 60,
        width: '90%',
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 8,
        borderRadius: 20,
        paddingLeft: 15,
        top: 140,
        marginLeft: 20


    },
    button: {
        width: '90%',
        top: 160,
        borderWidth: 1,
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
        marginLeft: 20
    },

})
