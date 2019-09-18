import React, { Component } from 'react';
import { BarIndicator } from 'react-native-indicators';
import { Colors } from '../lib/styles';

export default class Loading extends Component {

    render() {
        return (
            <BarIndicator
                count={3}
                color={this.props.color}
                size={this.props.size}
                animationDuration={1200}/>
        );
    }
}
Loading.defaultProps = {
    size: 20,
    color: Colors.primary
};