import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    ScrollView,
    TouchableOpacity, 
    ToastAndroid,
} from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import Calendar from './comp/calendar';
import Cicon from './comp/cicon';
import {Styles, Fonts, Screen} from './lib/styles';
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

        let pieData = [];
        
        data.forEach(
        (item, index, array) => {
            let pieItem = {
                key: item.categoryId,
                title: item.title,
                value: item.percentage,
                svg: {
                    fill: item.color,
                    arc: {cornerRadius: 10},
                    onPress: () => ToastAndroid.show(item.title, ToastAndroid.SHORT),
                }   
            }

            if(index > 4){
                pieItem = pieData[4];
                pieItem.title = 'Others';
                pieItem.value += item.percentage;
                pieItem.svg = {
                    fill: '#FFDC47',
                    arc: {cornerRadius: 10},
                    onPress: () => ToastAndroid.show('Others', ToastAndroid.SHORT),
                }
                pieData[4] = pieItem;
            }
            else{
                pieData.push(pieItem);
            }

        });
        
        return pieData
    }

    getWidthBar(total, index){
        
        let MAX_WIDTH = Screen.width - 105;

        if(index === 0){
            this.pivot = total;
            return MAX_WIDTH;
        }

        let percentage = (total/this.pivot) * 100;

        return (percentage / 100) * MAX_WIDTH;
    }


    renderActionBar() {
        return(
            <View style={[Styles.actionbarBox, {justifyContent: 'flex-start'}]}>
                <TouchableOpacity style={Styles.backButton} 
                    onPress={() => { this.props.navigation.goBack(); }}>
                    <Image style={Styles.icon18} source={require('./asset/back.png')}/>
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
                        <Image style={Styles.icon8} source={require('./asset/down.png')}/>
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
                    this.state.pieData.map((item, index) => {
                        return(
                            <View key={index} style={Styles.legendItemBox}>
                                <View style={[Styles.legendPoint, {backgroundColor: item.svg.fill}]}></View>
                                <Text style={[Styles.legendText, {flex: 1}]}>{item.title}</Text>
                                <Text style={Styles.legendText}>{`${item.value.toString()}%`}</Text>
                            </View>
                        );
                    })
                }
            </View>
        );
    }

    renderList(){
        return(
            <View style={Styles.pieListBox}>
                <Text style={[Styles.legendText, {marginBottom: 5}]}>Expenses List</Text>
                {
                    this.state.transactionData.map((item, index) => {
                        return(
                            <View key={index} style={[Styles.centerH, {height: 60}]}>
                                <Cicon style={{width: 30, height: 30, marginRight: 15}} 
                                    color={item.color} icon={item.icon} iconSize={Styles.icon14}/>
                                <View style={Styles.box}>
                                    <View style={Styles.centerH}>
                                        <Text style={{fontSize: Fonts.h6, marginRight: 10}}>{item.title}</Text>
                                        <Text style={[Styles.legendText, {flex: 1}]}>{`${item.percentage.toString()}%`}</Text>
                                        <Text style={{fontSize: Fonts.h6}}>{Env.formatCurrency(item.total)}</Text>
                                    </View>
                                    <View style={[Styles.pieBar, {width: this.getWidthBar(item.total, index)}]}></View>
                                </View>

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
                    {this.renderList()}
                </ScrollView>
                
            </View>
        );
    }
}
