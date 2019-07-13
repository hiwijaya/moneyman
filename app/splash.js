import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Styles, Colors } from './lib/styles';


export default class Splash extends Component {

    componentDidMount() {
        setTimeout(() => {

            //TODO: Put any logic here

            this.props.navigation.navigate('signin');
        }, 1000);
    }

    render() {
        return(
            <View style={[Styles.sceneBox, Styles.center]}>
                <Image style={Styles.icon128} source={require('./asset/wallet.png')}/>
            </View>
        );
    }

}