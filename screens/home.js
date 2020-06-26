import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, FlatList, TouchableHighlight, AsyncStorage, AppState, Alert, StatusBar } from 'react-native';
import {globalStyles, paperStyles}  from '../styles/global';
import { getNumeric } from '../utils/numberUtil';
import HomeButton from '../shared/homeButton';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import FlatButton from '../shared/buttons';


export default function Home ({navigation}) {

    const [appStore, setAppStore] = useState({
        savings: {
            accounts: [
                {key: 1,
                lowestAmt: '',
                interest: ''
                },
                ]
        },
        shares: {
            accounts: [
            {
            key: 1,
            perUnit: '',
            noUnit: '',
            },
            ]
        },
        business: {
            ownership:{
                small: 100,
                medLarge: 100
            },
            small: {
                amountACA: {
                    cash: '',
                    bank: '',
                    stock: '',
                    debtors: '',
                    amountACAothers: '',
                },
                amountLCL: {
                    creditors: '',
                    operatingExpenses: '',
                    amountLCLothers: '',
                },
                adjustmentsACA: {
                    donation: '',
                    personal: '',
                    adjustmentsACAothers: '',
                },
                adjustmentsLCA: {
                    adjustmentStock: '',
                    adjustmentsLCAothers: '',
                }},
            medLarge: {
                amountACA: {
                    bankBalance: '',
                    cashInHand: '',
                    fixedDeposit: '',
                    prepaidExpenses: '',
                    closingStock: '',
                    tradeDebtors: '',
                    loanReceivable: '',
                    staffWelfareFund: '',
                    staffLoan: '',
                    otherDeposits: '',
                    amountACAothers: '',
                },
                amountLCL: {
                    tradeDebtors: '',
                    financialLoans: '',
                    accruedOperatingExpenses: '',
                    currentProvisionOfIncomeTax: '',
                    overdraft: '',
                    directorsFeesPayable: '',
                    amountLCLothers: '',
                },
                adjustmentsACA: {
                    donationInTheLastQuarter: '',
                    fixedAssetPurchasedInLastQuarter: '',
                    adjustmentsACAothers: '',
                },
                adjustmentsACL: {
                    overdraft: '',
                    directorsFeePayable: '',
                    financialLoans: '',
                    interCompanyPayables: '',
                    adjustmentsACLothers: '',
                },
                adjustmentsLCA: {
                    bankInterestReceived: '',
                    latePaymentInterest: '',
                    depositForUtilitiesAndTelephone: '',
                    badDebts: '',
                    obsoleteStocks: '',
                    staffWelfareFunds: '',
                    staffLoan: '',
                    loanReceivable: '',
                    otherDeposits: '',
                    interCompanyReceivable: '',
                    adjustmentsLCAothers: '',
                }
            }
        },
        gold: {
            weight: '',
            value: ''
        },
        silver: {
            weight: '',
            value: ''
        },
        insurance: {
            surrender: '',
        },
        others: {
            add: '',
            minus: ''
        },
        results: {
            savings: {
                net: 0, 
                zakat: 0
            },
            shares: {
                net: 0,
                zakat: 0
            },
            businessSmall: {
                net: 0,
                zakat: 0
            },
            businessMedLar: {
                net: 0,
                zakat: 0
            },
            gold: {
                net: 0,
                zakat: 0
            },
            silver: {
                net: 0,
                zakat: 0
            },
            insurance: {
                net: 0,
                zakat: 0
            },
            others: {
                net: 0,
                zakat: 0
            },
            otherAssets: {
                net: 0,
                zakat: 0
            }
        },
    });

    const save = async () => {
        try{
            await AsyncStorage.setItem('Master', JSON.stringify(appStore));
            Alert.alert("Success", 'Values have been stored in memory.');
        } catch (err) {
            alert(err);
        }
    }

    const clearAll = () => {
        AsyncStorage.getAllKeys()
            .then(() => Alert.alert(
                "Clear All",
                "Reset all values?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  {text: "Yes", onPress:  () => {{keys => AsyncStorage.multiRemove(keys)};
                  setAppStore({savings: {
                    accounts: [
                        {key: 1,
                        lowestAmt: '',
                        interest: ''
                        },
                        ]
                },
                shares: {
                    accounts: [
                    {
                    key: 1,
                    perUnit: '',
                    noUnit: '',
                    },
                    ]
                },
                business: {
                    ownership:{
                        small: 100,
                        medLarge: 100
                    },
                    small: {
                        amountACA: {
                            cash: '',
                            bank: '',
                            stock: '',
                            debtors: '',
                            amountACAothers: '',
                        },
                        amountLCL: {
                            creditors: '',
                            operatingExpenses: '',
                            amountLCLothers: '',
                        },
                        adjustmentsACA: {
                            donation: '',
                            personal: '',
                            adjustmentsACAothers: '',
                        },
                        adjustmentsLCA: {
                            adjustmentStock: '',
                            adjustmentsLCAothers: '',
                        }},
                    medLarge: {
                        amountACA: {
                            bankBalance: '',
                            cashInHand: '',
                            fixedDeposit: '',
                            prepaidExpenses: '',
                            closingStock: '',
                            tradeDebtors: '',
                            loanReceivable: '',
                            staffWelfareFund: '',
                            staffLoan: '',
                            otherDeposits: '',
                            amountACAothers: '',
                        },
                        amountLCL: {
                            tradeDebtors: '',
                            financialLoans: '',
                            accruedOperatingExpenses: '',
                            currentProvisionOfIncomeTax: '',
                            overdraft: '',
                            directorsFeesPayable: '',
                            amountLCLothers: '',
                        },
                        adjustmentsACA: {
                            donationInTheLastQuarter: '',
                            fixedAssetPurchasedInLastQuarter: '',
                            adjustmentsACAothers: '',
                        },
                        adjustmentsACL: {
                            overdraft: '',
                            directorsFeePayable: '',
                            financialLoans: '',
                            interCompanyPayables: '',
                            adjustmentsACLothers: '',
                        },
                        adjustmentsLCA: {
                            bankInterestReceived: '',
                            latePaymentInterest: '',
                            depositForUtilitiesAndTelephone: '',
                            badDebts: '',
                            obsoleteStocks: '',
                            staffWelfareFunds: '',
                            staffLoan: '',
                            loanReceivable: '',
                            otherDeposits: '',
                            interCompanyReceivable: '',
                            adjustmentsLCAothers: '',
                        }
                    }
                },
                gold: {
                    weight: '',
                    value: ''
                },
                silver: {
                    weight: '',
                    value: ''
                },
                insurance: {
                    surrender: '',
                },
                others: {
                    add: '',
                    minus: ''
                },
                results: {
                    savings: {
                        net: 0, 
                        zakat: 0
                    },
                    shares: {
                        net: 0,
                        zakat: 0
                    },
                    businessSmall: {
                        net: 0,
                        zakat: 0
                    },
                    businessMedLar: {
                        net: 0,
                        zakat: 0
                    },
                    gold: {
                        net: 0,
                        zakat: 0
                    },
                    silver: {
                        net: 0,
                        zakat: 0
                    },
                    insurance: {
                        net: 0,
                        zakat: 0
                    },
                    others: {
                        net: 0,
                        zakat: 0
                    },
                    otherAssets: {
                        net: 0,
                        zakat: 0
                    }
                }})
                }}
                ],
                { cancelable: false }
              ));
    }

    const load = async () => {
        try{
            let Master = await AsyncStorage.getItem('Master');

            if (Master !== null) {
                setAppStore(JSON.parse(Master));
            }
        } catch(err) {
            alert(err);
        }
    }

    useEffect(() => {
        load();
    }, []);

    const results = appStore.results;

    const Zakat = (parseFloat(results.savings.zakat) +
                parseFloat(results.shares.zakat) +
                parseFloat(results.businessSmall.zakat) +
                parseFloat(results.businessMedLar.zakat) +
                parseFloat(results.gold.zakat) +
                parseFloat(results.silver.zakat) +
                parseFloat(results.insurance.zakat) +
                parseFloat(results.others.zakat)).toFixed(2);    

    const [visibleCallback, setVisibleCallback] = useState(() => {});

    const pressHandler = ({ text }) => {
        navigation.navigate(text, { appStore, setAppStore, visibleCallback, setVisibleCallback });
    }



    return(
        <PaperProvider theme = {paperStyles}>
        <ScrollView style={globalStyles.homeBG}>
            <StatusBar barStyle="dark-content"/>

            <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between'}}>

                <TouchableOpacity onPress ={clearAll}>
                    <Text style={{color: 'green', borderRadius: 8, padding: 10, margin: 15, marginBottom: 5, fontSize: 18}}>Clear All</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress ={save}>
                    <Text style={{color: 'green', borderRadius: 8, padding: 10, margin: 15, marginBottom: 5, fontSize: 18}}>Save</Text>
                </TouchableOpacity>

            </View>

            <Text style={globalStyles.ZakatText}>Zakat: $ {Zakat}</Text>

            {/* <FlatButton onPress = {save} text ='SAVE'></FlatButton> */}

            {/* <Card style={globalStyles.button} onPress={() => pressHandler({text: 'Test'})}>
                <Card.Title title="Test"/> 
                <Card.Content style={globalStyles.homeContainer}>
                    <Paragraph>Total: $</Paragraph>
                    <Paragraph style={globalStyles.homeRightZakat}>Zakat: $</Paragraph>
                </Card.Content>
                <Button icon={'chevron-right'} style={{position:'absolute', right: -10, marginTop: 30}}></Button>
            </Card> */}

            <Card style={globalStyles.button} onPress={() => pressHandler({text: 'Savings'})}>
                <Card.Title title="Savings"/> 
                <Card.Content style={globalStyles.homeContainer}>
                    <Paragraph>Total: ${appStore.results.savings.net}</Paragraph>
                    <Paragraph style={globalStyles.homeRightZakat}>Zakat: ${appStore.results.savings.zakat}</Paragraph>
                </Card.Content>
                <Button icon={'chevron-right'} style={{position:'absolute', right: -10, marginTop: 30}}></Button>
            </Card>

            <Card style={globalStyles.button} onPress={() => pressHandler({text: 'Shares'})}>
                <Card.Title title="Shares"/> 
                <Card.Content>
                    <Paragraph>Total: ${appStore.results.shares.net}</Paragraph>
                    <Paragraph style={globalStyles.homeRightZakat}>Zakat: ${appStore.results.shares.zakat}</Paragraph>
                </Card.Content>
                <Button icon={'chevron-right'} style={{position:'absolute', right: -10, marginTop: 30}}></Button>
            </Card>

            <Card style={globalStyles.button} onPress={() => pressHandler({text: 'Business'})}>
                <Card.Title title="Business"/> 
                <Card.Content>
                    <Paragraph>Total: ${getNumeric(appStore.results.businessSmall.net) + getNumeric(appStore.results.businessMedLar.net)}</Paragraph>
                    <Paragraph style={globalStyles.homeRightZakat}>Zakat: ${getNumeric(appStore.results.businessSmall.zakat) + getNumeric(appStore.results.businessMedLar.zakat)}</Paragraph>
                </Card.Content>
                <Button icon={'chevron-right'} style={{position:'absolute', right: -10, marginTop: 30}}></Button>
            </Card>

            <Card style={globalStyles.button} onPress={() => pressHandler({text: 'OtherAssets'})}>
                <Card.Title title="Other Assets"/> 
                <Card.Content>
                    <Paragraph>Total: ${appStore.results.otherAssets.net}</Paragraph>
                    <Paragraph style={globalStyles.homeRightZakat}>Zakat: ${appStore.results.otherAssets.zakat}</Paragraph>
                </Card.Content>
                <Button icon={'chevron-right'} style={{position:'absolute', right: -10, marginTop: 30}}></Button>
            </Card>
            
            {/* <Card style={globalStyles.button} onPress={() => pressHandler({text: 'Insurance'})}>
                <Card.Title title="Insurance"/> 
                <Card.Content>
                    <Paragraph>Total: ${appStore.results.insurance.net}</Paragraph>
                    <Paragraph style={globalStyles.homeRightZakat}>Zakat: ${appStore.results.insurance.zakat}</Paragraph>
                </Card.Content>
                <Button icon={'chevron-right'} style={{position:'absolute', right: -10, marginTop: 30}}></Button>
            </Card> */}
            {/* <Text style={globalStyles.ZakatText}>Nisab Value: $ get from API</Text> */}

        </ScrollView>
        </PaperProvider>
    )
    }