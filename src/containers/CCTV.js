import React from 'react'
import { View, Dimensions } from 'react-native'
import VlcPlayer from 'react-native-vlc-player';

const FULL_HEIGHT = Dimensions.get('screen').height
const FULL_WIDTH = Dimensions.get('screen').width

export default class CCTV extends React.Component {

    static navigationOptions = {
        headerTitleStyle: {
            fontWeight: 'bold'
        },
        headerStyle: {
            elevation: 0,
        },
    }

    render() {

        const { ip } = this.props.navigation.state.params

        return (
            <View style={{
                flex: 1
            }}>
                <VlcPlayer
                    ref={this.vlcplayer}
                    style={{
                        height: FULL_HEIGHT,
                        width: FULL_WIDTH
                    }}
                    paused={false}
                    autoplay={true}
                    source={{
                        uri: ip,
                        autoplay: true,
                        initOptions: ['--codec=avcodec'],
                    }} 
                    onerror={(error) => {
                        console.log(error)
                    }}/>
            </View>
        )
    }
}