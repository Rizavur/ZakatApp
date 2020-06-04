import React, { useState } from 'react';
import { ScrollView ,View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { Formik } from 'formik';
import FlatButton from '../shared/buttons';

import { globalStyles } from '../styles/global';

export default function SmallScreen ({ route, navigation }) {
    const { setAppStore, appStore } = route.params.state.params;
    const [businessValue, setBusinessValue] = useState(appStore.business.small);
    const fields = {
        addCurrentAssets: [{
            text: 'Cash: ',
            placeholder: 'Cash in Hand',
            tag: 'cash',
            key: 1
        },
        {
            text: 'Bank Balance: ',
            placeholder: 'Bank Balance',
            tag: 'bank',
            key: 2
        },
        {
            text: 'Closing Stock: ',
            placeholder: 'Closing Stock',
            tag: 'stock',
            key: 3
        },
        {
            text: 'Trade Debtors: ',
            placeholder: 'Trade Debtors',
            tag: 'debtors',
            key: 4
        },
        {
            text: 'Others: ',
            placeholder: 'Others',
            tag:'others',
            key: 5
        }],

        lessCurrentLiabilities: [{
            text: 'Trade Creditors: ',
            placeholder: 'Trade Creditors',
            key: 6
        },
        {
            text: 'Accrued Operating Expenses: ',
            placeholder: 'Accrued Operating Expenses',
            key: 7
        },
        {
            text: 'Others: ',
            placeholder: 'Others',
            key: 8
        }]
    }


    const Adjustments = {
        addCurrentAssets: [
            {
                text: 'Donation in the last quarter',
                placeholder: 'Donation in the last quarter',
                key: 9
            },
            {
                text: 'Personal drawings',
                placeholder: 'Personal drawings',
                key: 10
            },
            {
                text: 'Others',
                placeholder: 'Others',
                key: 11
        }],
        
        LessCurrentAssets: [
            {
                text: 'Obsolete stock',
                placeholder: 'Obsolete stock',
                key: 12
            },
            {
                text: 'Others',
                placeholder: 'Others',
                key: 13
            }
        ]
    } 

   
    const AddCurrentAssets = (props) => {
        return fields.addCurrentAssets.map((element, key) => {
            return (
                <View>
                    <Text key={key + '_Text'} style={globalStyles.inputCaption2}>{element.text}</Text>
                    <TextInput
                    name={element.tag}
                    key = {key}
                    clearTextOnFocus
                    style={globalStyles.input}
                    placeholder={element.placeholder}
                    keyboardType= 'numeric'
                    onChange={value => {
                        setBusinessValue({
                            ...businessValue,
                            amountACA: {
                                ...businessValue.amountACA,
                                [element.tag] : value
                            }
                        })
                    }}
                    />
                </View>
            )
        })
    }

    const LessCurrentLiabilities = () => {
        return fields.lessCurrentLiabilities.map(element => {
            return (
                <View>
                    <Text style={globalStyles.inputCaption2}>{element.text}</Text>
                    <TextInput
                    clearTextOnFocus
                    style={globalStyles.input}
                    placeholder={element.placeholder}
                    keyboardType= 'numeric'
                    />
                </View>
            )
        })
    }

    const AdjustmentAssets = () => {
        return Adjustments.addCurrentAssets.map(element => {
            return(
                <View>
                    <Text style={globalStyles.inputCaption2}>{element.text}</Text>
                    <TextInput
                    clearTextOnFocus
                    style={globalStyles.input}
                    placeholder={element.placeholder}
                    keyboardType= 'numeric'
                    />
                </View>
            )
        })

       
    }

    const AdjustmentsLess = () => {
        return Adjustments.LessCurrentAssets.map(element => {
            return(
                <View>
                    <Text style={globalStyles.inputCaption2}>{element.text}</Text>
                    <TextInput
                    clearTextOnFocus
                    style={globalStyles.input}
                    placeholder={element.placeholder}
                    keyboardType= 'numeric'
                    />
                </View>
            )
        })
    }

    return(
        
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <ScrollView style = {globalStyles.container}>
            <Formik>
            {props => (
                <View style = {globalStyles.container}>
                        <Text style={globalStyles.savingsHead}>Amount For The Year:</Text>

                        <Text style={globalStyles.inputCaption}>(+) Add Current Assets:</Text>
                        {AddCurrentAssets(props)}
                
            
                        <Text style={globalStyles.inputCaption}>(-) Less Currrent Liabilities:</Text>
                        <LessCurrentLiabilities/>
                
                
                        <Text style={globalStyles.savingsHead2}>Adjustments:</Text>
                        <Text style={globalStyles.inputCaption}>(+) Add Current Assets:</Text>
                        <AdjustmentAssets/>
                
        
            
                
                        <Text style={globalStyles.inputCaption}>(+) Less Current Assets:</Text>
                        <AdjustmentsLess/>
                    </View>
            )}
            </Formik>  

            <FlatButton onPress={() => {setAppStore({ ...appStore, business: {small: businessValue }});
                                                     navigation.navigate("Home")} } text='Calculate' />
            <Text style={globalStyles.netAmt}>Net Business Assets: $</Text>
        </ScrollView>
        </TouchableWithoutFeedback>
    )}