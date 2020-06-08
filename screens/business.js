import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../styles/global';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import SmallScreen from '../BusinessScreens/SmallScreen'
import MedLargeScreen from '../BusinessScreens/MedLargeScreen'
import { createAppContainer } from 'react-navigation';

const Tab = createMaterialTopTabNavigator();

const AppContainer = NavigationContainer;

export default function Business ({navigation}) {
    return(
        <AppContainer>
            <Tab.Navigator>
                <Tab.Screen name="Small Business" component={SmallScreen} initialParams={ navigation } />
                <Tab.Screen name="Medium/Large Business" component={MedLargeScreen} initialParams={ navigation } />
            </Tab.Navigator>
        </AppContainer>
    )}