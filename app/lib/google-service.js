import {
    Alert
} from 'react-native';
import {
    GoogleSignin,
    statusCodes,
} from 'react-native-google-signin';
import config from '../../config';
import Env from './env';


export default class GoogleService {

    URL = 'https://www.googleapis.com/drive/v3';
    UPLOAD_URL = 'https://www.googleapis.com/upload/drive/v3';
    BOUNDARY = 'MONEYMAN';

    constructor(){

        GoogleSignin.configure({
            scopes: config.scopes,
            webClientId: config.webClientId,
            offlineAccess: true,
        });

    }

    // onSuccess(userInfo);
    async signIn(onSuccess){
        try{
            // Check if device has Google Play Services installed
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            const userInfo = await GoogleSignin.signIn();
            Env.writeStorage(Env.key.USER_INFO, userInfo);

            onSuccess(userInfo);
        }
        catch(error){
            this._handleError(error);
        }
    }


    async signOut(onSuccess){
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();

            onSuccess();
        } 
        catch (error) {
            this._handleError(error);
        }
    }

    // uploads a file with its contents and its meta data (name, description, type, location)
    async upload(content, onSuccess) {

        // get new access-token with signInSilently()
        await GoogleSignin.signInSilently();
        const token = await GoogleSignin.getTokens();
        const accessToken = token.accessToken;
        
        const fileId = Env.readStorage(Env.key.BACKUP_FILE_ID);

        const body = this._createMultipartBody(content, !!fileId);
        const options = this._configurePostOptions(accessToken, body.length, !!fileId);
        let response = await fetch(`${this.UPLOAD_URL}/files${fileId ? `/${fileId}` : ''}?uploadType=multipart`, {
            ...options,
            body
        });
        let responseJson = await response.json();

        Env.writeStorage(Env.key.ACCESS_TOKEN, accessToken);
        Env.writeStorage(Env.key.BACKUP_FILE_ID, responseJson.id);

        onSuccess(responseJson.id);

        console.log(`TOKEN= ${accessToken}`);
        console.log(responseJson);
    }

    async download() {

        // get new access-token with signInSilently()
        await GoogleSignin.signInSilently();
        const token = await GoogleSignin.getTokens();
        const accessToken = token.accessToken;

        const fileId = Env.readStorage(Env.key.BACKUP_FILE_ID);

        const options = this._configureGetOptions(accessToken);

        let response = await fetch(`${this.URL}/files/${fileId}?alt=media`, options);
        let responseJson = await response.json();

        console.log(responseJson);

        Alert.alert(responseJson.backup);

    }


    _createMultipartBody(body, isUpdate=false) {

        // google-drive-api multipart-upload defines the structure
        const metadata = {
            name: 'backup_moneyman.json',
            description: 'Backup data for my app',
            mimeType: 'application/json',
        }

        // if it already exists, specifying parents again throws an error
        if (!isUpdate) metadata.parents = ['appDataFolder']

        // request body
        const multipartBody = `\r\n--${this.BOUNDARY}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n` +
            `${JSON.stringify(metadata)}\r\n` +
            `--${this.BOUNDARY}\r\nContent-Type: application/json\r\n\r\n` +
            `${JSON.stringify(body)}\r\n` +
            `--${this.BOUNDARY}--`;

        return multipartBody;
    }

    _configureGetOptions(accessToken) {

        const headers = new Headers();
        headers.append('Authorization', `Bearer ${accessToken}`);
        return {
            method: 'GET',
            headers,
        }
    }

    _configurePostOptions(accessToken, bodyLength, isUpdate=false) {

        const headers = new Headers();
        headers.append('Authorization', `Bearer ${accessToken}`);
        headers.append('Content-Type', `multipart/related; boundary=${this.BOUNDARY}`);
        headers.append('Content-Length', bodyLength);

        return {
            method: isUpdate ? 'PATCH' : 'POST',
            headers,
        }
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





}