import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Styles, Colors } from '../lib/styles';


export default class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedMonth: 0
        };
    }

    month1 = [{key: 'Jan', val: 1}, {key: 'Feb', val: 2}, {key: 'Mar', val: 3}, 
        {key: 'Apr', val: 4}, {key: 'May', val: 5}, {key: 'Jun', val: 6}];
    month2 = [{key: 'Jul', val: 7}, {key: 'Aug', val: 8}, {key: 'Sep', val: 9}, 
        {key: 'Oct', val: 10}, {key: 'Nov', val: 11}, {key: 'Dec', val: 12}];
    
    onMonthPress(selectedMonth){
        this.setState({
            selectedMonth: selectedMonth
        });
    }


    render() {
        return (
            <View style={Styles.calendarModalBox}>
                <View style={Styles.calendarBox}>
                    <View style={Styles.calendarYearBox}>
                        <TouchableOpacity style={Styles.calendarYearButton}>
                            <Image style={Styles.icon12} source={require('../asset/icon-left.png')}/>
                        </TouchableOpacity>
                        <Text style={{color: Colors.grey}}>2019</Text>
                        <TouchableOpacity style={[Styles.calendarYearButton, {alignItems: 'flex-end'}]}>
                            <Image style={Styles.icon12} source={require('../asset/icon-right.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.calendarRowBox}>
                        {
                            this.month1.map((prop, key) => {
                                return(
                                    <TouchableOpacity key={key} onPress={() => this.onMonthPress(prop.val) }
                                        style={Styles.calendarMonthBox}>
                                        <View style={this.state.selectedMonth == prop.val ? Styles.calendarMonthSelected : null} >
                                            <Text style={this.state.selectedMonth == prop.val ? Styles.calendarTextSelected : null}>{prop.key}</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View>
                    <View style={Styles.calendarRowBox}>
                        {
                            this.month2.map((prop, key) => {
                                return(
                                    <TouchableOpacity key={key} onPress={() => this.onMonthPress(prop.val) }
                                        style={Styles.calendarMonthBox}>
                                        <View style={this.state.selectedMonth == prop.val ? Styles.calendarMonthSelected : null} >
                                            <Text style={this.state.selectedMonth == prop.val ? Styles.calendarTextSelected : null}>{prop.key}</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View>
                </View>
            </View>
        );
    }
}
