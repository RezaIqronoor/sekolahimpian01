import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, Alert, Linking, ToastAndroid, Image, TouchableOpacity } from 'react-native';
import firebase from '../db/FirebaseSetting';
import Modal from 'react-native-modal'

export default class ContactPerson extends Component {

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
            person: [],
            selectedPerson: {},
            noHp: '',
            loading: false,
            visibility: false
        };
    }

    contact = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                ToastAndroid.show('Whatsapp tidak terinstall di perangkat anda', ToastAndroid.SHORT);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => TToastAndroid.show('Whatsapp tidak terinstall di perangkat anda', ToastAndroid.SHORT));
    }

    componentWillMount() {
        firebase.database().ref('/ContactPerson').on('value', (childSnapshot) => {
            const person = [];
            childSnapshot.forEach((doc) => {
                person.push({
                    key: doc.key,
                    Nama: doc.toJSON().Nama,
                    NoHp: doc.toJSON().NoHp,
                    Posisi: doc.toJSON().Posisi,
                    ImageURL: doc.toJSON().ImageUrl
                });
                this.setState({
                    person: person,
                    loading: false,
                });
            });
        });
    }

    renderContacts = (item) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    this.setState({ visibility: true, selectedPerson: item })
                }}
                style={{
                    backgroundColor: 'white',
                    marginBottom: 16,
                    marginVertical: 3,
                    marginHorizontal: 16,
                    padding: 16,
                    borderRadius: 10,
                    flexDirection: 'row'
                }}>
                <Image
                    source={{ uri: item.ImageURL }}
                    style={{
                        height: 60,
                        width: 60,
                        borderRadius: 10
                    }} />
                <BrHorizontal width={16} />
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 16
                    }}>{item.Nama}</Text>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 14
                    }}>{item.Posisi}</Text>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        color: '#777777'
                    }}>{item.NoHp}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        // Add '62' to PhoneNumber
        let phoneNumber = this.state.noHp;
        while (phoneNumber.charAt(0) == '0') {
            phoneNumber = phoneNumber.substr(1);
            phoneNumber = '62' + phoneNumber
        }

        return (
            <View style={styles.cont}>
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            height: 100,
                            backgroundColor: 'white',
                            paddingHorizontal: 16
                        }}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 32
                        }}>Care Service</Text>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 16,
                            color: '#777777'
                        }}>Hubungilah kami jika butuh bantuan</Text>
                    </View>
                    <Br height={16} />
                    <FlatList
                        data={this.state.person}
                        renderItem={({ item }) => this.renderContacts(item)}
                    />
                </View>
                <Modal
                    isVisible={this.state.visibility}
                    onBackdropPress={() => {
                        this.setState({ visibility: false })
                    }}
                    onBackButtonPress={() => {
                        this.setState({ visibility: false })
                    }}>
                    <View style={{
                        backgroundColor: 'white',
                        height: '50%',
                        width: '100%',
                        borderRadius: 10,
                        padding: 32,
                        justifyContent: 'space-between'
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={{ uri: this.state.selectedPerson.ImageURL }}
                                style={{
                                    height: 60,
                                    width: 60,
                                    borderRadius: 10
                                }} />
                            <BrHorizontal width={16} />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 16
                                }}>{this.state.selectedPerson.Nama}</Text>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 14
                                }}>{this.state.selectedPerson.Posisi}</Text>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 14,
                                    color: '#777777'
                                }}>{this.state.selectedPerson.NoHp}</Text>
                            </View>
                        </View>
                        <View style={{
                            justifyContent: 'flex-end'
                        }}>
                            <ContactButton
                                backgroundColor={'#4a8af4'}
                                text="Telepon"
                                onPress={() => this.contact(`tel:${this.state.selectedPerson.NoHp}`)} />
                            <Br height={8} />
                            <ContactButton
                                backgroundColor={'#4a8af4'}
                                text="SMS"
                                onPress={() => this.contact(`sms:${this.state.selectedPerson.NoHp}`)} />
                            <Br height={8} />
                            <ContactButton
                                backgroundColor={'#4a8af4'}
                                text="Whatsapp"
                                onPress={() => this.contact(`whatsapp://send?text=Assalamu'alaikum &phone=${phoneNumber}`)} />
                        </View>
                    </View>
                </Modal>
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

class BrHorizontal extends React.Component {
    render() {
        return (
            <View style={{ width: this.props.width }} />
        )
    }
}

class ContactButton extends React.Component {

    render() {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={this.props.onPress}
                style={{
                    backgroundColor: this.props.backgroundColor,
                    padding: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                }}>
                <Text style={{
                    fontWeight: 'bold',
                    color: 'white'
                }}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    cont: {
        flex: 1,
        backgroundColor: '#f3f5fa'
    }
});