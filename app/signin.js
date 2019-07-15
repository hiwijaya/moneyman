import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    TouchableOpacity, 
    Alert,
} from 'react-native';
import {
    GoogleSignin,
    statusCodes,
} from 'react-native-google-signin';
import { Styles } from './lib/styles'
import Env from './lib/env';
import config from '../config';


export default class Signin extends Component {


    async componentDidMount() {
        GoogleSignin.configure({
            webClientId: config.webClientId,
            offlineAccess: true,
        });
    }

    signIn = async () => {
        try{
            // Check if device has Google Play Services installed
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const userInfo = await GoogleSignin.signIn();

            Env.writeStorage(Env.key.USER_INFO, userInfo);
            this.props.navigation.navigate('home');

        }
        catch(error){
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // sign in was cancelled
                Alert.alert('cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation in progress already
                Alert.alert('in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('play services not available or outdated');
            } else {
                Alert.alert('Something went wrong', error.toString());
            }
        }
    }


    render() {
        return (
            <View style={[Styles.sceneBox, Styles.center]}>
                <Image style={{width: 256, height: 210, marginBottom: 30}} 
                    source={require('./asset/worthy.png')}/>

                <TouchableOpacity style={Styles.googleButton} onPress={this.signIn}>
                    <Image style={Styles.icon24} source={require('./asset/google.png')}/>
                    <Text style={Styles.googleButtonText}>Sign in with Google</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
