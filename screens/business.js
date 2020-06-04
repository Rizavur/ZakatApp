import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../styles/global';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import SmallScreen from '../BusinessScreens/SmallScreen'
import MedLargeScreen from '../BusinessScreens/MedLargeScreen'

const Tab = createMaterialTopTabNavigator();


export default function Business ({navigation}) {
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Small Business" component={SmallScreen} initialParams={ navigation } />
                <Tab.Screen name="Medium/Large Business" component={MedLargeScreen} initialParams={ navigation } />
            </Tab.Navigator>
        </NavigationContainer>
    )}