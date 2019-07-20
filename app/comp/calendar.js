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

        this.selectedYear = today.getFullYear();
        this.selectedMonth = today.getMonth() + 1; // As January is 0.
        
        this.state = {
            show: false,
            year: this.selectedYear,
            month: this.selectedMonth,
        };


    }

    show(){
        this.setState({
            show: true,
            year: this.selectedYear,
            month: this.selectedMonth
        });
    }

    hide(){
        this.setState({
            show: false
        });
    }

    isShow(){
        return this.state.show;
    }

    month1 = [{key: 'Jan', val: 1}, {key: 'Feb', val: 2}, {key: 'Mar', val: 3}, 
        {key: 'Apr', val: 4}, {key: 'May', val: 5}, {key: 'Jun', val: 6}];
    month2 = [{key: 'Jul', val: 7}, {key: 'Aug', val: 8}, {key: 'Sep', val: 9}, 
        {key: 'Oct', val: 10}, {key: 'Nov', val: 11}, {key: 'Dec', val: 12}];
    
    onMonthPress(month, monthLabel){
        this.setState({
            month: month,
            show: false,
        }, () => {
            this.selectedYear = this.state.year;
            this.selectedMonth = month;
            this.props.onSelectedMonth(
                this.state.year, 
                this.state.month, 
                monthLabel
            );
        });
    }

    onChangeYear(type){

        let selectingYear = (type === 'prev') ? this.state.year - 1 : this.state.year + 1;

        this.setState({
            year: selectingYear,
            month: (selectingYear === this.selectedYear) ? this.selectedMonth : 0,
        });

    }


    render() {
        if(this.state.show){
            return (
                <View style={Styles.calendarModalBox}>
                    <View style={Styles.calendarBox}>
                        <View style={Styles.calendarYearBox}>
                            <TouchableOpacity style={Styles.calendarYearButton} 
                                onPress={() => this.onChangeYear('prev')}>
                                <Image style={Styles.icon12} source={require('../asset/icon-left.png')}/>
                            </TouchableOpacity>
                            <Text style={{color: Colors.grey}}>{this.state.year}</Text>
                            <TouchableOpacity style={[Styles.calendarYearButton, {alignItems: 'flex-end'}]}
                                onPress={() => this.onChangeYear('next')}>
                                <Image style={Styles.icon12} source={require('../asset/icon-right.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={Styles.calendarRowBox}>
                            {
                                this.month1.map((prop, key) => {
                                    return(
                                        <TouchableOpacity key={key} onPress={() => this.onMonthPress(prop.val, prop.key) }
                                            style={Styles.calendarMonthBox}>
                                            <View style={this.state.month == prop.val ? Styles.calendarMonthSelected : null} >
                                                <Text style={this.state.month == prop.val ? Styles.calendarTextSelected : null}>{prop.key}</Text>
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
                                        <TouchableOpacity key={key} onPress={() => this.onMonthPress(prop.val, prop.key) }
                                            style={Styles.calendarMonthBox}>
                                            <View style={this.state.month == prop.val ? Styles.calendarMonthSelected : null} >
                                                <Text style={this.state.month == prop.val ? Styles.calendarTextSelected : null}>{prop.key}</Text>
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

Calendar.defaultProps = {
    onSelectedMonth: (year, month, monthLabel) => {}
}
