import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    Alert,
    ScrollView,
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
            monthLabel: 'Jul',
        }
    }

    onNavigateBack = (params) => {
        let transactions = Env.getTransactions();
        Alert.alert(transactions.length.toString());
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
    renderTransaction() {
        return(
            <View style={Styles.homeTransactionBox}>
                <View style={Styles.homeTransactionHeaderBox}>
                    <Text style={[Styles.homeTransactionHeaderText, {flex: 1}]}>
                        08/17 Sat
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[Styles.homeTransactionHeaderText, {marginRight: 10}]}>
                            Income: 13,000,000
                        </Text>
                        <Text style={Styles.homeTransactionHeaderText}>
                            Expenses: 2,300,000
                        </Text>
                    </View>
                </View>
                <View>
                    <View style={Styles.homeTransactionItemBox}>
                        <Cicon color={'#F19066'}
                            icon={require('./asset/categories/cat-food-burger.png')}/>
                        <Text style={{flex: 1, marginHorizontal: 10}}>Burger King</Text>
                        <Text style={{color: Colors.grey}}>- 49,000</Text>
                    </View>
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
                
                <ScrollView style={Styles.homeScroll}>
                    {this.renderResume()}
                    {this.renderTransaction()}
                </ScrollView>
            </View>
        );
    }
}