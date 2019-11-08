import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    StatusBar,
    TouchableOpacity, 
} from 'react-native';
import {Styles, Colors} from './lib/styles';


export default class Policy extends Component {

    render() {
        return(
            <View>
                <StatusBar backgroundColor={Colors.primary} barStyle="dark-content" />
                <View style={[Styles.actionbarBox, {elevation: 0}]}>
                    <TouchableOpacity style={Styles.backButton} 
                        onPress={() => { this.props.navigation.goBack(); }}>
                        <Image style={Styles.icon18} source={require('./asset/back.png')}/>
                    </TouchableOpacity>
                    <Text style={Styles.actionbarTitle}>Privacy Policy</Text>
                </View>

                <WebView style={{margin: 15}}
                    source={{uri: 'https://hiwijaya.com/app/moneyman/policy.html'}} />

            </View>
        );
    }
}