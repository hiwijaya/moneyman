import {createStackNavigator, createAppContainer} from 'react-navigation';
import Splash from '../splash';


const Router = createStackNavigator({
    splash: {
        screen: Splash,
        navigationOptions: {
            title: 'Moneyman',
            header: null
        }
    }
});
export default createAppContainer(Router);
