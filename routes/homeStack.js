import * as React from 'react';
import { StyleSheet } from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import Savings from '../screens/savings';
import Business from '../screens/business';
import Gold from '../screens/gold';
import Shares from '../screens/shares';
import Insurance from '../screens/insurance';
import Test from '../screens/test';

// const Stack = createStackNavigator();

// export default function HomeStack() {
//     return(
//         <Stack.Navigator>
//             <Stack.Screen name="Home" component={Home} />
//             <Stack.Screen name="Savings" component={Savings} />
//             <Stack.Screen name="Business" component={Business} />
//             <Stack.Screen name="Gold" component={Gold} />
//             <Stack.Screen name="Shares" component={Shares} />
//             <Stack.Screen name="Insurance" component={Insurance} />
//         </Stack.Navigator>
//     )
// }

const screens = {
    Home: {
        screen: Home,
        navigationOptions: () => ({
            title: 'Zakat Calculator',
            headerTitleStyle: styles.headerTitleStyle,
          }),
    },
    Test: {
        screen: Test
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
    },
}

const styles = StyleSheet.create({
    headerTitleStyle: {
        flex: 1,
        fontFamily: 'yellowtail',
        fontSize: 30,

    }
})

const Stack = createStackNavigator(screens);

export default createAppContainer(Stack);