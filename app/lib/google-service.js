import {
    GoogleSignin,
    statusCodes,
} from 'react-native-google-signin';
import config from '../../config';
import Env from './env';


export default class GoogleService {

    constructor(){

        GoogleSignin.configure({
            scopes: config.scopes,
            webClientId: config.webClientId,
            offlineAccess: true,
        });
    }


    _handleError(error){
        if(error.code === '401'){
            Alert.alert('invalid credentials');
        }
        else if(error.code === '404'){
            Alert.alert('backup not found');
        }
        else if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // sign in was cancelled
            Alert.alert('cancelled');
        } 
        else if (error.code === statusCodes.IN_PROGRESS) {
            // operation in progress already
            Alert.alert('in progress');
        } 
        else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            Alert.alert('play services not available or outdated');
        } 
        else {
            Alert.alert('Something went wrong', error.toString());
        }
    }


    // onSuccess(accessToken, userInfo);
    async signIn(onSuccess){
        try{
            // Check if device has Google Play Services installed
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            const userInfo = await GoogleSignin.signIn();
            const token = await GoogleSignin.getTokens();
            const accessToken = token.accessToken;

            onSuccess(accessToken, userInfo);
        }
        catch(error){
            this._handleError(error);
        }
    }





}