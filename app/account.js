import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    TouchableOpacity, 
    StatusBar
} from 'react-native';
import {Styles, Colors} from './lib/styles';


export default class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderHeader(){
        return(
            <View>
                <StatusBar backgroundColor={Colors.primary} barStyle="dark-content" />
                <View style={Styles.accountHeaderBox}>
                    <View style={Styles.actionbarBox}>
                        <TouchableOpacity style={Styles.backButton} 
                            onPress={() => { this.props.navigation.goBack(); }}>
                            <Image style={Styles.icon18} source={require('./asset/icon-back.png')}/>
                        </TouchableOpacity>
                        <Text style={Styles.actionbarTitle}>Account</Text>
                    </View>
                    <Text>Happy Indra Wijaya</Text>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={Styles.sceneBox}>
                {this.renderHeader()}
            </View>
        );
    }
}
