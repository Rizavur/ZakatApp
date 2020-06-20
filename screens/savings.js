import React, { useState, Component } from 'react';
import { ScrollView, View, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FlatButton from '../shared/buttons';
import { IconButton, Colors } from 'react-native-paper';
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

    const savingsForm = (key, index) => {
        return(
        <View>
            <Formik
                initialValues= {{ 
                    [`${key}_lowestAmt`]: accounts[index].lowestAmt === undefined? '': accounts[index].lowestAmt, 
                    [`${key}_interest`]: accounts[index].interest === undefined? '': accounts[index].interest, 
                }}
            >
            {props => (
                <View>
                    <Text style={globalStyles.inputCaptionAccordion}>Lowest amount in year: </Text>
                    <TextInput
                        clearTextOnFocus
                        onChangeText={props.handleChange('lowestAmt')}
                        name = {`${key}_lowestAmt`}
                        value = {accounts[index].lowestAmt}
                        style={globalStyles.input}
                        placeholder='Enter lowest amount'
                        placeholderTextColor={Colors.grey800}
                        keyboardType= 'numeric'
                        onChange={(value) => setAccounts(getAccountsWithNewLowestAmt(key, value.nativeEvent.text))}
                    />
                    <Text style={globalStyles.inputCaptionAccordion}>Interest earned: </Text>
                    <TextInput
                        clearTextOnFocus
                        onChangeText={props.handleChange('interest')}
                        name = {`${key}_interest`}
                        value = {accounts[index].interest}
                        onChange={(value) => setAccounts(getAccountsWithNewInterest(key, value.nativeEvent.text))}
                        style={globalStyles.input}
                        placeholder='Enter interest earned'
                        placeholderTextColor={Colors.grey800}
                        keyboardType= 'numeric'
                    />
                </View>
                )}
            </Formik>
        </View>
        )
    }

    const accordionKey = () => {
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
        return (total);
    }

    const doRemove = (index) => {
        if (accounts && accounts.length>1){
            const newAccounts = accounts;
            newAccounts.splice(index, 1);
            setAccounts([...newAccounts]);
        }
    }

    return(
        <View style = {globalStyles.container}>
        <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <ScrollView >
                {accounts.map((account,index) => 
                <Accordion 
                remove={true} 
                doRemove={() => doRemove(index)} 
                title={accordionTitle(account)} 
                height={200} 
                form= {savingsForm(account.key, index)} 
                />
                )}
            </ScrollView>
        </TouchableWithoutFeedback>
            <IconButton
                icon="check"
                color={Colors.blueA200}
                size={40}
                style = {{backgroundColor: 'black', position: 'absolute', bottom: 90, right: 10}}
                onPress={() => {
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
            />

            <IconButton
                icon="plus"
                color={Colors.blueA200}
                size={40}
                style = {{backgroundColor: 'black', position: 'absolute', bottom: 10, right: 10}}
                onPress={() => {
                setAccounts((accounts.length > 0) 
                    ? [...accounts, {
                        key: accordionKey(), 
                        interest: '', 
                        lowestAmt: ''
                    }]
                    : []
                )}}   
            />
        </View>
        )
    }