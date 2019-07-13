import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image 
} from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton
} from 'react-native-google-signin';
import { Styles } from './lib/styles'


export default class Signin extends Component {
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={[Styles.sceneBox, Styles.center]}>
                <Image style={{width: 256, height: 210, marginBottom: 30}} 
                    source={require('./asset/worthy.png')}/>
                <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={() => {}} />
            </View>
        );
    }
}
