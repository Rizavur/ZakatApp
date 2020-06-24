import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { globalStyles } from '../styles/global';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import SmallScreen from '../BusinessScreens/SmallScreen'
import MedLargeScreen from '../BusinessScreens/MedLargeScreen'
import { createAppContainer } from 'react-navigation';
import { HeaderBackground } from 'react-navigation-stack';
import { IconButton, Colors, List } from 'react-native-paper';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
  } from 'react-native-material-textfield';
import Modal from 'react-native-modal';
import {setVisibleCallback} from '../App';

const Tab = createMaterialTopTabNavigator();

const AppContainer = NavigationContainer;

export default function Business ({navigation}) {
    const [ visible, setVisible ] = useState(false);

    setVisibleCallback['Business'] = setVisible;

    return(
        <AppContainer>
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
                    <Text style={globalStyles.modalHeader}>Zakat On Business</Text>
                    <ScrollView style={{marginTop: 10, paddingRight: 13, paddingLeft: 13}}>
                        <Text style={globalStyles.modalInfoHeader}>Requirements</Text>
                            <View style={{flex: 1,flexDirection: 'row', paddingRight: 14, marginRight: 10}}>
                                <Text style={globalStyles.modalInfoContent}>1)  </Text>
                                <Text style={globalStyles.modalInfoContent}>Only the Muslim’s share of the business is subjected to Zakat.</Text>
                            </View>
                            <View style={{flex: 1,flexDirection: 'row', paddingRight: 14, marginRight: 10}}>
                                <Text style={globalStyles.modalInfoContent}>2)  </Text>
                                <Text style={globalStyles.modalInfoContent}>Non-Halal assets and activities are not subjected to Zakat.</Text>
                            </View>
                            <View style={{flex: 1,flexDirection: 'row', paddingRight: 14, marginRight: 10}}>
                                <Text style={globalStyles.modalInfoContent}>3)  </Text>
                                <Text style={globalStyles.modalInfoContent}>Haul is based on asset value calculated from the initial inception or start of business until the completion of one whole year, according to Hijrah (355 days) or Gregorian (365 days) calendar.</Text>
                            </View>
                            <View style={{flex: 1,flexDirection: 'row', paddingRight: 14, marginRight: 10}}>
                                <Text style={globalStyles.modalInfoContent}>4)  </Text>
                                <Text style={globalStyles.modalInfoContent}>Nisab valuation (basic minimum value) is calculated based on the current value of 86 gram of gold.</Text>
                            </View>
                            <View style={{flex: 1,flexDirection: 'row', paddingRight: 14, marginRight: 10}}>
                                <Text style={globalStyles.modalInfoContent}>5)  </Text>
                                <Text style={globalStyles.modalInfoContent}>Full ownership (al-Milk at-tam): Assets that are fully owned physically (hiyazah) or full management control of the assets (tasaruff).</Text>
                            </View>
                            <View style={{flex: 1,flexDirection: 'row', paddingRight: 14, marginRight: 10}}>
                                <Text style={globalStyles.modalInfoContent}>6)  </Text>
                                <Text style={globalStyles.modalInfoContent}>The assets must have growth potentials. (an-Nama’)</Text>
                            </View>
                            <View style={{flex: 1,flexDirection: 'row', paddingRight: 14, marginRight: 10}}>
                                <Text style={globalStyles.modalInfoContent}>7)  </Text>
                                <Text style={globalStyles.modalInfoContent}>The intention or purpose for business must be made when an asset becomes part of the business that is conducted in order to gain profit. (urud at-tijarah)</Text>
                            </View>
                        <Text style={{...globalStyles.modalInfoHeader, marginTop: 10}}>Computation Methods</Text>
                            <Text style={{...globalStyles.modalInfoContent}}>The computation of Zakat on Business is based on the *Working Capital Model (Syari’yyah) that considers current assets and deducts current liabilities and makes the necessary adjustments at year end. The Accounting and Auditing Organisation for Islamic Financial Instituitions (AAOIFI) FAS 9 sets out accounting rules related to Zakat on Business.</Text>
                        <Text style={{...globalStyles.modalInfoHeader, marginTop: 10}}>Formula</Text>
                            <Text style={{...globalStyles.modalInfoContent}}>Zakat on Business = (Current Assets – Current Liabilities +/- Adjustments) x 2.5% x % of Muslim Ownership Share</Text>
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
            <Tab.Navigator tabBarOptions={{
            activeTintColor: '#ffffff',
            inactiveTintColor: '#7FC0C4',
            style: {
                backgroundColor: Colors.blueA700,
            },
            }}>
                <Tab.Screen name="Small Business" component={SmallScreen} initialParams={ navigation } />
                <Tab.Screen name="Medium/Large Business" component={MedLargeScreen} initialParams={ navigation } />
            </Tab.Navigator>
        </AppContainer>
    )}