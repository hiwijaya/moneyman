import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Styles, Colors } from './lib/styles';


export default class Splash extends Component {

    componentDidMount() {
        
    }

    render() {
        return(
            <View style={[Styles.center, {backgroundColor: Colors.whiteGreen}]}>
                <Image style={Styles.icon128} source={require('./asset/logo.png')}/>
            </View>
        );
    }

}