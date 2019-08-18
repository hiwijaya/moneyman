import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    Alert,
    ScrollView,
    FlatList,
    TouchableOpacity,
 } from 'react-native';
import {Styles, Colors} from './lib/styles';
import Calendar from './comp/calendar';
import Cicon from './comp/cicon';
import Env from './lib/env';


export default class Home extends Component {

    constructor(props){
        super(props);

        this.refCalendar = null;

        this.state = {
            monthName: Env.formatMonthName(new Date()),
            transactions: [],
            tests: [],
        }
    }

    componentDidMount() {
        let t = Env.getRawTransactionByPeriod('0819');
        let tests = Env.getTransactionByPeriod('0819');
        this.setState({transactions: t, tests: tests});
    }

    onNavigateBack = (params) => {
        // TODO: Check params if any update to decide re-render
        let t = Env.getRawTransactionByPeriod('0819');
        let tests = Env.getTransactionByPeriod('0819');
        this.setState({transactions: t, tests: tests});
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
                        <Image style={Styles.icon8} source={require('./asset/icon-down.png')}/>
                    </View>
                </TouchableOpacity>
                <View style={Styles.actionbarButtonBox}>
                    <TouchableOpacity style={Styles.actionbarButton}>
                        <Image style={Styles.icon24} source={require('./asset/icon-chart.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.actionbarButton}
                        onPress={() => {this.props.navigation.navigate('account');}}>
                        <Image style={Styles.icon24} source={require('./asset/icon-user.png')}/>
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
                        <Text style={Styles.homeResumeValue}>100,000,000</Text>
                    </View>
                    <View style={Styles.separator}></View>
                    <View style={Styles.homeResumeItemBox}>
                        <Text>Expense</Text>
                        <Text style={Styles.homeResumeValue}>200,000,000</Text>
                    </View>
                    <View style={Styles.separator}></View>
                    <View style={Styles.homeResumeItemBox}>
                        <Text>Balance</Text>
                        <Text style={Styles.homeResumeValue}>100,000,000</Text>
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
                <Image style={Styles.icon12} 
                    source={require('./asset/icon-add.png')}/>
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
                                <View key={key} style={Styles.homeTransactionItemBox}>
                                    <Cicon style={{width: 30, height: 30}} 
                                        color={item.color} icon={item.icon} iconSize={Styles.icon14}/>
                                    <Text style={{flex: 1, marginHorizontal: 10}}>{item.memo}</Text>
                                    <Text style={{color: Colors.grey}}>{item.amount}</Text>
                                </View>
                            );
                        })
                    }
                    
                </View>
            </View>
        );
    }

    renderTransactionList() {
        return(
            <FlatList style={Styles.homeScroll} data={this.state.tests} 
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
                        this.setState({monthName: monthName});
                    }}/>

                {this.renderTransactionList()}

            </View>
        );
    }
}