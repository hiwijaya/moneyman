import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import { Styles, Colors } from '../lib/styles';


export default class Calendar extends Component {

    constructor(props) {
        super(props);

        let today = new Date();

        this.selectedYear = today.getFullYear();
        this.selectedMonth = today.getMonth(); // January is 0.

        this.state = {
            show: false,
            year: this.selectedYear,
            month: this.selectedMonth,
        };

        this.months = moment.monthsShort();
    }

    // TODO: refactor this function --> show(boolean)
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

    onMonthPress(month, monthName){
        this.setState({
            month: month,
            show: false,
        }, () => {
            this.selectedYear = this.state.year;
            this.selectedMonth = month;
            this.props.onSelectedMonth(
                this.state.year, 
                this.state.month, 
                monthName
            );
        });
    }

    onChangeYear(type){

        let selectingYear = (type === 'prev') ? this.state.year - 1 : this.state.year + 1;

        this.setState({
            year: selectingYear,
            month: (selectingYear === this.selectedYear) ? this.selectedMonth : null,
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
                                this.months.map((val, key) => {
                                    return(
                                        <TouchableOpacity key={key} onPress={() => this.onMonthPress(key, val) }
                                            style={Styles.calendarMonthBox}>
                                            <View style={this.state.month == key ? Styles.calendarMonthSelected : null} >
                                                <Text style={this.state.month == key ? Styles.calendarTextSelected : null}>{val}</Text>
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
    // TODO: add props to set default calendar
    onSelectedMonth: (year, month, monthName) => {}    // month: 0=Jan
}
