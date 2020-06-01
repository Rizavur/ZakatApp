import React, { useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import {globalStyles}  from '../styles/global';
import FlatButton from '../shared/buttons'

export default function Home ({navigation}) {

    const [savings, setSavings] = useState(0);

    const pressHandler = ({ text, callback }) => {
        navigation.navigate(text, { callback });
    }

    return(
        <View>
            <FlatButton onPress={() => pressHandler({text: 'Savings', callback: setSavings})} text='Savings' />
            <FlatButton onPress={() => pressHandler({text: 'Business'})} text='Business' />
            <FlatButton onPress={() => pressHandler({text: 'Gold'})} text='Gold' />
            <FlatButton onPress={() => pressHandler({text: 'Shares'})} text='Shares' />
            <FlatButton onPress={() => pressHandler({text: 'Insurance'})} text='Insurance' />
            <Text style={globalStyles.ZakatText}>Total Zakat: $ {savings}</Text>
        </View>
    )
    }