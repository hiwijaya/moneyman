import {createStackNavigator, createAppContainer} from 'react-navigation';
import Splash from '../splash';
import Signin from '../signin';
import Home from '../home';
import Charts from '../charts';
import Account from '../account';
import Categories from '../categories';
import AddCategory from '../add-category';
import AddTransaction from '../add-transaction';
import TransactionDetail from '../transaction-detail';


const Router = createStackNavigator({
    splash: {
        screen: Splash,
        navigationOptions: {
            title: 'Moneyman',
            header: null
        }
    },
    signin: {
        screen: Signin,
        navigationOptions: {
            title: 'Moneyman',
            header: null
        }
    },
    home: {
        screen: Home,
        navigationOptions: {
            title: 'Home',
            header: null
        }
    },
    charts: {
        screen: Charts,
        navigationOptions: {
            title: 'Chart',
            header: null
        }
    },
    account: {
        screen: Account,
        navigationOptions: {
            title: 'Account',
            header: null
        }
    },
    categories: {
        screen: Categories,
        navigationOptions: {
            title: 'Categories',
            header: null
        }
    },
    addCategory: {
        screen: AddCategory,
        navigationOptions: {
            title: 'Add Category',
            header: null
        }
    },
    addTransaction: {
        screen: AddTransaction,
        navigationOptions: {
            title: 'Add Transaction',
            header: null
        }
    },
    transactionDetail: {
        screen: TransactionDetail,
        navigationOptions: {
            title: 'Details',
            header: null
        }
    },

});
export default createAppContainer(Router);
