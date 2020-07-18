import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { WebView } from 'react-native-webview'

export default class GuestWebView extends React.Component {
    render() {
        return (
            <WebView source={{ uri: 'https://sekolahimpian.com/Home/index.html' }} />
        )
    }
}