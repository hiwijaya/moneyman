import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    ToastAndroid,
    ActivityIndicator,
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
            name: 'User',
            email: '',
            photo: null,
            backupStatus: 'N', // N/S/U + P (Processing)
            backupTime: ''
        };
    }

    componentDidMount() {
        
        const userInfo = Env.readStorage(Env.key.USER_INFO);
        const backupStatus = Env.readStorage(Env.key.BACKUP_STATUS);
        const backupTime = Env.readStorage(Env.key.BACKUP_TIME);
        this.setState({
            name: userInfo.user.name,
            email: userInfo.user.email,
            photo: userInfo.user.photo,
            backupStatus: (backupStatus === null) ? 'N' : backupStatus,
            backupTime: `last sync: ${backupTime}`
        });

        this.googleService = new GoogleService();
    }

    backup(){
        if (this.state.backupStatus === 'S') {
            ToastAndroid.show('Already backup', ToastAndroid.SHORT);
            return;
        }
        ToastAndroid.show('Backing up..', ToastAndroid.LONG);
        this.setState({
            backupStatus: 'P'
        });

        const database = Env.getDatabase();
        this.googleService.upload(database, 
            () => {

                const backupTime = Env.formatIso(new Date());
                Env.writeStorage(Env.key.BACKUP_STATUS, 'S');
                Env.writeStorage(Env.key.BACKUP_TIME, backupTime);

                this.setState({
                    backupStatus: 'S',
                    backupTime: `last sync: ${backupTime}`
                });
                ToastAndroid.show('Backup completed', ToastAndroid.SHORT);

            });
    }

    exportCSV(){
        //  export CSV
        ToastAndroid.show('Coming soon..', ToastAndroid.SHORT);
    }

    reset() {
        Alert.alert(
            'RESET',
            'Are you sure want to reset all data?',
            [{
                    text: 'CANCEL',
                },
                {
                    text: 'YES',
                    onPress: () => {
                        Env.reset();

                        Env.initDefaultCategories();

                        Alert.alert('Reset Completed', 'please signin again');
                        this.signOut();
                    }
                }
            ]
        );

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
                            <Image style={Styles.icon18} source={require('./asset/back.png')}/>
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

    

    renderBackupMenu() {
        return(
            <View style={[Styles.accountMenuBox, {marginTop: 40}]}>
                <TouchableOpacity onPress={() => {this.backup()}}>
                    <View style={Styles.accountMenuItem}>
                        <Image style={Styles.accountMenuIcon} 
                            source={require('./asset/backup.png')}/>
                        <View style={Styles.accountMenuTextBox}>
                            <Text style={Styles.accountMenuText}>{ 'Backup to Drive' }</Text>
                            {(this.state.backupStatus !== 'N') && <Text style={Styles.legendText}>{this.state.backupTime}</Text>}
                        </View>
                        <View style={Styles.versionTextBox}>
                            {this.renderSyncIcon()}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderSyncIcon(){
        if (this.state.backupStatus === 'S') {
            return(<Image style={Styles.icon18} source={require('./asset/sync.png')}/>);
        }
        if (this.state.backupStatus === 'U') {
            return(<Image style={Styles.icon18} source={require('./asset/unsync.png')}/>);
        }
        else if (this.state.backupStatus === 'P') {
            return(<ActivityIndicator color={Colors.primary}/>);
        }
        return null;
    }

    render() {
        return (
            <View style={Styles.sceneBox}>
                {this.renderHeader()}

                {this.renderBackupMenu()}

                <View style={Styles.accountMenuBox}>
                     {
                        this.renderMenuItem(
                            require('./asset/categories.png'), 
                            'Categories', 
                            true, 
                            () => { this.props.navigation.navigate('categories') })
                    }
                    {
                        this.renderMenuItem(
                            require('./asset/export.png'),
                            'Export',
                            false,
                            () => { this.exportCSV() })
                    }
                </View>

                <View style={Styles.accountMenuBox}>
                    {
                        this.renderMenuItem(
                            require('./asset/reset.png'),
                            'Reset',
                            true,
                            () => { this.reset() })
                    }
                    {
                        this.renderMenuItem(
                            require('./asset/licenses.png'), 
                            'Licenses', 
                            true, 
                            () => {})
                    }
                    {
                        this.renderMenuItem(
                            require('./asset/rate.png'),
                            'Rate Us',
                            true,
                            () => { this.props.navigation.popToTop() })
                    }
                    <TouchableOpacity onPress={() => {Alert.alert('Moneyman')}}>
                        <View style={Styles.accountMenuItem}>
                            <Image style={Styles.accountMenuIcon} 
                                source={require('./asset/about.png')}/>
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
