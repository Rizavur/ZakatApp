import {StyleSheet} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import Savings from '../screens/savings';
import Business from '../screens/business';
import Gold from '../screens/gold';
import Shares from '../screens/shares';
import Insurance from '../screens/insurance';

const screens = {
    Home: {
        screen: Home,
        navigationOptions: () => ({
            title: 'Zakat Calculator',
            headerTitleStyle: styles.headerTitleStyle,
          }),
    },
    Savings: {
        screen: Savings
    },
    Business: {
        screen: Business
    },
    Gold: {
        screen: Gold
    },
    Shares: {
        screen: Shares
    },
    Insurance: {
        screen: Insurance
    }
}

const styles = StyleSheet.create({
    headerTitleStyle: {
        flex: 1,
        fontFamily: 'yellowtail',
        fontSize: 30,

    }
})
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);