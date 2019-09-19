import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    Alert,
    TouchableOpacity, 
    ToastAndroid,
} from 'react-native';
import Cicon from './comp/cicon';
import {Styles} from './lib/styles';
import Env from './lib/env';


export default class TransactionDetail extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            title: null,    // category title
            icon: null,
            color: null,
            type: null,
            amount: null,
            date: null,
            memo: null
        };
        
    }

    componentDidMount() {

        let transactionId = this.props.navigation.getParam('transactionId');

        this.transaction = Env.getTransaction(transactionId);
        this.setTransaction(this.transaction);
        
    }

    setTransaction(transaction){
        let category = Env.getCategories(transaction.categoryId, null);

        this.setState({
            title: category.title,
            icon: category.icon,
            color: category.color,
            type: transaction.type,
            amount: Env.formatCurrency(transaction.amount),
            date: Env.formatFullDate(transaction.date),
            memo: transaction.memo,
        });
    }

    deleteTransaction(id){
        Alert.alert(
            'Delete Transaction',
            'Are you sure want to delete this one?',
            [{
                    text: 'NO',
                },
                {
                    text: 'YES',
                    onPress: () => {
                        Env.deleteTransaction(id);
                        Env.writeStorage(Env.key.BACKUP_SYNC, 'N');
                        
                        ToastAndroid.show('Transaction deleted', ToastAndroid.SHORT);
                        this.props.navigation.state.params.onNavigateBack(null);
                        this.props.navigation.goBack();
                    }
                }
            ]
        );
    }

     onNavigateBack = (params) => {
         this.setTransaction(params);
     }


    renderActionBar() {
        return(
            <View style={Styles.actionbarBox}>
                <TouchableOpacity style={Styles.backButton} 
                    onPress={() => { 
                        this.props.navigation.state.params.onNavigateBack(null);
                        this.props.navigation.goBack();
                    }}>
                    <Image style={Styles.icon18} source={require('./asset/icon-back.png')}/>
                </TouchableOpacity>
                <Text style={Styles.actionbarTitle}>Details</Text>
                <TouchableOpacity style={Styles.backButton} 
                    onPress={() => this.deleteTransaction(this.transaction.id) }>
                    <Image style={Styles.icon18} source={require('./asset/icon-delete.png')}/>
                </TouchableOpacity>
            </View>
        );
    }

    renderEditButton() {
        return(
            <TouchableOpacity style={Styles.detailEditButton} 
                onPress={() => {
                    this.props.navigation.navigate('addTransaction', {
                        transaction: this.transaction,
                        onNavigateBack: this.onNavigateBack
                    });
                }}>
                <Image style={Styles.icon14} 
                    source={require('./asset/icon-edit.png')}/>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={Styles.sceneBox}>
                {this.renderActionBar()}
                
                <View style={Styles.detailBox}>
                    <View style={Styles.detailCategoryBox}>
                        <Cicon style={{marginRight: 40}}
                            icon={this.state.icon} color={this.state.color}/>
                        <Text style={Styles.detailTitle}>{this.state.title}</Text>
                    </View>

                    <View style={Styles.detailItemBox}>
                        <Text style={Styles.detailItem}>Type</Text>
                        <Text style={Styles.detailValue}>{this.state.type}</Text>
                    </View>
                    <View style={Styles.detailItemBox}>
                        <Text style={Styles.detailItem}>Amount</Text>
                        <Text style={Styles.detailValue}>{this.state.amount}</Text>
                    </View>
                    <View style={Styles.detailItemBox}>
                        <Text style={Styles.detailItem}>Date</Text>
                        <Text style={Styles.detailValue}>{this.state.date}</Text>
                    </View>
                    <View style={Styles.detailItemBox}>
                        <Text style={Styles.detailItem}>Memo</Text>
                        <Text style={Styles.detailValue}>{this.state.memo}</Text>
                    </View>
                </View>

                {this.renderEditButton()}
                
            </View>
        );
    }
}
