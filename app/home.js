import React, { Component } from 'react';
import { View } from 'react-native';

export default class Home extends Component {


    renderActionBar() {
        return(
            <View></View>
        );
    }

    render() {
        return(
            <View>
                {this.renderActionBar()}
            </View>
        );
    }
}