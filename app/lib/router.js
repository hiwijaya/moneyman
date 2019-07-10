import {createStackNavigator, createAppContainer} from 'react-navigation';
import Splash from '../splash';
import Home from '../home';


const Router = createStackNavigator({
    splash: {
        screen: Splash,
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
    }
});
export default createAppContainer(Router);
