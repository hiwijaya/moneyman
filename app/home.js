import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    Alert,
 } from 'react-native';
import {Styles, Colors} from './lib/styles';
import Calendar from './comp/calendar';
import Cicon from './comp/cicon';
import Env from './lib/env';


export default class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            monthName: Env.formatMonthName(new Date()),
            period: Env.formatMonthYear(new Date()),
            transactions: [],
            income: '0',
            expense: '0',
            balance: '0',
        }

        this.refCalendar = null;
        
    }

    componentDidMount() {
        this.getTransactions();
    }

    onNavigateBack = (params) => {
        this.getTransactions();
    }

    getTransactions(){
        let transactions = Env.getTransactionByPeriod(this.state.period);
        
        let income = 0;
        let expense = 0;
        let balance = 0;
        transactions.forEach((value, index, array) => {
            income += value.incomeTotal;
            expense += value.expenseTotal;
        });
        balance = income - expense;

        this.setState({
            transactions: transactions,
            income: Env.formatCurrency(income),
            expense: Env.formatCurrency(expense),
            balance: Env.formatCurrency(balance),
        });
    }

    getTotalText(type, amount){
        if(amount === 0){
            return '';
        }

        if(type === Env.INCOME_TYPE){
            return `Income: ${Env.formatCurrency(amount)}`;
        }
        else{
            return `Expenses: ${Env.formatCurrency(amount)}`;
        }
    }


    renderActionBar() {
        return(
            <View style={Styles.actionbarBox}>
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
                <View style={Styles.actionbarButtonBox}>
                    <TouchableOpacity style={Styles.actionbarButton} 
                        onPress={() => {this.props.navigation.navigate('pie');}}>
                        <Image style={Styles.icon24} source={require('./asset/chart.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.actionbarButton}
                        onPress={() => {this.props.navigation.navigate('account');}}>
                        <Image style={Styles.icon24} source={require('./asset/account.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderResume() {
        return(
            <View>
                <View style={Styles.homeResumeBox}>
                    <View style={Styles.homeResumeItemBox}>
                        <Text>Income</Text>
                        <Text style={Styles.homeResumeValue}>{this.state.income}</Text>
                    </View>
                    <View style={Styles.separator}></View>
                    <View style={Styles.homeResumeItemBox}>
                        <Text>Expense</Text>
                        <Text style={Styles.homeResumeValue}>{this.state.expense}</Text>
                    </View>
                    <View style={Styles.separator}></View>
                    <View style={Styles.homeResumeItemBox}>
                        <Text>Balance</Text>
                        <Text style={Styles.homeResumeValue}>{this.state.balance}</Text>
                    </View>
                </View>
                {this.renderAddButton()}
            </View>
        );
    }

    renderAddButton() {
        return(
            <TouchableOpacity style={Styles.homeAddButton} 
                onPress={() => {
                    this.props.navigation.navigate('addTransaction', {
                        onNavigateBack: this.onNavigateBack
                    });
                }}>
                <Image style={Styles.icon14} 
                    source={require('./asset/add.png')}/>
            </TouchableOpacity>
        );
    }

    // per Day
    renderTransactionCard(data) {
        return(
            <View style={Styles.homeTransactionBox}>
                <View style={Styles.homeTransactionHeaderBox}>
                    <Text style={[Styles.homeTransactionHeaderText, {flex: 1}]}>
                        {data.transactionDate}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[Styles.homeTransactionHeaderText, {marginRight: 10}]}>
                            {this.getTotalText(Env.INCOME_TYPE, data.incomeTotal)}
                        </Text>
                        <Text style={Styles.homeTransactionHeaderText}>
                            {this.getTotalText(Env.EXPENSE_TYPE, data.expenseTotal)}
                        </Text>
                    </View>
                </View>
                <View>
                    {
                        data.transactions.map((item, key) => {
                            return(
                                <TouchableOpacity key={key} style={Styles.homeTransactionItemBox}
                                    onPress={() => {
                                        this.props.navigation.navigate('transactionDetail', {
                                            transactionId: item.transactionId,
                                            onNavigateBack: this.onNavigateBack
                                        });
                                    }}>
                                    <Cicon style={{width: 30, height: 30}} 
                                        color={item.color} icon={item.icon} iconSize={Styles.icon14}/>
                                    <Text style={{flex: 1, marginHorizontal: 10}}>{item.memo}</Text>
                                    <Text style={{color: Colors.grey}}>{item.amount}</Text>
                                </TouchableOpacity>
                            );
                        })
                    }
                    
                </View>
            </View>
        );
    }

    renderTransactionList() {
        return(
            <FlatList style={Styles.homeScroll} data={this.state.transactions} 
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => {
                    return(this.renderResume());
                }}
                renderItem={({item}) => {
                    return(this.renderTransactionCard(item));
                }}
            />
        );
    }

    render() {
        return(
            <View style={Styles.sceneBox}>
                {this.renderActionBar()}
                <Calendar ref={ref => this.refCalendar = ref} 
                    onSelectedMonth={(year, month, monthName) => {
                        let period = Env.formatMonthYear(new Date(year, month, 1));
                        this.setState({
                            monthName: monthName,
                            period: period
                        }, () => {
                            this.getTransactions();
                        });
                    }}/>

                {this.renderTransactionList()}

            </View>
        );
    }
}