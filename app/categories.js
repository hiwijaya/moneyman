import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    TouchableOpacity, 
    FlatList,
} from 'react-native';
import { Styles } from './lib/styles';


export default class Categories extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tabSelectedIndex: 0,
        };
    }

    // TODO: Explore Flatlist, and consider to try react-native-swipeout.

    renderTab() {
        return(
            <View>
                <View style={[Styles.actionbarBox, {elevation: 0}]}>
                    <TouchableOpacity style={Styles.backButton} 
                        onPress={() => { this.props.navigation.goBack(); }}>
                        <Image style={Styles.icon18} source={require('./asset/icon-back.png')}/>
                    </TouchableOpacity>
                    <Text style={Styles.actionbarTitle}>Categories</Text>
                </View>
                <View style={Styles.tabBox}>
                    <TouchableOpacity 
                        style={[Styles.center, (this.state.tabSelectedIndex === 0) ? Styles.tabSelected : null]} 
                        onPress={() => this.setState({tabSelectedIndex: 0})}>
                        <Text>Expenses</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[Styles.center, (this.state.tabSelectedIndex === 1) ? Styles.tabSelected : null]}
                        onPress={() => this.setState({tabSelectedIndex: 1})}>
                        <Text>Income</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderExpenses() {
        return(
            <View>
                <Text>EXPENSES</Text>
            </View>
        );
    }

    renderIncome() {
        return(
            <View>
                <Text>INCOME</Text>
            </View>
        );
    }



    render() {
        return (
            <View style={Styles.sceneBox}>
                {this.renderTab()}
                {(this.state.tabSelectedIndex == 0) ? this.renderExpenses() : this.renderIncome()}

            </View>
        );
    }
}
