import React, { useState, Component } from 'react';
import { ScrollView, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/buttons';
import { IconButton, Colors } from 'react-native-paper';
import { getNumeric } from '../utils/numberUtil';
import { globalStyles } from '../styles/global';
import Accordion from '../shared/accordion';

export default function Shares ({navigation}) {

    const { setAppStore, appStore } = navigation.state.params;
    const [ accounts, setAccounts ] = useState(appStore.shares.accounts);

    const getAccountsWithNewPerUnit = (key, perUnit) => {
        const currentAccounts = accounts;
        currentAccounts[key - 1].perUnit = perUnit;
        return currentAccounts;
    }

    const getAccountsWithNewNoAccounts = (key, noUnits) => {
        const currentAccounts = accounts;
        currentAccounts[key -1].noUnits = noUnits;
        return currentAccounts;
    }

    const confirmation = () =>
    Alert.alert(
      "Reset Shares",
      "Delete all accounts in shares?",
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
                perUnit: '',
                noUnit: '',
                },
            ]
            ); setAppStore({ 
                ...appStore, 
                shares: { 
                    accounts: [
                        {
                            key: 1,
                            perUnit: '',
                            noUnit: '',
                            },
                        ]
                 },
                results: {
                    ...appStore.results,
                    shares: {
                        net: 0, 
                        zakat: 0
                    }
                }
            })}}
      ],
      { cancelable: false }
    );

    const sharesForm = (key, index) => {
        return(
        <View>
            <Formik
                initialValues= {{ 
                    [`${key}_perUnit`]: accounts[index].perUnit === undefined? '': accounts[index].perUnit, 
                    [`${key}_noUnits`]: accounts[index].noUnits === undefined? '': accounts[index].noUnits, 
                }}
            >
            {props => (
                <View>
                    <Text style={globalStyles.inputCaptionAccordion}>Market Value Per Unit: </Text>
                    <TextInput
                        clearTextOnFocus
                        onChangeText={props.handleChange('perUnit')}
                        name = {`${key}_perUnit`}
                        value = {accounts[index].perUnit}
                        style={globalStyles.input}
                        placeholder='Enter market value per unit'
                        placeholderTextColor={Colors.grey800}
                        keyboardType= 'numeric'
                        onChange={(value) => setAccounts(getAccountsWithNewPerUnit(key, value.nativeEvent.text))}
                    />
                    <Text style={globalStyles.inputCaptionAccordion}>No. of units: </Text>
                    <TextInput
                        clearTextOnFocus
                        onChangeText={props.handleChange('noUnits')}
                        name = {`${key}_noUnits`}
                        value = {accounts[index].noUnits}
                        onChange={(value) => setAccounts(getAccountsWithNewNoAccounts(key, value.nativeEvent.text))}
                        style={globalStyles.input}
                        placeholder='Enter no. of units'
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
        return ('Shares ' + element.key)
    }

    const getTotalShares = (accounts) => {
        let total = 0;
        accounts.map(account => {
            total = total + (getNumeric(account.perUnit) * getNumeric(account.noUnits));
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
        <ScrollView>
            {accounts.map((account,index) => 
            <Accordion 
            remove={true} 
            doRemove={() => doRemove(index)} 
            title={accordionTitle(account)} 
            height={200} 
            form= {sharesForm(account.key, index)} 
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
                    shares: { accounts },
                    results: {
                        ...appStore.results,
                        shares: {
                            net: getTotalShares(accounts), 
                            zakat: (getTotalShares(accounts)/100 * 2.5).toFixed(2)
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
                        perUnit: '', 
                        noUnit: ''
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