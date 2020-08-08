import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Kesantrian extends React.Component {

    render() {
        return (
            <View style={s.container}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Absen')}
                    style={s.cardContainer}>
                    <Icon
                        name={'account-check-outline'}
                        color={'#4f4f4f'}
                        size={36} />
                    <Text style={s.cardText}>Attendace</Text>
                </TouchableOpacity>
                <Br height={16} />
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Disease')}
                    style={s.cardContainer}>
                    <Icon
                        name={'hospital-box-outline'}
                        color={'#4f4f4f'}
                        size={36} />
                    <Text style={s.cardText}>Illness</Text>
                </TouchableOpacity>
                <Br height={16} />
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('ViolationRecord')}
                    style={s.cardContainer}>
                    <Icon
                        name={'badge-account-alert-outline'}
                        color={'#4f4f4f'}
                        size={36} />
                    <Text style={s.cardText}>Violation</Text>
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
        padding: 32
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