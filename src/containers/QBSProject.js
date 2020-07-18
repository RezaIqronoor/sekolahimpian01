import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import firebase from '../db/FirebaseSetting';

export default class QBSProject extends React.Component {

    static navigationOptions = {
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        headerStyle: {
            elevation: 0,
            backgroundColor: '#eb9e3e'
        },
        headerTintColor: 'white'
    }

    constructor(props) {
        super(props)
        this.state = {
            donationActivity: [],
            donationBalance: 0
        }
    }

    componentWillMount() {
        firebase.database().ref('/Donation').on('value', (childSnapshot) => {
            console.log(childSnapshot)
            this.setState({ donationBalance: childSnapshot.val().balance })
        });

        firebase.database().ref('/DonationActivity').on('value', (childSnapshot) => {
            const donationActivity = [];
            childSnapshot.forEach((doc) => {
                donationActivity.push({
                    key: doc.key,
                    image: doc.toJSON().image,
                    desc: doc.toJSON().desc,
                    title: doc.toJSON().title
                });
                this.setState({
                    donationActivity: donationActivity,
                    loading: false,
                });
            });
        });
    }

    renderDonationRecords = (item) => {
        console.log(item)
        return (
            <View style={{
                backgroundColor: 'white',
                marginBottom: 8,
                marginHorizontal: 16,
                borderRadius: 5
            }}>
                <Image
                    style={{ width: '100%', height: 150, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                    source={{ uri: item.image }}
                />
                <View style={{ padding: 12 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.title}</Text>
                    <Br height={8} />
                    <Text>{item.desc}</Text>
                    <Br height={8} />
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f3f5fa' }}>
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            height: 220,
                            backgroundColor: '#eb9e3e',
                            paddingHorizontal: 16
                        }}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 32,
                            color: 'white'
                        }}>QBS Project</Text>
                        <Br height={8} />
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 16,
                            color: 'white'
                        }}>
                            Bismillah. yuk barengan, kita bangun istana kita disurga dengan cara membangun asrama dan kelas QBS !
                            QBS menggelar kurikulum special yang melahirkan para penghafal Al-Quran yg berkualitas.
                            yakni generasi yg ingin mulia diakhirat dgn menghafal Quran dan mulia di dunia dgn bisnis dan dakwah dengan skill IT.
                            </Text>
                    </View>
                    <Br height={8} />
                    <TouchableOpacity 
                    activeOpacity={1}
                    style={{
                        backgroundColor: '#4dad4a',
                        marginBottom: 8,
                        marginHorizontal: 16,
                        borderRadius: 5,
                        padding: 8,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => this.props.navigation.navigate('Donee')}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>Donatur</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>Total Donasi Rp. {(Number(this.state.donationBalance)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={this.state.donationActivity}
                        renderItem={({ item }) => this.renderDonationRecords(item)}
                    />
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

class BrHorizontal extends React.Component {
    render() {
        return (
            <View style={{ width: this.props.width }} />
        )
    }
}