import {createStackNavigator, createAppContainer} from 'react-navigation';
import Splash from '../splash';
import Signin from '../signin';
import Home from '../home';
import Account from '../account';
import Categories from '../categories';


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

});
export default createAppContainer(Router);
