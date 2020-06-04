import React, { useState } from 'react';
import { ScrollView ,View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { Formik } from 'formik';
import FlatButton from '../shared/buttons';

import { globalStyles } from '../styles/global';

export default function MedLargeScreen ({navigation}) {

    const amount = {
        addCurrentAssets: [{
            text: 'Bank balance: ',
            placeholder: 'Bank balance',
            key: 14
        },
        {
            text: 'Cash balance: ',
            placeholder: 'Cash balance',
            key: 15
        },
        {
            text: 'Fixed deposit: ',
            placeholder: 'Fixed deposit',
            key: 16
        },
        {
            text: 'Prepaid expenses: ',
            placeholder: 'Prepaid expenses',
            key: 17
        },
        {
            text: 'Closing stock: ',
            placeholder: 'Closing stock',
            key: 18
        },
        {
            text: 'Trade debtors: ',
            placeholder: 'Trade debtors',
            key: 19
        },
        {
            text: 'Loan receivable: ',
            placeholder: 'Loan receivable',
            key: 20
        },
        {
            text: 'Staff welfare fund: ',
            placeholder: 'Staff welfare fund',
            key: 21
        },
        {
            text: 'Staff loan: ',
            placeholder: 'Staff loan',
            key: 22
        },
        {
            text: 'Other deposits: ',
            placeholder: 'Other deposits',
            key: 23
        },
        {
            text: 'Others: ',
            placeholder: 'Others',
            key: 24
        }],
    }

    const AddCurrentAssets = () => {
        return amount.addCurrentAssets.map(element => {
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

    return(
        <View></View>
    // <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
    //     <ScrollView style = {globalStyles.container}>
    //         <Formik>
    //         {props => (
    //             <View style = {globalStyles.container}>
    //                     <Text style={globalStyles.savingsHead}>Amount For The Year:</Text>
    //                     <Text style={globalStyles.inputCaption}>(+) Add Current Assets:</Text>
    //                     <AddCurrentAssets/>
                        
    //                     <Text style={globalStyles.inputCaption}>(-) Less Currrent Liabilities:</Text>
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder='Trade Debtors'
    //                     keyboardType= 'numeric'
    //                     />
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder='Financial Loans'
    //                     keyboardType= 'numeric'
    //                     />
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder='Accured Operating Expenses'
    //                     keyboardType= 'numeric'
    //                     />
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder='Current Provision of Income Tax'
    //                     keyboardType= 'numeric'
    //                     />
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder="Director's Fees Payable"
    //                     keyboardType= 'numeric'
    //                     />
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder='Others'
    //                     keyboardType= 'numeric'
    //                     />

    //                     {/* ADJUSTMENTS */}
    //                     <Text style={globalStyles.savingsHead}>Adjustments:</Text>
    //                     <Text style={globalStyles.inputCaption}>(+) Add Current Assets:</Text>
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder='Donation in last quarter'
    //                     keyboardType= 'numeric'
    //                     />
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder='Fixed assets purchased in last quarter'
    //                     keyboardType= 'numeric'
    //                     />
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder='Others'
    //                     keyboardType= 'numeric'
    //                     />
    //                     <Text style={globalStyles.inputCaption}>(+) Add Current Liabilities:</Text>
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder='Overdraft'
    //                     keyboardType= 'numeric'
    //                     />
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder="Director's Fee Payable"
    //                     keyboardType= 'numeric'
    //                     />
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder='Financial Loans'
    //                     keyboardType= 'numeric'
    //                     />
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder='Inter-Company Payables'
    //                     keyboardType= 'numeric'
    //                     />
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder='Others'
    //                     keyboardType= 'numeric'
    //                     />
                        
    //                     <Text style={globalStyles.inputCaption}>(+) Less Current Assets:</Text>
                        
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder='Bank Interest Recieved'
    //                     keyboardType= 'numeric'
    //                     />
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder='Late Payment Interest'
    //                     keyboardType= 'numeric'
    //                     />
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder='Deposit for utilities and telephone'
    //                     keyboardType= 'numeric'
    //                     />
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder='Bad debts'
    //                     keyboardType= 'numeric'
    //                     />
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder='Obsolete stock'
    //                     keyboardType= 'numeric'
    //                     />
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder='Staff welfare fund'
    //                     keyboardType= 'numeric'
    //                     />
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder='Staff loan'
    //                     keyboardType= 'numeric'
    //                     />
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder='Loan receivable'
    //                     keyboardType= 'numeric'
    //                     />
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder='Other deposits'
    //                     keyboardType= 'numeric'
    //                     />
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder='Inter-Company receivables'
    //                     keyboardType= 'numeric'
    //                     />
    //                     <TextInput
    //                     style={globalStyles.input}
    //                     placeholder='Others'
    //                     keyboardType= 'numeric'
    //                     />
    //                     <FlatButton text='Calculate' />
    //                     <Text style={globalStyles.netAmt}>Net Business Assets: $</Text>
    //             </View>
    //             )}
    //         </Formik>
    //     </ScrollView>
    //     </TouchableWithoutFeedback>
    )}