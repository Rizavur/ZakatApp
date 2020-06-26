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
            headerStyle: { backgroundColor: '#d4ffd5'},
          }),
    },
    Test: {
        screen: Test,
        navigationOptions: (params) => ({
            headerTitleStyle: styles.header,
            headerStyle: { backgroundColor: '#d4ffd5'},
            headerTintColor: 'white',
            headerRight: () => (
                <IconButton
                  icon='information-outline'
                  onPress={() => console.log(params)}
                  title="Info"
                  color="black"
                />
              ),
        }),
    },
    Savings: {
        screen: Savings,
        navigationOptions: ({navigation}) => ({
            headerTitleStyle: styles.header,
            headerStyle: { backgroundColor: '#d4ffd5'},
            headerTintColor: 'black',
            headerRight: () => (
                <IconButton
                  icon='information-outline'
                  onPress={() => setVisibleCallback['Savings'](true)}
                  title="Info"
                  color="black"
                />
              ),
        }),
    },
    Business: {
        screen: Business,
        navigationOptions: () => ({
            headerTintColor: 'black',
            headerTitleStyle: styles.header,
            headerStyle: { backgroundColor: '#d4ffd5'},
            headerRight: () => (
                <IconButton
                  icon='information-outline'
                  onPress={() => setVisibleCallback['Business'](true)}
                  title="Info"
                  color="black"
                />
              ),
        }),
    },
    OtherAssets: {
        screen: OtherAssets,
        navigationOptions: () => ({
            title: 'Other Assets',
            headerTintColor: 'black',
            headerTitleStyle: styles.header,
            headerStyle: { backgroundColor: '#d4ffd5'},
            headerRight: () => (
                <IconButton
                  icon='information-outline'
                  onPress={() => setVisibleCallback['OtherAssets'](true)}
                  title="Info"
                  color="black"
                />
              ),
        }),
    },
    Shares: {
        screen: Shares,
        navigationOptions: () => ({
            headerTitleStyle: styles.header,
            headerTintColor: 'black',
            headerStyle: { backgroundColor: '#d4ffd5'},
            headerRight: () => (
                <IconButton
                  icon='information-outline'
                  onPress={() => setVisibleCallback['Shares'](true)}
                  title="Info"
                  color="black"
                />
              ),
        }),
    },
    Insurance: {
        screen: Insurance,
        navigationOptions: () => ({
            headerTitleStyle: styles.header,
            headerTintColor: 'black',
            headerStyle: { backgroundColor: Colors.blue900},
            headerRight: () => (
                <IconButton
                  icon='information-outline'
                  onPress={() => alert('This is a button!')}
                  title="Info"
                  color="black"
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