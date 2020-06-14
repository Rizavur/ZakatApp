import React, { useState, Component } from 'react';
import { ScrollView, View, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/buttons';

import { getNumeric } from '../utils/numberUtil';

import { globalStyles } from '../styles/global';
import Accordion from '../shared/accordion';

export default function Test ({navigation}) {

    const { setAppStore, appStore } = navigation.state.params;
    const [ accounts, setAccounts ] = useState(appStore.savings.accounts);

    const getAccountsWithNewInterest = (key, interest) => {
        const currentAccounts = accounts;
        currentAccounts[key - 1].interest = interest;
        return currentAccounts;
    }

    const getAccountsWithNewLowestAmt = (key, lowestAmt) => {
        const currentAccounts = accounts;
        currentAccounts[key -1].lowestAmt = lowestAmt;
        return currentAccounts;
    }

    const savingsForm = (key) => {
        return(
        <View>
            <Formik
                initialValues= {{ 
                    [`${key}_lowestAmt`]: accounts[key - 1].lowestAmt, 
                    [`${key}_interest`]: accounts[key - 1].interest, 
                }}
            >
            {props => (
                <View>
                    <Text style={globalStyles.inputCaptionAccordion}>Lowest amount in year: </Text>
                    <TextInput
                        clearTextOnFocus
                        onChangeText={props.handleChange('lowestAmt')}
                        name = {`${key}_lowestAmt`}
                        value = {accounts[key - 1].lowestAmt}
                        style={globalStyles.input}
                        placeholder='Enter lowest amount'
                        keyboardType= 'numeric'
                        onChange={(value) => getAccountsWithNewLowestAmt(key, value.nativeEvent.text)}
                    />
                    <Text style={globalStyles.inputCaptionAccordion}>Interest earned: </Text>
                    <TextInput
                        clearTextOnFocus
                        onChangeText={props.handleChange('interest')}
                        value = {accounts[key - 1].interest}
                        onChange={(value) => setAccounts(getAccountsWithNewInterest(key, value.nativeEvent.text))}
                        style={globalStyles.input}
                        placeholder='Enter interest earned'
                        keyboardType= 'numeric'
                    />
                </View>
                )}
            </Formik>
        </View>
        )
    }

    const accordionKey = (accounts) => {
        return((accounts[accounts.length - 1].key) + 1)
    }

    const accordionTitle = (element) => {
        return ('Account ' + element.key)
    }

    const getTotalSavings = (accounts) => {
        let total = 0;
        accounts.map(account => {
            total = total + getNumeric(account.lowestAmt) - getNumeric(account.interest);
        });
        console.log(total);
        return (total);
    }

    return(
        <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <ScrollView style = {globalStyles.container}>
        <FlatButton 
        text='Add' 
        onPress={() => {
            setAccounts((accounts.length > 0) 
                ? [...accounts, {
                    key: accordionKey(accounts), 
                    interest: '', 
                    lowestAmt: ''
                }]
                : []
            )}
        }
        />
            {accounts.map(account => <Accordion title={accordionTitle(account)} form= {savingsForm(account.key)} />)}
            <FlatButton onPress={() => {
                setAppStore({ 
                    ...appStore, 
                    savings: { accounts },
                    results: {
                        ...appStore.results,
                        savings: {
                            net: getTotalSavings(accounts), 
                            zakat: (getTotalSavings(accounts)/100 * 2.5).toFixed(2)
                        }
                    }
                });
                navigation.navigate('Home')} } 
                text='Calculate' 
            />
        </ScrollView>
        </TouchableWithoutFeedback>
        )
    }