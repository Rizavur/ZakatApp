import React, { useState, Component } from 'react';
import { ScrollView, View, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/buttons';

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
        <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <ScrollView style = {globalStyles.container}>
        <FlatButton 
        text='Add' 
        onPress={() => {
            setAccounts((accounts.length > 0) 
                ? [...accounts, {
                    key: accordionKey(), 
                    perUnit: '', 
                    noUnit: ''
                }]
                : []
            )}
        }
        />
            {accounts.map((account,index) => 
            <Accordion 
            remove={true} 
            doRemove={() => doRemove(index)} 
            title={accordionTitle(account)} 
            height={200} 
            form= {sharesForm(account.key, index)} 
            />
            )}
            <FlatButton onPress={() => {
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
                text='Calculate' 
            />
        </ScrollView>
        </TouchableWithoutFeedback>
        )
    }

// import React, { useState } from 'react';
// import { ScrollView ,View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
// import { Formik } from 'formik';
// import FlatButton from '../shared/buttons';

// import { globalStyles } from '../styles/global';

// export default function Shares ({navigation}) {

//     const { setAppStore, appStore } = navigation.state.params;

//     const [perUnit, setPerUnit] = useState(appStore.shares.perUnit);
//     const [noUnit, setNoUnit] = useState(appStore.shares.noUnit);

//     const sharesNet = (perUnit * noUnit).toFixed(2);
//     const sharesZakat = ((sharesNet)/100 *2.5).toFixed(2);
    
//     return(
//     <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
//         <ScrollView style = {globalStyles.container}>
//             <Formik
//             initialValues= {{perUnit: perUnit, noUnit: noUnit}}
//             >
//             {props => (
//                 <View style = {globalStyles.container}>
//                         <Text style={globalStyles.savingsHead}>Share 1</Text>
//                         <Text style={globalStyles.inputCaption}>Market value per unit share of:</Text>
//                         <TextInput
//                         clearTextOnFocus
//                         onChangeText={props.handleChange('perUnit')}
//                         value = {perUnit}
//                         onChange={(value) => setPerUnit(value.nativeEvent.text)}
//                         style={globalStyles.input}
//                         placeholder='Market value per unit'
//                         keyboardType= 'numeric'
//                         />
//                         <Text style={globalStyles.inputCaption}>Enter No of units of shares:</Text>
//                         <TextInput
//                         clearTextOnFocus
//                         onChangeText={props.handleChange('noUnit')}
//                         value = {noUnit}
//                         onChange={(value) => setNoUnit(value.nativeEvent.text)}
//                         style={globalStyles.input}
//                         placeholder='No of units of shares'
//                         keyboardType= 'numeric'
//                         />
                        
//                         <FlatButton onPress={() => {
//                             setAppStore(
//                                 { ...appStore, 
//                                 shares: {perUnit: (perUnit), noUnit: (noUnit)}, 
//                                 results: {...appStore.results, shares: {net: sharesNet ,zakat: sharesZakat}}
//                                 });
//                                 navigation.navigate('Home')}} 
//                                 text='Calculate' />
//                         <Text style={globalStyles.netAmt}>Net Shares Assets: ${sharesNet}</Text>
//                         <Text style={globalStyles.netAmt}>Shares Zakat: ${sharesZakat}</Text>
//                 </View>
//                 )}
//             </Formik>
//         </ScrollView>
//         </TouchableWithoutFeedback>
//     )}