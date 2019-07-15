import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    TouchableOpacity, 
    StatusBar,
    Alert,
} from 'react-native';
import {GoogleSignin} from 'react-native-google-signin';
import {Styles, Colors, Fonts} from './lib/styles';
import Env from './lib/env';
import config from '../config';


export default class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'Unknown',
            email: '',
            photo: null,
        };
    }

    async componentDidMount() {
        GoogleSignin.configure({
            webClientId: config.webClientId,
            offlineAccess: true,
        });

        const userInfo = Env.readStorage(Env.key.USER_INFO);
        this.setState({
            name: userInfo.user.name,
            email: userInfo.user.email,
            photo: userInfo.user.photo
        });
    }

    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            
            // remove local storage
            Env.writeStorage(Env.USER_INFO, null);

            this.props.navigation.navigate('signin');
        } 
        catch (error) {
            console.error(error);
        }
    }

    renderHeader() {
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

                    <View style={Styles.accountNameBox}>
                        <Text style={Styles.accountName}>{this.state.name}</Text>
                        <Text style={Styles.accountEmail}>{this.state.email}</Text>
                    </View> 
                </View>
                <View style={Styles.accountPhotoBox}>
                    <Image style={Styles.accountPhoto} source={{uri: this.state.photo}}/>
                </View>
            </View>
        );
    }

    renderMenuItem(imageSource, title, showBorder, doEvent){
        return(
            <TouchableOpacity onPress={doEvent}>
                <View style={Styles.accountMenuItem}>
                    <Image style={Styles.accountMenuIcon} source={imageSource}/>
                    <View style={[Styles.accountMenuTextBox, 
                        { borderBottomWidth: (showBorder) ? 1 : 0 }]}>
                        <Text style={Styles.accountMenuText}>{ title }</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={Styles.sceneBox}>
                {this.renderHeader()}

                <View style={[Styles.accountMenuBox, {marginTop: 40}]}>
                    {
                        this.renderMenuItem(
                            require('./asset/icon-categories.png'), 
                            'Categories', 
                            true, 
                            () => {Alert.alert('Categories')})
                    }
                    {
                        this.renderMenuItem(
                            require('./asset/icon-export.png'),
                            'Export',
                            false,
                            () => {
                                Alert.alert('Export')
                            })
                    }
                </View>

                <View style={Styles.accountMenuBox}>
                    {
                        this.renderMenuItem(
                            require('./asset/icon-licenses.png'), 
                            'Licenses', 
                            true, 
                            () => {Alert.alert('Licenses')})
                    }
                    {
                        this.renderMenuItem(
                            require('./asset/icon-rate.png'),
                            'Rate Us',
                            true,
                            () => {
                                Alert.alert('Rate Us')
                            })
                    }
                    <TouchableOpacity onPress={() => {Alert.alert('About')}}>
                        <View style={Styles.accountMenuItem}>
                            <Image style={Styles.accountMenuIcon} 
                                source={require('./asset/icon-about.png')}/>
                            <View style={Styles.accountMenuTextBox}>
                                <Text style={Styles.accountMenuText}>{ 'About' }</Text>
                            </View>
                            <View style={Styles.versionTextBox}>
                                <Text style={Styles.versionText}>{ 'v1.0(dev)' }</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={Styles.accountMenuBox}>
                    <TouchableOpacity onPress={this.signOut}>
                        <View style={Styles.signoutButton}>
                            <Text style={Styles.signoutText}>Sign Out</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
