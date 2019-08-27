import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    Alert,
    ScrollView,
    TouchableOpacity, 
    ToastAndroid,
} from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import Calendar from './comp/calendar';
import {Styles} from './lib/styles';
import Env from './lib/env';


export default class Pie extends Component {

    constructor(props) {
        super(props);

        this.state = {
            transactionType: Env.EXPENSE_TYPE,
            monthName: Env.monthNow(),
            period: Env.formatMonthYear(Env.now()),
            transactionData: [],
            pieData: [],
        };

        this.refCalendar = null;

    }

    componentDidMount(){
        this.setPieData();
    }

    setPieData(){
        this.expenseData = Env.getTransactionPerCategory(this.state.period, Env.EXPENSE_TYPE);
        this.incomeData = Env.getTransactionPerCategory(this.state.period, Env.INCOME_TYPE);

        this.expensePie = this.convertToPieData(this.expenseData);
        this.incomePie = this.convertToPieData(this.incomeData);

        let isExpense = (this.state.transactionType === Env.EXPENSE_TYPE);

        this.setState({
            transactionData: (isExpense) ? this.expenseData : this.incomeData,
            pieData: (isExpense) ? this.expensePie : this.incomePie,
        });
    }

    switchPieData(){
        let isExpense = (this.state.transactionType === Env.EXPENSE_TYPE);
        this.setState({
            transactionData: (isExpense) ? this.expenseData : this.incomeData,
            pieData: (isExpense) ? this.expensePie : this.incomePie,
        });
    }

    convertToPieData(data){
        let pieData = data
            .map((item, index) => ({
                value: item.total,
                svg: {
                    fill: item.color,
                    arc: { cornerRadius: 10 },
                    onPress: () => ToastAndroid.show(item.title, ToastAndroid.SHORT),
                },
                key: item.categoryId,
            }));
        
        return pieData
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
        return(
            <View style={Styles.pieBox}>
                <PieChart style={{ height: 130, width: 130 }} innerRadius={'70%'}
                    data={this.state.pieData} 
                />
                {this.renderLegend()}
            </View>
        );
    }

    renderLegend(){
        return(
            <View style={Styles.legendBox}>
                {
                    this.state.transactionData.map((item, index) => {
                        return(
                            <View key={index} style={Styles.legendItemBox}>
                                <View style={[Styles.legendPoint, {backgroundColor: item.color}]}></View>
                                <Text style={[Styles.legendText, {flex: 1}]}>{item.title}</Text>
                                <Text style={Styles.legendText}>{`${item.percentage}%`}</Text>
                            </View>
                        );
                    })
                }
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
                        }, () => this.setPieData());
                }}/>

                <ScrollView style={Styles.homeScroll}>
                    {this.renderChart()}
                </ScrollView>
                
            </View>
        );
    }
}
