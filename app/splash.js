import React, { Component } from 'react';
import { View, Image, Alert } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import GoogleService from './lib/google-service';
import { Styles } from './lib/styles';


export default class Splash extends Component {

    async componentDidMount() {

        this.googleService = new GoogleService();
        const isSignedIn = await this.googleService.obj().isSignedIn();

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