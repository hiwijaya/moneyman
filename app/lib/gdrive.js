

export default class Gdrive {

    URL = 'https://www.googleapis.com/drive/v3';
    UPLOAD_URL = 'https://www.googleapis.com/upload/drive/v3';
    BOUNDARY = 'MONEYMAN';

    token = null;   // google access-token

    setToken(token){
        this.token = token;
    }

    parseAndHandleErrors(response) {
        if (response.ok) {
            return response.json();
        }

        return response.json()
            .then((error) => {
                throw new Error(JSON.stringify(error));
            });
    }

    configureGetOptions() {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${this.token}`);
        return {
            method: 'GET',
            headers,
        }
    }

    configurePostOptions(bodyLength, isUpdate=false) {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${this.token}`);
        headers.append('Content-Type', `multipart/related; boundary=${this.BOUNDARY}`);
        headers.append('Content-Length', bodyLength);

        return {
            method: isUpdate ? 'PATCH' : 'POST',
            headers,
        }
    }

    createMultipartBody(body, isUpdate=false) {

        // google-drive-api multipart-upload defines the structure
        const metaData = {
            name: 'data.json',
            description: 'Backup data for my app',
            mimeType: 'application/json',
        }

        // if it already exists, specifying parents again throws an error
        if (!isUpdate) metaData.parents = ['appDataFolder']

        // request body
        const multipartBody = `\r\n--${this.BOUNDARY}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n` +
            `${JSON.stringify(metaData)}\r\n` +
            `--${this.BOUNDARY}\r\nContent-Type: application/json\r\n\r\n` +
            `${JSON.stringify(body)}\r\n` +
            `--${this.BOUNDARY}--`

        return multipartBody
    }

    // uploads a file with its contents and its meta data (name, description, type, location)
    async upload(content, existingFileId){

        const body = this.createMultipartBody(content, !!existingFileId);
        const options = this.configurePostOptions(body.length, !!existingFileId);

        let response = await fetch(`${this.UPLOAD_URL}/files${existingFileId ? `/${existingFileId}` : ''}?uploadType=multipart`,
            {
                ...options,
                body
            });
        let responseJson = await response.json();

        console.log(responseJson);
    }

    async download(fileId){
        const options = this.configureGetOptions();
        
        let response = await fetch(`${this.URL}/files/${fileId}?alt=media`, options);
        let responseJson = await response.json();

        console.log(responseJson);

    }







}




