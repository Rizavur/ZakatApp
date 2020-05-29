import React, { useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import {globalStyles}  from '../styles/global';
import FlatButton from '../shared/buttons'

export default function Home ({navigation}) {
    // const [view, setViews] = useState([
    //     {title: 'Savings', id: 1},
    //     {title: 'Business', id: 2},
    //     {title: 'Gold', id: 3},
    //     {title: 'Shares', id: 4},
    //     {title: 'Insurance', id: 5},
    // ])

    const pressHandler = (event) => {
        navigation.navigate(event.text);
    }

    return(
        <View>
            <FlatButton onPress={() => pressHandler({text: 'Savings'})} text='Savings' />
            <FlatButton onPress={() => pressHandler({text: 'Business'})} text='Business' />
            <FlatButton onPress={() => pressHandler({text: 'Gold'})} text='Gold' />
            <FlatButton onPress={() => pressHandler({text: 'Shares'})} text='Shares' />
            <FlatButton onPress={() => pressHandler({text: 'Insurance'})} text='Insurance' />
            <Text style={globalStyles.ZakatText}>Zakat: </Text>
        </View>
    )
    }