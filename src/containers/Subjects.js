import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Subjects extends React.Component {

    render() {
        return (
            <View style={s.container}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Tahfidzh')}
                        style={s.cardContainer}>
                        <Icon
                            name={'abjad-arabic'}
                            color={'#4f4f4f'}
                            size={36} />
                        <Text style={s.cardText}>Tahidzh</Text>
                    </TouchableOpacity>
                    <Br height={16} />
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('IT')}
                        style={s.cardContainer}>
                        <Icon
                            name={'laptop-mac'}
                            color={'#4f4f4f'}
                            size={36} />
                        <Text style={s.cardText}>Informasi Teknologi</Text>
                    </TouchableOpacity>
                </View>
                <BrHorizontal width={16} />
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('MPP')}
                        style={s.cardContainer}>
                        <Icon
                            name={'account-convert-outline'}
                            color={'#4f4f4f'}
                            size={36} />
                        <Text style={s.cardText}>MPP</Text>
                    </TouchableOpacity>
                    <Br height={16} />
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Bahasa')}
                        style={s.cardContainer}>
                        <Icon
                            name={'earth'}
                            color={'#4f4f4f'}
                            size={36} />
                        <Text style={s.cardText}>Bahasa</Text>
                    </TouchableOpacity>
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

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 32,
        flexDirection: 'row'
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