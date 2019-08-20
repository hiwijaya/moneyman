import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class TransactionDetail extends Component {
    
    constructor(props) {
        super(props);
        let transaction = this.props.navigation.getParam('transaction');
        
        this.state = {
            test: transaction.memo
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <View>
                <Text> {this.state.test} </Text>
            </View>
        );
    }
}
