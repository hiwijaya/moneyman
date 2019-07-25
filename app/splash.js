import React, { Component } from 'react';
import { View, Image, Alert } from 'react-native';
import {
    GoogleSignin,
    statusCodes,
} from 'react-native-google-signin';
import { StackActions, NavigationActions } from 'react-navigation'
import { Styles } from './lib/styles';
import config from '../config';
import Env from './lib/env';


export default class Splash extends Component {

    async componentDidMount() {
        
        await GoogleSignin.configure({
            webClientId: config.webClientId,
            offlineAccess: true,
        });

        // TODO: Refactor again. Consider to user signInSilently()
        const isSignedIn = await GoogleSignin.isSignedIn();

        setTimeout(() => {

            // TODO: testing. Next, put it on signin process.
            Env.initDefaultCategories();

            if(isSignedIn){
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({
                        routeName: 'home'
                    })],
                });
                this.props.navigation.dispatch(resetAction);
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