import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    ToastAndroid,
    TouchableOpacity, 
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Styles } from './lib/styles';
import GoogleService from './lib/google-service';


export default class Signin extends Component {


    componentDidMount() {
        this.googleService = new GoogleService();
    }

    signIn = () => {
        this.googleService.signIn((userInfo) => {

            ToastAndroid.show(`Welcome, ${userInfo.user.name}`, ToastAndroid.SHORT);

            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({
                    routeName: 'home'
                })],
            });
            this.props.navigation.dispatch(resetAction);

        });
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
