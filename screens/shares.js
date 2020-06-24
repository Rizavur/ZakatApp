import React, { useState, Component } from 'react';
import { ScrollView, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/buttons';
import { IconButton, Colors, List } from 'react-native-paper';
import { getNumeric } from '../utils/numberUtil';
import { globalStyles } from '../styles/global';
import Accordion from '../shared/accordion';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
  } from 'react-native-material-textfield';
import Modal from 'react-native-modal';
import {setVisibleCallback} from '../App';


export default function Shares ({navigation}) {

    const { setAppStore, appStore } = navigation.state.params;
    const [ accounts, setAccounts ] = useState(appStore.shares.accounts);
    const [ visible, setVisible ] = useState(false);

    setVisibleCallback['Shares'] = setVisible;

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
                <View style={{paddingTop:15, paddingHorizontal: 10}}>
                    <FilledTextField
                        prefix = '$'
                        baseColor = 'black'
                        tintColor = 'blue'
                        keyboardType= 'numeric'
                        label = 'Market Value Per Unit'
                        name = {`${key}_perUnit`}
                        value = {accounts[index].perUnit}
                        onChangeText={props.handleChange('perUnit')}
                        inputContainerStyle = {{backgroundColor: '#6db2e3'}}
                        onChange={(value) => setAccounts(getAccountsWithNewPerUnit(key, value.nativeEvent.text))}
                    />
                    <FilledTextField
                        prefix = '$'
                        baseColor = 'black'
                        tintColor = 'blue'
                        keyboardType= 'numeric'
                        label = 'Number of Units'
                        name = {`${key}_noUnits`}
                        value = {accounts[index].noUnits}
                        onChangeText={props.handleChange('noUnits')}
                        inputContainerStyle = {{backgroundColor: '#6db2e3'}}
                        onChange={(value) => setAccounts(getAccountsWithNewNoAccounts(key, value.nativeEvent.text))}
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
        <View>  
                <Modal
                isVisible={visible}
                animationType="slide"
                backgroundColor={Colors.grey900}
                style={{
                    marginVertical: 50,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                }}
                >
                <View style={{ flex: 1, padding: 20}}>
                    <Text style={globalStyles.modalHeader}>Zakat On Shares</Text>
                    <ScrollView style={{marginTop: 10, paddingRight: 13, paddingLeft: 13}}>
                        <Text style={{...globalStyles.modalInfoHeader}}>One Type of Shares</Text>
                                <Text style={{...globalStyles.modalInfoContent}}>If the shareholder only owns one type of shares, Zakat on Shares is calculated by taking 2.5% of the market value of the shares when Haul and Nisab are reached.</Text>
                        <Text style={{...globalStyles.modalInfoHeader, marginTop: 10}}>Multiple Types of Shares</Text>
                            <Text style={{...globalStyles.modalInfoContent}}>If the shareholder owns more than one type of shares, the calculation and payment of the Zakat on Shares is done at the end of the Financial Year (ie. 31 Dec) by taking 2.5% of the market values of all the shares at the end of the year.</Text>
                    </ScrollView>
                    <IconButton
                        icon="close"
                        color='red'
                        size={25}
                        style = {{position: 'absolute', top: 7, right: 7}}
                        onPress={() => setVisible(false)}
                    />
                </View>
                </Modal>
            </View>
        <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <ScrollView>
            {accounts.map((account,index) => 
            <Accordion 
            remove={true} 
            doRemove={() => doRemove(index)} 
            title={accordionTitle(account)} 
            height={150} 
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