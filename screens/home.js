import React, { useState } from 'react';
import { ScrollView, Text, Button, FlatList } from 'react-native';
import {globalStyles}  from '../styles/global';
import FlatButton from '../shared/buttons'

export default function Home ({navigation}) {
    const [appStore, setAppStore] = useState({
        savings: {
            lowestAmt: '',
            interest: '',
        },
        business: {
            small: {
                amountACA: {
                    cash: '',
                    bank: '',
                    stock: '',
                    debtors: '',
                    others: '',
                },
                amountLCL: {
                    creditors: '',
                    operatingExpenses: '',
                    others: '',
                },
                adjustmentsACA: {
                    donation: '',
                    personal: '',
                    others: '',
                },
                adjustmentsLCA: {
                    stock: '',
                    others: '',
                }},
        },
        gold: {
            weight: '',
        },
        shares: {
            perUnit: '',
            noUnit: '',
        },
        insurance: {
            surrender: '',
        }
    })

    console.log(appStore);

    const getNumeric = (stringVal) => {
        if (stringVal && stringVal !== ''){
            return parseInt(stringVal);
        }
        return 0;
    }

    const savingsNet = (getNumeric(appStore.savings.lowestAmt) - getNumeric(appStore.savings.interest)).toFixed(2);
    const savingsZakat = ((savingsNet)/100 * 2.5).toFixed(2);
    
    const goldNet = (getNumeric(appStore.gold.weight) * 80.24).toFixed(2);
    const goldZakat = ((goldNet)/100 *2.5).toFixed(2);
    
    const sharesNet = (getNumeric(appStore.shares.perUnit) * getNumeric(appStore.shares.noUnit)).toFixed(2);
    const sharesZakat = ((sharesNet)/100 *2.5).toFixed(2);

    const insuranceNet = (getNumeric(appStore.insurance.surrender)).toFixed(2);
    const insuranceZakat = ((insuranceNet)/100 * 2.5).toFixed(2);

    const Zakat = (getNumeric(savingsZakat) 
                  + getNumeric(goldZakat) 
                  + getNumeric(sharesZakat)
                  + getNumeric(insuranceZakat)).toFixed(2);

    const pressHandler = ({ text }) => {
        navigation.navigate(text, { appStore, setAppStore });
    }

    return(
        <ScrollView>
            <FlatButton onPress={() => pressHandler({text: 'Savings'})} text='Savings' />
            <Text style={globalStyles.homeText}>Savings Total: ${savingsNet}</Text>

            <FlatButton onPress={() => pressHandler({text: 'Business'})} text='Business' />
            <Text style={globalStyles.homeText}>Business Total: $</Text>

            <FlatButton onPress={() => pressHandler({text: 'Gold'})} text='Gold' />
            <Text style={globalStyles.homeText}>Gold Total: ${goldNet}</Text>

            <FlatButton onPress={() => pressHandler({text: 'Shares'})} text='Shares'/>
            <Text style={globalStyles.homeText}>Shares Total: ${sharesNet}</Text>

            <FlatButton onPress={() => pressHandler({text: 'Insurance'})} text='Insurance' />
            <Text style={globalStyles.homeText}>Insurance Total: ${insuranceNet}</Text>

            <Text style={globalStyles.ZakatText}>Total Zakat: $ {Zakat}</Text>
        </ScrollView>
    )
    }