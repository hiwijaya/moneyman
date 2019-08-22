import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    Alert,
    TouchableOpacity, 
} from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import Calendar from './comp/calendar';
import {Styles} from './lib/styles';
import Env from './lib/env';


export default class Charts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            monthName: Env.formatMonthName(new Date()),
            period: Env.formatMonthYear(new Date()),

        };

        this.refCalendar = null;
    }

    componentDidMount(){
        let incomeData = Env.getTransactionPerCategory(this.state.period, Env.EXPENSE_TYPE);
        incomeData.forEach((value, index, array) => {
            console.log(value.total);
        });


    }



    renderActionBar() {
        return(
            <View style={[Styles.actionbarBox, {justifyContent: 'flex-start'}]}>
                <TouchableOpacity style={Styles.backButton} 
                    onPress={() => { this.props.navigation.goBack(); }}>
                    <Image style={Styles.icon18} source={require('./asset/icon-back.png')}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {
                        if (this.refCalendar.isShow()){
                            this.refCalendar.hide();
                        }
                        else{
                            this.refCalendar.show();
                        }
                    }}>
                    <View style={Styles.periodButtonBox}>
                        <Text style={Styles.periodButtonLabel}>{this.state.monthName}</Text>
                        <Image style={Styles.icon8} source={require('./asset/icon-down.png')}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderChart(){
        const data = [50, 10, 40, 95]
        const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);
        const pieData = data
            .map((value, index) => ({
                value,
                svg: {
                    fill: randomColor(),
                    onPress: () => Alert.alert(value.toString()),
                },
                key: `pie-${index}`,
            }))
        return(
            <View style={Styles.chartBox}>
                <PieChart style={{ height: 120, width: 120 }} 
                    data={pieData} 
                    cornerRadius={5}
                />
            </View>
        );
    }

    render() {
        return (
            <View style={Styles.sceneBox}>
                {this.renderActionBar()}
                <Calendar ref={ref => this.refCalendar = ref} 
                    onSelectedMonth={(year, month, monthName) => {
                        let period = Env.formatMonthYear(new Date(year, month, 1));
                        this.setState({
                            monthName: monthName,
                            period: period
                        }, () => {
                            Alert.alert(period.toString());
                        });
                }}/>
                
                {this.renderChart()}
            </View>
        );
    }
}
