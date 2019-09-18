import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    TouchableOpacity, 
    StatusBar,
    ScrollView,
    Alert,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import {Styles, Colors, Fonts} from './lib/styles';
import Env from './lib/env';
import GoogleService from './lib/google-service';


export default class Account extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: 'Unknown',
            email: '',
            photo: null,
            sync: false
        };
    }

    componentDidMount() {
        const userInfo = Env.readStorage(Env.key.USER_INFO);
        const sync = !!Env.readStorage(Env.key.SYNCED);
        this.setState({
            name: userInfo.user.name,
            email: userInfo.user.email,
            photo: userInfo.user.photo
        });

        this.googleService = new GoogleService();
    }

    backup(){
        const database = Env.getDatabase();

        this.googleService.upload(database, 
            () => {
                Alert.alert('Backup Completed', `Last backup: ${database.last_updated}`);
            });
    }

    exportCSV(){
        // const fileId = Env.readStorage(Env.key.BACKUP_FILE_ID);
        // this.googleService.download(fileId);

        this.googleService.restoreBackup(() =>{
            console.log('success');
        });
    }

















    signOut = () => {

        // TODO: implement double click to prevent unwanted signout

        this.googleService.signOut(() => {
            
            // remove local storage
            Env.writeStorage(Env.key.ACCESS_TOKEN, null);
            Env.writeStorage(Env.key.USER_INFO, null);

            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({
                    routeName: 'signin'
                })],
            });
            this.props.navigation.dispatch(resetAction);
        });
        
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

    renderSyncIcon(){
        if(this.state.sync){
            return(
                <Image style={Styles.icon18} source={require('./asset/icon-checked-primary.png')}/>
            );
        }
        return(
            <Image style={Styles.icon18} source={require('./asset/icon-unsync.png')}/>
        );
    }

    render() {
        return (
            <View style={Styles.sceneBox}>
                {this.renderHeader()}

                <View style={[Styles.accountMenuBox, {marginTop: 40}]}>
                    <TouchableOpacity onPress={() => {this.backup()}}>
                        <View style={Styles.accountMenuItem}>
                            <Image style={Styles.accountMenuIcon} 
                                source={require('./asset/google-drive.png')}/>
                            <View style={Styles.accountMenuTextBox}>
                                <Text style={Styles.accountMenuText}>{ 'Backup to Drive' }</Text>
                            </View>
                            <View style={Styles.versionTextBox}>
                                {this.renderSyncIcon()}
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={Styles.accountMenuBox}>
                     {
                        this.renderMenuItem(
                            require('./asset/icon-categories.png'), 
                            'Categories', 
                            true, 
                            () => { this.props.navigation.navigate('categories') })
                    }
                    {
                        this.renderMenuItem(
                            require('./asset/icon-export.png'),
                            'Export',
                            false,
                            () => { this.exportCSV() })
                    }
                </View>

                <View style={Styles.accountMenuBox}>
                    {
                        this.renderMenuItem(
                            require('./asset/icon-reset.png'),
                            'Reset',
                            true,
                            () => { this.exportCSV() })
                    }
                    {
                        this.renderMenuItem(
                            require('./asset/icon-licenses.png'), 
                            'Licenses', 
                            true, 
                            () => {})
                    }
                    {
                        this.renderMenuItem(
                            require('./asset/icon-rate.png'),
                            'Rate Us',
                            true,
                            () => { this.props.navigation.popToTop() })
                    }
                    <TouchableOpacity onPress={() => {Alert.alert('Moneyman')}}>
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
