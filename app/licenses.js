import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    StatusBar,
    ScrollView,
    TouchableOpacity, 
} from 'react-native';
import {Styles, Colors} from './lib/styles';


export default class Licenses extends Component {

    render() {
        return (
            <View style={Styles.sceneBox}>
                <StatusBar backgroundColor={Colors.primary} barStyle="dark-content" />
                <View style={[Styles.actionbarBox, {elevation: 0}]}>
                    <TouchableOpacity style={Styles.backButton} 
                        onPress={() => { this.props.navigation.goBack(); }}>
                        <Image style={Styles.icon18} source={require('./asset/back.png')}/>
                    </TouchableOpacity>
                    <Text style={Styles.actionbarTitle}>Licenses</Text>
                </View>

                <ScrollView style={{paddingHorizontal: 15}}>
                    <Text style={Styles.licenseHeader}>Open Source Attribution</Text>

                    <View style={Styles.licenseBox}>
                        <Text style={Styles.licenseTitle}>react-native</Text>
                        <Text style={Styles.licenseSubtitle}>https://github.com/facebook/react-native</Text>
                        <Text style={Styles.licenseSubtitle}>© Facebook under MIT license</Text>
                    </View>
                    <View style={Styles.licenseBox}>
                        <Text style={Styles.licenseTitle}>react-native-google-signin</Text>
                        <Text style={Styles.licenseSubtitle}>https://github.com/react-native-community/react-native-google-signin</Text>
                        <Text style={Styles.licenseSubtitle}>© React Native Community under MIT license</Text>
                    </View>
                    <View style={Styles.licenseBox}>
                        <Text style={Styles.licenseTitle}>react-native-webview</Text>
                        <Text style={Styles.licenseSubtitle}>https://github.com/react-native-community/react-native-webview</Text>
                        <Text style={Styles.licenseSubtitle}>© React Native Community under MIT license</Text>
                    </View>
                    <View style={Styles.licenseBox}>
                        <Text style={Styles.licenseTitle}>react-navigation</Text>
                        <Text style={Styles.licenseSubtitle}>https://github.com/react-navigation/react-navigation</Text>
                        <Text style={Styles.licenseSubtitle}>© React Navigation under MIT license</Text>
                    </View>
                    <View style={Styles.licenseBox}>
                        <Text style={Styles.licenseTitle}>react-native-gesture-handler</Text>
                        <Text style={Styles.licenseSubtitle}>https://github.com/kmagiera/react-native-gesture-handler</Text>
                        <Text style={Styles.licenseSubtitle}>© Krzysztof Magiera under MIT license</Text>
                    </View>
                    <View style={Styles.licenseBox}>
                        <Text style={Styles.licenseTitle}>react-native-svg-charts</Text>
                        <Text style={Styles.licenseSubtitle}>https://github.com/JesperLekland/react-native-svg-charts</Text>
                        <Text style={Styles.licenseSubtitle}>© Jesper Lekland under MIT license</Text>
                    </View>
                    <View style={Styles.licenseBox}>
                        <Text style={Styles.licenseTitle}>react-native-svg</Text>
                        <Text style={Styles.licenseSubtitle}>https://github.com/react-native-community/react-native-svg</Text>
                        <Text style={Styles.licenseSubtitle}>© React Native Community under MIT license</Text>
                    </View>
                    <View style={Styles.licenseBox}>
                        <Text style={Styles.licenseTitle}>moment</Text>
                        <Text style={Styles.licenseSubtitle}>https://github.com/moment/moment</Text>
                        <Text style={Styles.licenseSubtitle}>© Moment.js under MIT license</Text>
                    </View>
                    <View style={Styles.licenseBox}>
                        <Text style={Styles.licenseTitle}>realm</Text>
                        <Text style={Styles.licenseSubtitle}>https://github.com/realm/realm-js</Text>
                        <Text style={Styles.licenseSubtitle}>© Realm under MIT license</Text>
                    </View>
                </ScrollView>

            </View>
        );
    }
}
