import React, { Component } from 'react';
import { 
    View, 
    Text,
    TouchableOpacity,
    TouchableNativeFeedback,
    Image,
 } from 'react-native';
import {Styles} from './lib/styles';


export default class Home extends Component {


    renderActionBar() {
        return(
            <View style={[Styles.actionbarBox, {elevation: 5}]}>
                <TouchableOpacity style={Styles.dateButtonBox}>
                    <Text style={Styles.dateButtonLabel}>Jul</Text>
                </TouchableOpacity>
                <View style={Styles.actionbarButtonBox}>
                    <TouchableOpacity style={Styles.actionbarButton}>
                        <Image style={Styles.icon24} source={require('./asset/icon-chart.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.actionbarButton}
                        onPress={() => {this.props.navigation.navigate('account');}}>
                        <Image style={Styles.icon24} source={require('./asset/icon-user.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        return(
            <View style={Styles.sceneBox}>
                {this.renderActionBar()}
            </View>
        );
    }
}