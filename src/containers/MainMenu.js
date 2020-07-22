import React, { Component } from 'react';
import { Linking, Dimensions, Animated, TouchableOpacity, StyleSheet, Text, View, ScrollView, Image, AsyncStorage, Platform } from 'react-native';
import { Icon } from 'react-native-elements'
import firebase from 'firebase'

const { width } = Dimensions.get('window');

export default class MainMenu extends Component {

    scrollX = new Animated.Value(0) // this will be the scroll location of our ScrollView

    constructor(props) {
        super(props)
        this.state = {
            dialogShow: false,
            images: [
                {
                    src: require('../images/profile.png'),
                    redirectTo: 'youtube',
                    link: 'https://www.youtube.com/channel/UCGaPL10pZk09k_anyhRf5qw',
                    pageName: '',
                    pdf: '',
                },
                {
                    src: require('../images/donate.png'),
                    redirectTo: 'pdf',
                    link: 'https://firebasestorage.googleapis.com/v0/b/sekolahimpian-d609f.appspot.com/o/ResourcePDF%2FQBSProgress.pdf?alt=media&token=9a8759c9-8c9b-47d5-96ba-ae7ea4ae2854',
                    pageName: '',
                    pdf: '',
                },
            ]
        };

        AsyncStorage.getItem('@Student_NIS').then(async (value) => {
            const nis = value

            var PushNotification = require("react-native-push-notification");

            PushNotification.configure({
                // (optional) Called when Token is generated (iOS and Android)
                onRegister: async function (token) {
                    console.log("TOKEN:", token);

                    fetch('http://controlpanel.sekolahimpian.com/subscribeFCM', {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            registrationToken: token.token,
                            topic: nis,
                        }),
                    }
                    )
                        .then((response) => response.json())
                        .then((responseJson) => {
                            console.log(responseJson)
                            if (responseJson.successCount == 1) {
                                console.log("subscribed")
                                PushNotification.subscribeToTopic("SEKOLAHIMPIAN")
                                PushNotification.subscribeToTopic(value)
                            }
                        })
                },

                // (required) Called when a remote or local notification is opened or received
                onNotification: function (notification) {
                    console.log("NOTIFICATION:", notification);

                    // process the notification
                },

                // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
                senderID: "426957218586",

                // Should the initial notification be popped automatically
                // default: true
                popInitialNotification: true,

                /**
                 * (optional) default: true
                 * - Specified if permissions (ios) and token (android and ios) will requested or not,
                 * - if not, you must call PushNotificationsHandler.requestPermissions() later
                 */
                requestPermissions: Platform.OS === 'ios'
            });

        });
    }

    goBack = () => {
        this.props.navigation.navigate('ChooseChild')
    }

    render() {

        let position = Animated.divide(this.scrollX, width);

        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <ScrollView
                        nestedScrollEnabled={true}
                        contentContainerStyle={{
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            paddingTop: 20,
                            paddingBottom: 20,
                            paddingHorizontal: 48
                        }}>
                        <ScrollView
                            horizontal
                            decelerationRate={1}
                            snapToInterval={340} //your element width
                            snapToAlignment={"start"}
                            pagingEnabled={true}
                            onScroll={Animated.event( // Animated.event returns a function that takes an array where the first element...
                                [{ nativeEvent: { contentOffset: { x: this.scrollX } } }] // ... is an object that maps any nativeEvent prop to a variable
                            )}
                            scrollEventThrottle={16}
                            contentContainerStyle={{
                                height: 150,
                                borderRadius: 10
                            }}>
                            {this.state.images.map((payload, i) => { // for every object in the photos array...
                                return ( // ... we will return a square Image with the corresponding object as the source
                                    <TouchableOpacity onPress={() => {
                                        switch (payload.redirectTo) {
                                            case 'screen': {
                                                this.props.navigation.navigate(payload.pageName)

                                                break
                                            }
                                            case 'pdf': {
                                                this.props.navigation.navigate('PDFViewer', {pdf: {uri: payload.link}, type: 'uri'})

                                                break
                                            }
                                            case 'youtube': {
                                                Linking
                                                    .openURL(payload.link)
                                                break
                                            }
                                            default: {

                                            }
                                        }
                                    }}>
                                        <Image
                                            key={i} // we will use i for the key because no two (or more) elements in an array will have the same index
                                            style={{ width: 340, height: 150 }}
                                            source={payload.src}
                                            resizeMode='cover'
                                        />
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                        <View
                            style={{ flexDirection: 'row' }} // this will layout our dots horizontally (row) instead of vertically (column)
                        >
                            {this.state.images.map((_, i) => { // the _ just means we won't use that parameter
                                let opacity = position.interpolate({
                                    inputRange: [i - 1, i, i + 1], // each dot will need to have an opacity of 1 when position is equal to their index (i)
                                    outputRange: [0.3, 1, 0.3], // when position is not i, the opacity of the dot will animate to 0.3
                                    // inputRange: [i - 0.50000000001, i - 0.5, i, i + 0.5, i + 0.50000000001], // only when position is ever so slightly more than +/- 0.5 of a dot's index
                                    // outputRange: [0.3, 1, 1, 1, 0.3], // is when the opacity changes from 1 to 0.3
                                    extrapolate: 'clamp' // this will prevent the opacity of the dots from going outside of the outputRange (i.e. opacity will not be less than 0.3)
                                });
                                return (
                                    <Animated.View // we will animate the opacity of the dots so use Animated.View instead of View here
                                        key={i} // we will use i for the key because no two (or more) elements in an array will have the same index
                                        style={{ opacity, height: 10, width: 10, backgroundColor: '#595959', margin: 8, borderRadius: 5 }}
                                    />
                                );
                            })}
                        </View>
                        <Br height={20} />
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <MenuCard
                                text='CCTV'
                                iconName='live-tv'
                                onPress={() => this.props.navigation.navigate('CCTVOption')} />
                            <MenuCard
                                text='Parent Book'
                                iconName='person-outline'
                                onPress={() => this.props.navigation.navigate('PDFViewer', {pdf: {uri:'bundle-assets://pdf/ParentBook.pdf', cache: true}})} />
                        </View>
                        <Br height={20} />
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <MenuCard
                                text='Album'
                                iconName='collections'
                                onPress={() => this.props.navigation.navigate('Album')} />
                            <MenuCard
                                text='Tahfidz'
                                iconName='chrome-reader-mode'
                                onPress={() => this.props.navigation.navigate('Tahfizh')} />
                        </View>
                        <Br height={20} />
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <MenuCard
                                text='Attendance'
                                iconName='create'
                                onPress={() => this.props.navigation.navigate('Absen')} />
                            <MenuCard
                                text='Illness'
                                iconName='local-hospital'
                                onPress={() => this.props.navigation.navigate('Disease')} />
                        </View>
                        <Br height={20} />
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <MenuCard
                                text='Violation'
                                iconName='block'
                                onPress={() => this.props.navigation.navigate('ViolationRecord')} />
                            <MenuCard
                                text='Complaint'
                                iconName='report'
                                onPress={() => this.props.navigation.navigate('Pengaduan')} />
                        </View>
                        <Br height={20} />
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <MenuCard
                                text='Care Service'
                                iconName='person-outline'
                                onPress={() => this.props.navigation.navigate('ContactPerson')} />
                            <MenuCard
                                text='Report'
                                iconName='book'
                                onPress={() => this.props.navigation.navigate('Rapor')} />
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

class MenuCard extends React.Component {

    render() {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={this.props.onPress}
                style={{
                    height: 150,
                    width: this.props.width ? this.props.width : 150,
                    borderRadius: 20,
                    elevation: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white'
                }}>
                <Icon
                    type="material"
                    name={this.props.iconName}
                    color={'#282c34'}
                    size={36} />
                <Br height={16} />
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#282c34',
                    flexWrap: 'wrap'
                }}>{this.props.text}</Text>
            </TouchableOpacity>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f5fa'
    },
});
