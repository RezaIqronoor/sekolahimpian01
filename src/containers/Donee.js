import React from 'react'
import { View, Text, FlatList } from 'react-native'
import firebase from '../db/FirebaseSetting'
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

export default class Donee extends React.Component {

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
            balance: 0,
            income: 0,
            outcome: 0,
            donee: []
        }
    }

    componentWillMount = () => {
        firebase.database().ref('/Donation').on('value', (childSnapshot) => {
            console.log(childSnapshot)
            this.setState({ balance: childSnapshot.val().balance, income: childSnapshot.val().income, outcome: childSnapshot.val().outcome })
        });

        firebase.database().ref("/Donation/donee").on('value', (childSnapshot) => {
            const donee = [];
            childSnapshot.forEach((doc) => {
                donee.push({
                    date: doc.key,
                    name: doc.toJSON().name,
                    value: doc.toJSON().value,
                });
                this.setState({
                    donee: donee,
                });
            });
        });
    }

    renderDonee = (item) => {
        return (
            <View
                style={{
                    backgroundColor: '#2488D8',
                    padding: 12,
                    marginHorizontal: 16,
                    marginBottom: 10,
                    borderRadius: 10
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>{item.date}</Text>
                <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>{item.name}</Text>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Telah berdonasi sebanyak Rp.{(Number(item.value)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f3f5fa' }}>
                <View
                    style={{
                        height: 170,
                        backgroundColor: 'white',
                        paddingHorizontal: 16
                    }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 32
                    }}>QBS Project</Text>
                    <Br height={8} />
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: '#000000'
                    }}>Aktivitas donasi Quadrant Boarding School</Text>
                    <Br height={8} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Badge status="primary" />
                            <Text style={{ fontWeight: 'bold' }}>    Saldo</Text>
                        </View>
                        <Text style={{ fontWeight: 'bold' }}>Rp. {(Number(this.state.balance)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Badge status="success" />
                            <Text style={{ fontWeight: 'bold' }}>    Pemasukan</Text>
                        </View>
                        <Text style={{ fontWeight: 'bold' }}>Rp. {(Number(this.state.income)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Badge status="error" />
                            <Text style={{ fontWeight: 'bold' }}>    Pengeluaran</Text>
                        </View>
                        <Text style={{ fontWeight: 'bold' }}>Rp. {(Number(this.state.outcome)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                    </View>

                </View>
                <Br height={8} />
                <FlatList
                    data={this.state.donee}
                    renderItem={({ item }) => this.renderDonee(item)}
                />
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