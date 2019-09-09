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
import Gdrive from './lib/gdrive';


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
            scopes: config.scopes,
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

    testDrive(){
        console.log('RUN TESTDRIVE');
        const token = Env.readStorage(Env.key.ACCESS_TOKEN);

        console.log(token);

        const data = {
            'data_penting': 'INI ADALAH DATA PENTING.'
        }

        let drive = new Gdrive();

        drive.setToken(token);
        // drive.upload(data, null);
        drive.download('1LbTjUWqYLiE9xum-Ex9iNcH0I9QuNzx9ypSXZxbU60z94ApEtQ');


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
                            () => {
                                // this.props.navigation.push('account');
                                // Alert.alert(this.props.navigation.getParam('item'));
                                this.props.navigation.navigate('categories');
                            })
                    }
                    {
                        this.renderMenuItem(
                            require('./asset/icon-export.png'),
                            'Export',
                            false,
                            () => {
                                this.props.navigation.popToTop();
                            })
                    }
                </View>

                <View style={Styles.accountMenuBox}>
                    {
                        this.renderMenuItem(
                            require('./asset/icon-licenses.png'), 
                            'Licenses', 
                            true, 
                            () => {this.testDrive()})
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
