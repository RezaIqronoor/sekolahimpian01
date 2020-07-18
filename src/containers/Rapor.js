import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet, FlatList, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native';
import { Button } from 'react-native-elements'
import firebase from '../db/FirebaseSetting';

export default class Rapor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        rapor: [],
    };

    AsyncStorage.getItem('@Student_NIS').then(value => {
        firebase.database().ref('Rapor').child(value).on('value', (childSnapshot) => {
            var rapor = []
            childSnapshot.forEach((doc) => {
                rapor.push({
                    key: doc.key,
                    raporSiswa: doc.val()
                })
                this.setState({rapor: rapor}, () => {
                    console.log(this.state.rapor)
                })
            })
        })
    })
  }

  render() {
    return (
        <View style={{flex: 1}}>
        <View style={{flex: 1, padding: 10}}>
            <FlatList
                data={this.state.rapor}
                contentContainerStyle={
                    styles.grid
                }
                renderItem={
                    ({ item }) => {
                        return (
                            <View style={styles.rowView}>
                                <Button
                                    large
                                    title = {item.key}
                                    buttonStyle = {{width: 340, marginBottom: 10, backgroundColor: '#476DC5'}}
                                    onPress={()=> {
                                        this.props.navigation.navigate('PDFViewer', {pdf: {uri: item.raporSiswa}, Key: item.key})
                                    }}
                                />
                            </View>
                            )
                        }
                    }
            />
            </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    rowView: {
        alignItems: 'center',
        flex: 1
    }
});
