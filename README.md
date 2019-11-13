![Moneyman Preview](docs/github-banner.png)

### Moneyman
Moneyman is your personal finance manager. You can note and tracking your expenses & income with a simple steps.
This is the features details:
- Write expenses & income per category
- Tons of epic category icons
- Tracking your expenses & income with chart
- Show your list per-month
- Save your own data to your Google Drive appdata.

### Live demo
[Download APK](http://bit.ly/app-moneyman)


### Build with
<a href="https://facebook.github.io/react-native/" rel="React Native">
  <img src="docs/react-native.png" alt="react-native" width="200"/>
</a>


### Configue
Get the repo
```sh
git clone https://github.com/hiwijaya/moneyman.git
cd moneyman
yarn install or npm install
react-native link
```

Add `config.js` to your your root directory and add the following
```js
export default {
    scopes: ['https://www.googleapis.com/auth/drive.appdata'],
    webClientId: 'YOUR_WEBCLIENTID',
}; 
```
To get `webClientId`, please follow [react-native-google-signin](https://github.com/react-native-community/react-native-google-signin/blob/master/docs/android-guide.md) android guide.

Thank you.
<br/>

<a href="https://www.buymeacoffee.com/hiwijaya" rel="buymeacoffee">
  <img src="docs/buymeacoffee.png" alt="buymeacoffee" width="150"/>
</a>
