import React, { Component } from 'react';
import { View, Image, Alert } from 'react-native';
import {
    GoogleSignin,
    statusCodes,
} from 'react-native-google-signin';
import { Styles } from './lib/styles';
import config from '../config';


export default class Splash extends Component {

    async componentDidMount() {
        
        await GoogleSignin.configure({
            webClientId: config.webClientId,
            offlineAccess: true,
        });

        // TODO: Refactor again. Consider to user signInSilently()
        const isSignedIn = await GoogleSignin.isSignedIn();

        setTimeout(() => {

            //TODO: Put any logic here

            if(isSignedIn){
                this.props.navigation.navigate('home');
            }
            else {
                this.props.navigation.navigate('signin');
            }
        }, 1000);
    }

    render() {
        return(
            <View style={[Styles.sceneBox, Styles.center]}>
                <Image style={Styles.icon84} source={require('./asset/wallet.png')}/>
            </View>
        );
    }

}