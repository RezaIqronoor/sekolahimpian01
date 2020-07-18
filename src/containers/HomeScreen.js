import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from '../db/FirebaseSetting'
import ImageSlider from 'react-native-image-slider'

const HomeScreen = props => {

    const [sliderImages, set_sliderImages] = useState([])

    /**
     * Request iamges for slider from database
     */
    useEffect(() => {
        firebase.database().ref(`/Guest/ImageSlider`).once('value', (childSnapshot) => {
            let payload = [];

            childSnapshot.forEach((doc) => {
                payload.push(doc.val());
                set_sliderImages(payload)
            });
        });
    }, [])

    /**
     * Attemp to Login
     * If user has logged, then go to ChooseChild else Login
     */
    loginAttemp = () => {
        firebase.auth().onAuthStateChanged(user => {
            user ? props.navigation.navigate('ChooseChild') : props.navigation.navigate('Login')
        })
    }

    return (
        <View style={s.container}>
            <View style={{ flex: 1 }}>
                    <ImageSlider
                        autoPlayWithInterval={3000}
                        images={sliderImages} />
                </View>
            <View style={s.contentContainer}>
                <TouchableOpacity style={s.loginBtn} onPress={() => loginAttemp()}>
                    <Text style={s.loginBtnText}>Masuk</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.guestBtn} onPress={() => props.navigation.navigate('GuestWebview')}>
                    <Text style={s.guestBtnText}>Tamu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    container: { flex: 1 },
    imageSliderContainer: { flex: 1 },
    contentContainer: {
        flex: 1,
        position: 'absolute',
        height: 120,
        width: '100%',
        top: '78%',
        paddingHorizontal: 32,
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 20
    },
    loginBtn: {
        backgroundColor: 'white',
        height: 40,
        width: '100%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20
    },
    loginBtnText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#4a8af4'
    },
    guestBtn: {
        backgroundColor: 'white',

        height: 40,
        width: '100%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20
    },
    guestBtnText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#eb9e3e'
    },
})

export default HomeScreen

