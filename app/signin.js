import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    Alert,
    ToastAndroid,
    TouchableOpacity, 
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Styles } from './lib/styles';
import GoogleService from './lib/google-service';
import Env from './lib/env';


export default class Signin extends Component {


    componentDidMount() {
        this.googleService = new GoogleService();
    }

    redirectToHome(userInfo){
        ToastAndroid.show(`Welcome, ${userInfo.user.name}`, ToastAndroid.SHORT);
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName: 'home'
            })],
        });
        this.props.navigation.dispatch(resetAction);
    }

    signIn = () => {
        this.googleService.signIn((userInfo, fileId, backupData) => {

            if(backupData !== null){

                Alert.alert(
                    'Backup Founded',
                    'Do you want to restore your data?',
                    [{
                            text: 'NO',
                            onPress: () => {

                                // init default categories
                                Env.initDefaultCategories();
                                
                                this.redirectToHome(userInfo);
                            }
                        },
                        {
                            text: 'YES',
                            onPress: () => {
                                // restoring data
                                Env.restoreDatabase(fileId, backupData);

                                this.redirectToHome(userInfo);
                            }
                        }
                    ]
                );

            }
            else{
                this.redirectToHome(userInfo);
            }

            

        });
    }


    render() {
        return (
            <View style={[Styles.sceneBox, Styles.center]}>
                <Image style={{width: 256, height: 210, marginBottom: 30}} 
                    source={require('./asset/welcome.png')}/>

                <TouchableOpacity style={Styles.googleButton} onPress={this.signIn}>
                    <Image style={Styles.icon24} source={require('./asset/google.png')}/>
                    <Text style={Styles.googleButtonText}>Sign in with Google</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
