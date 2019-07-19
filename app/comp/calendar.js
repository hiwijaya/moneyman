import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { Styles, Colors } from '../lib/styles';


export default class Calendar extends Component {

    constructor(props) {
        super(props);

        let today = new Date();
        let month = today.getMonth() + 1;   // As January is 0.
        let year = today.getFullYear();

        this.state = {
            show: true,
            selectedMonth: month,
            selectedYear: year
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

    onPrevYear(){
        this.setState({
            selectedYear: this.state.selectedYear - 1
        });
    }

    onNextYear(){
        this.setState({
            selectedYear: this.state.selectedYear + 1
        });
    }


    render() {
        if(this.state.show){
            return (
                <View style={Styles.calendarModalBox}>
                    <View style={Styles.calendarBox}>
                        <View style={Styles.calendarYearBox}>
                            <TouchableOpacity style={Styles.calendarYearButton} 
                                onPress={() => this.onPrevYear()}>
                                <Image style={Styles.icon12} source={require('../asset/icon-left.png')}/>
                            </TouchableOpacity>
                            <Text style={{color: Colors.grey}}>{this.state.selectedYear}</Text>
                            <TouchableOpacity style={[Styles.calendarYearButton, {alignItems: 'flex-end'}]}
                                onPress={() => this.onNextYear()}>
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
                    <TouchableOpacity style={Styles.box} 
                        onPress={() => this.setState({show: false})}>
                        <View></View>
                    </TouchableOpacity>
                </View>
            );
        }
        else{
            return null;
        }
    }
}
