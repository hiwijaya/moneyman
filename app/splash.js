import React, { Component } from 'react';
import { View, Image, Alert } from 'react-native';
import {
    GoogleSignin,
    statusCodes,
} from 'react-native-google-signin';
import { Styles, Colors } from './lib/styles';
import config from '../config';


export default class Splash extends Component {

    async componentDidMount() {
        await GoogleSignin.configure({
            webClientId: config.webClientId,
            offlineAccess: true,
        });

        const isSignedIn = await GoogleSignin.isSignedIn();
        const currentUser = await GoogleSignin.getCurrentUser();
        Alert.alert(currentUser.user.email);

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