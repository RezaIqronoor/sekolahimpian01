import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class CareService extends React.Component {

    render() {
        return (
            <View style={s.container}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('ContactPerson')}
                    style={s.cardContainer}>
                    <Icon
                        name={'card-account-phone-outline'}
                        color={'#4f4f4f'}
                        size={36} />
                    <Text style={s.cardText}>Contacts</Text>
                </TouchableOpacity>
                <Br height={16} />
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Pengaduan')}
                    style={s.cardContainer}>
                    <Icon
                        name={'alert-octagon'}
                        color={'#4f4f4f'}
                        size={36} />
                    <Text style={s.cardText}>Complaint</Text>
                </TouchableOpacity>
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

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 32,
        paddingVertical: 92
    },
    cardContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#4f4f4f'
    }
})