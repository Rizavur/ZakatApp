import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../styles/global';
import { Colors } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import SmallScreen from '../BusinessScreens/SmallScreen'
import MedLargeScreen from '../BusinessScreens/MedLargeScreen'
import { createAppContainer } from 'react-navigation';
import { HeaderBackground } from 'react-navigation-stack';

const Tab = createMaterialTopTabNavigator();

const AppContainer = NavigationContainer;

export default function Business ({navigation}) {
    return(
        <AppContainer>
            <Tab.Navigator tabBarOptions={{
            activeTintColor: '#ffffff',
            inactiveTintColor: '#7FC0C4',
            style: {
                backgroundColor: Colors.blueA700,
            },
            }}>
                <Tab.Screen name="Small Business" component={SmallScreen} initialParams={ navigation } />
                <Tab.Screen name="Medium/Large Business" component={MedLargeScreen} initialParams={ navigation } />
            </Tab.Navigator>
        </AppContainer>
    )}