import * as React from 'react';
import { StyleSheet } from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createStackNavigator, HeaderBarItem } from 'react-navigation-stack';
import { Colors } from 'react-native-paper';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import Savings from '../screens/savings';
import Business from '../screens/business';
import OtherAssets from '../screens/otherAssets';
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
            headerStyle: { backgroundColor: '#085e72'},
          }),
    },
    Test: {
        screen: Test
    },
    Savings: {
        screen: Savings,
        navigationOptions: () => ({
            headerTitleStyle: styles.header,
            headerStyle: { backgroundColor: Colors.blue900},
            
        }),
    },
    Business: {
        screen: Business,
        navigationOptions: () => ({
            headerTitleStyle: styles.header,
            headerStyle: { backgroundColor: Colors.blue900},
        }),
    },
    OtherAssets: {
        screen: OtherAssets,
        navigationOptions: () => ({
            title: 'Other Assets',
            headerTitleStyle: styles.header,
            headerStyle: { backgroundColor: Colors.blue900},
        }),
    },
    Shares: {
        screen: Shares,
        navigationOptions: () => ({
            headerTitleStyle: styles.header,
            headerStyle: { backgroundColor: Colors.blue900},
        }),
    },
    Insurance: {
        screen: Insurance,
        navigationOptions: () => ({
            headerTitleStyle: styles.header,
            headerStyle: { backgroundColor: Colors.blue900},
        }),
    },
}

const styles = StyleSheet.create({
    headerTitleStyle: {
        flex: 1,
        fontFamily: 'yellowtail',
        fontSize: 30,
        alignSelf: 'center',
        color: 'white'
    },
    header: {
        color: 'white',
    }
})

const Stack = createStackNavigator(screens);

export default createAppContainer(Stack);