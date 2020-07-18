import React, { Component } from 'react';
import { ActivityIndicator, BackHandler, StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, Image, AsyncStorage } from 'react-native';
import firebase from '../db/FirebaseSetting';
import { NavigationEvents } from 'react-navigation'

const FULL_WIDTH = Dimensions.get('screen').width

class ChooseChild extends Component {

    constructor(props) {
        super(props)
        this.state = {
            child: [],
            loading: true,
            currentUser: null,
            dialogShow: false,
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.props.navigation.isFocused()) {
                this.props.navigation.navigate('HomeScreen')
            } else {
                this.props.navigation.goBack()
            }

            return true
        });

        this.requestChildData()
    }

    requestChildData = async () => {
        const { currentUser } = await firebase.auth()
        await this.setState({ currentUser, loading: true })

        console.log(currentUser)

        var a = this.state.currentUser && this.state.currentUser.uid
        console.log(a)
        firebase.database().ref('/Student').orderByChild('Parent').equalTo(a).on('value', (childSnapshot) => {
            const child = [];
            childSnapshot.forEach((doc) => {
                child.push({
                    key: doc.key,
                    Name: doc.toJSON().Name,
                    Gender: doc.toJSON().Gender,
                    Photo: doc.toJSON().ImageUrl,
                    SC: doc.toJSON().SmartCard
                });
                this.setState({
                    child: child,
                    loading: false,
                });
            });
        });
    }

    cliked(nis, nasabah, name) {
        AsyncStorage.setItem('@Student_NIS', nis)
        AsyncStorage.setItem('@Student_NAME', name)

        this.props.navigation.navigate('MainMenu')
    }

    logout = () => {
        firebase.auth().signOut().then(function (res) {
            console.log("Logout Success")
        }).catch(function (error) {
            console.log(error)
        });

    }

    renderRow({ item }) {
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    paddingHorizontal: 12,
                    paddingVertical: 20,
                    alignItems: 'center',
                    borderRadius: 10,
                    backgroundColor: '#f2f4f7',
                    marginBottom: 16
                }}
                onPress={() => this.cliked(item.key, item.SC, item.Name)}>
                <Image
                    style={{
                        width: 60,
                        height: 60,
                        borderWidth: 1,
                        borderColor: '#EEEEEE',
                        borderRadius: 10
                    }}
                    source={{ uri: item.Photo }} />
                <View style={{ flex: 1, flexDirection: 'column', marginLeft: 25 }}>
                    <Text style={{ flexWrap: 'wrap', fontSize: 18, color: '#2f3e54', fontWeight: 'bold' }}>{item.Name}</Text>
                    <Text style={{ fontSize: 18, color: '#2f3e54', fontWeight: 'bold' }}>NIS: {item.key}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationEvents onDidFocus={async () => {
                    this.requestChildData()
                }} />
                <View style={{
                    paddingHorizontal: 16,
                    marginTop: 32,
                    width: '80%'
                }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>Pilih anak anda untuk melanjutkan</Text>
                </View>
                <FlatList
                    data={this.state.child}
                    keyExtractor={item => item.id}
                    renderItem={this.renderRow.bind(this)}
                    style={{
                    }}
                    contentContainerStyle={{
                        flex: 1,
                        alignItems: 'center',
                        paddingTop: 20,
                        paddingHorizontal: 16,
                    }} />
                <TouchableOpacity onPress={() => this.logout()} style={{
                    height: 50,
                    backgroundColor: '#DC3545',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: 16,
                    marginBottom: 16,
                    borderRadius: 10
                }}>
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold'
                    }}>Log Out</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default ChooseChild

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    activityIndicator: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 10
    }
})
