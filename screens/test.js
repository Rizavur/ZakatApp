import React, { useState, Component } from 'react';
import { ScrollView, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FlatButton from '../shared/buttons';
import { IconButton, Colors } from 'react-native-paper';
import { getNumeric } from '../utils/numberUtil';
import { globalStyles } from '../styles/global';
import Accordion from '../shared/accordion';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
  } from 'react-native-material-textfield';
export default function Test ({navigation}) {

    const { setAppStore, appStore } = navigation.state.params;
    const [ accounts, setAccounts ] = useState(appStore.savings.accounts);

    const [visible, setVisible] = useState(false);

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
                <View style={{paddingTop:15, paddingHorizontal: 10}}>
                    <FilledTextField
                        prefix = '$'
                        baseColor = 'black'
                        tintColor = 'blue'
                        keyboardType= 'numeric'
                        label = 'Lowest Amount'
                        name = {`${key}_lowestAmt`}
                        value = {accounts[index].lowestAmt}
                        onChangeText={props.handleChange('lowestAmt')}
                        inputContainerStyle = {{backgroundColor: '#6db2e3'}}
                        onChange={(value) => setAccounts(getAccountsWithNewLowestAmt(key, value.nativeEvent.text))}
                    />
                    <FilledTextField
                        prefix = '$'
                        baseColor = 'black'
                        tintColor = 'blue'
                        keyboardType= 'numeric'
                        label = 'Interest'
                        name = {`${key}_interest`}
                        value = {accounts[index].interest}
                        onChangeText={props.handleChange('interest')}
                        inputContainerStyle = {{backgroundColor: '#6db2e3'}}
                        onChange={(value) => setAccounts(getAccountsWithNewInterest(key, value.nativeEvent.text))}
                        
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

    const confirmation = () =>
    Alert.alert(
      "Reset Savings",
      "Delete all accounts in savings?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress:  () =>
        {setAccounts([
            {
                key: 1,
                lowestAmt: '',
                interest: ''
            },
            ]
            ); setAppStore({ 
                ...appStore, 
                savings: { 
                    accounts: [
                        {   key: 1,
                            lowestAmt: '',
                            interest: ''
                            },
                        ]
                 },
                results: {
                    ...appStore.results,
                    savings: {
                        net: 0, 
                        zakat: 0
                    }
                }
            })}}
      ],
      { cancelable: false }
    );

    return(
        <View style = {globalStyles.container}>
        <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <ScrollView >
                {accounts.map((account,index) => 
                <Accordion 
                remove={true} 
                doRemove={() => doRemove(index)} 
                title={accordionTitle(account)} 
                height={150} 
                form= {savingsForm(account.key, index)} 
                />
                )}
            </ScrollView>
        </TouchableWithoutFeedback>
            <IconButton
                icon="check"
                color={Colors.blueA200}
                size={40}
                style = {{backgroundColor: 'black', position: 'absolute', bottom: 10, right: 10}}
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
                style = {{backgroundColor: 'black', position: 'absolute', bottom: 170, right: 10}}
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
            
            <IconButton
                icon="delete-outline"
                color={Colors.blueA200}
                size={40}
                style = {{backgroundColor: 'black', position: 'absolute', bottom: 90, right: 10}}
                onPress={confirmation}
            />
        </View>
        )
    }