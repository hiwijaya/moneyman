import React, { Component } from 'react';
import { View, Image, Alert } from 'react-native';
import {
    GoogleSignin,
    statusCodes,
} from 'react-native-google-signin';
import { StackActions, NavigationActions } from 'react-navigation';
import { Styles } from './lib/styles';
import config from '../config';
import Env from './lib/env';


export default class Splash extends Component {

    async componentDidMount() {
        
        await GoogleSignin.configure({
            webClientId: config.webClientId,
            offlineAccess: true,
        });

        const isSignedIn = await GoogleSignin.isSignedIn();

        setTimeout(() => {

            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({
                    routeName: (isSignedIn) ? 'home' : 'signin'
                })],
            });
            this.props.navigation.dispatch(resetAction);

            
        }, 500);
    }

    render() {
        return(
            <View style={[Styles.sceneBox, Styles.center]}>
                <Image style={Styles.icon84} source={require('./asset/wallet.png')}/>
            </View>
        );
    }

}