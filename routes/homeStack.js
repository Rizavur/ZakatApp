import * as React from 'react';
import { StyleSheet, Button } from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createStackNavigator, HeaderBarItem } from 'react-navigation-stack';
import { createAppContainer, NavigationEvents, Text, Modal, Alert } from 'react-navigation';
import Home from '../screens/home';
import Savings from '../screens/savings';
import Business from '../screens/business';
import OtherAssets from '../screens/otherAssets';
import Shares from '../screens/shares';
import Insurance from '../screens/insurance';
import Test from '../screens/test';
import { IconButton, Colors, Dialog } from 'react-native-paper';
import savingsInfo from '../information/savingsInfo';
import {setVisibleCallback} from '../App';

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
            headerStyle: { backgroundColor: '#a6b1e1'},
          }),
    },
    Test: {
        screen: Test,
        navigationOptions: (params) => ({
            headerTitleStyle: styles.header,
            headerStyle: { backgroundColor: '#a6b1e1'},
            headerTintColor: 'blue',
            headerRight: () => (
                <IconButton
                  icon='information-outline'
                  onPress={() => console.log(params)}
                  title="Info"
                  color="blue"
                />
              ),
        }),
    },
    Savings: {
        screen: Savings,
        navigationOptions: ({navigation}) => ({
            headerTitleStyle: styles.header,
            headerStyle: { backgroundColor: '#a6b1e1'},
            headerTintColor: 'blue',
            headerRight: () => (
                <IconButton
                  icon='information-outline'
                  onPress={() => setVisibleCallback['Savings'](true)}
                  title="Info"
                  color="blue"
                />
              ),
        }),
    },
    Business: {
        screen: Business,
        navigationOptions: () => ({
            headerTintColor: 'blue',
            headerTitleStyle: styles.header,
            headerStyle: { backgroundColor: '#a6b1e1'},
            headerRight: () => (
                <IconButton
                  icon='information-outline'
                  onPress={() => setVisibleCallback['Business'](true)}
                  title="Info"
                  color="blue"
                />
              ),
        }),
    },
    OtherAssets: {
        screen: OtherAssets,
        navigationOptions: () => ({
            title: 'Other Assets',
            headerTintColor: 'blue',
            headerTitleStyle: styles.header,
            headerStyle: { backgroundColor: '#a6b1e1'},
            headerRight: () => (
                <IconButton
                  icon='information-outline'
                  onPress={() => setVisibleCallback['OtherAssets'](true)}
                  title="Info"
                  color="blue"
                />
              ),
        }),
    },
    Shares: {
        screen: Shares,
        navigationOptions: () => ({
            headerTitleStyle: styles.header,
            headerTintColor: 'blue',
            headerStyle: { backgroundColor: '#a6b1e1'},
            headerRight: () => (
                <IconButton
                  icon='information-outline'
                  onPress={() => setVisibleCallback['Shares'](true)}
                  title="Info"
                  color="blue"
                />
              ),
        }),
    },
    Insurance: {
        screen: Insurance,
        navigationOptions: () => ({
            headerTitleStyle: styles.header,
            headerTintColor: 'blue',
            headerStyle: { backgroundColor: Colors.blue900},
            headerRight: () => (
                <IconButton
                  icon='information-outline'
                  onPress={() => alert('This is a button!')}
                  title="Info"
                  color="blue"
                />
              ),
        }),
    },
}

const styles = StyleSheet.create({
    headerTitleStyle: {
        flex: 1,
        fontFamily: 'yellowtail',
        fontSize: 30,
        alignSelf: 'center',
        color: 'black'
    },
    header: {
        color: 'black',
    }
})

const Stack = createStackNavigator(screens);

export default createAppContainer(Stack);