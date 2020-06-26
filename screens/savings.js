import React, { useState, Component, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Alert, TouchableOpacity } from 'react-native';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
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

export default function Test ({navigation}) {

    const { setAppStore, appStore } = navigation.state.params;
    const [ accounts, setAccounts ] = useState(appStore.savings.accounts);
    const [ visible, setVisible ] = useState(false);
    const [toggleRemove, setToggleRemove] = useState(false);

    
    setVisibleCallback['Savings'] = setVisible;

    useEffect(() => {
        setVisibleCallback(setVisible);
      }, []);

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
    console.log(visible);
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
                    <Text style={globalStyles.modalHeader}>Zakat On Savings</Text>
                    <ScrollView style={{marginTop: 10, paddingRight: 13, paddingLeft: 13}}>
                        <Text style={{...globalStyles.modalInfoHeader}}>Step 1</Text>
                                <Text style={{...globalStyles.modalInfoContent}}>Find out the Nisab value (minimum value required for Zakat).</Text>
                        <Text style={{...globalStyles.modalInfoHeader, marginTop: 10}}>Step 2</Text>
                            <Text style={{...globalStyles.modalInfoContent}}>Open your bank account book and only look at your savings balance throughout the year. It does not matter if you deposit or withdraw money throughout the year, because Zakat on Savings is based on the balance and not on the deposits or withdrawals made.</Text>
                        <Text style={{...globalStyles.modalInfoHeader, marginTop: 10}}>Step 3</Text>
                            <Text style={{...globalStyles.modalInfoContent}}>Look at your balance throughout the past 1 Islamic year (1 Haul) which is about 355 days. If in the past year none of your balances have dropped below the Nisab value, you are eligible for Zakat.</Text>
                        <Text style={{...globalStyles.modalInfoHeader, marginTop: 10}}>Step 4</Text>
                            <Text style={{...globalStyles.modalInfoContent}}>Identify the lowest balance in the year. This could occur in any period throughout the year.</Text>
                        <Text style={{...globalStyles.modalInfoHeader, marginTop: 10}}>Step 5</Text>
                            <Text style={{...globalStyles.modalInfoContent}}>Zakat on Savings: (LowestBalance($) - InterestEarned($)) X 2.5%</Text>
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
        <ScrollView >
             <View style={{flex:1, flexDirection: 'row', alignSelf: 'flex-end'}}>
                <TouchableOpacity onPress ={() => setToggleRemove(!toggleRemove)}>
                    <Text style={{color: 'white', borderRadius: 8, padding: 8, margin: 15, marginBottom: 0, textAlign: 'center'}}>Edit</Text>
                </TouchableOpacity>
            </View>

                {accounts.map((account,index) => 
                <Accordion 
                remove={toggleRemove} 
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