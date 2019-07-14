import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    TouchableOpacity, 
    StatusBar,
    Alert,
} from 'react-native';
import {Styles, Colors} from './lib/styles';
import Env from './lib/env';


export default class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'Unknown',
            email: '',
            photo: null,
        };
    }

    componentDidMount() {
        const userInfo = Env.readStorage(Env.key.USER_INFO);
        this.setState({
            name: userInfo.user.name,
            email: userInfo.user.email,
            photo: userInfo.user.photo
        });
    }

    renderHeader(){
        return(
            <View>
                <StatusBar backgroundColor={Colors.primary} barStyle="dark-content" />
                <View style={Styles.accountHeaderBox}>
                    <View style={[Styles.actionbarBox, {elevation: 0}]}>
                        <TouchableOpacity style={Styles.backButton} 
                            onPress={() => { this.props.navigation.goBack(); }}>
                            <Image style={Styles.icon18} source={require('./asset/icon-back.png')}/>
                        </TouchableOpacity>
                        <Text style={Styles.actionbarTitle}>Account</Text>
                    </View>
                
                    <View style={Styles.accountPhotoBox}>
                        <Image style={Styles.accountPhoto} source={{uri: this.state.photo}}/>
                    </View>

                    <View style={Styles.accountNameBox}>
                        <Text style={Styles.accountName}>{this.state.name}</Text>
                        <Text style={Styles.accountEmail}>{this.state.email}</Text>
                    </View>
                    
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={Styles.sceneBox}>
                {this.renderHeader()}

                <View style={Styles.accountMenuBox}>
                    <TouchableOpacity>
                        <Text>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
