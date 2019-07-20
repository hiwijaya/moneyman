import React, { Component } from 'react';
import { 
    View, 
    Text,
    TouchableOpacity,
    Image,
    Alert,
 } from 'react-native';
import {Styles, Colors} from './lib/styles';
import Calendar from './comp/calendar';


export default class Home extends Component {

    constructor(props){
        super(props);

        this.refCalendar = null;

        this.state = {
            monthLabel: 'Jul',
        }
    }


    renderActionBar() {
        return(
            <View style={Styles.actionbarBox}>
                <TouchableOpacity onPress={() => {this.refCalendar.show()}}>
                    <View style={Styles.periodButtonBox}>
                        <Text style={Styles.periodButtonLabel}>{this.state.monthLabel}</Text>
                        <Image style={Styles.icon8} source={require('./asset/icon-down.png')}/>
                    </View>
                </TouchableOpacity>
                <View style={Styles.actionbarButtonBox}>
                    <TouchableOpacity style={Styles.actionbarButton}>
                        <Image style={Styles.icon24} source={require('./asset/icon-chart.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.actionbarButton}
                        onPress={() => {this.props.navigation.navigate('account', {item: 'fromA'});}}>
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
                <Calendar ref={ref => this.refCalendar = ref} 
                    onSelectedMonth={(year, month, monthLabel) => {
                        this.setState({monthLabel: monthLabel});
                    }}/>
            </View>
        );
    }
}