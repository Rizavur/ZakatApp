import React, { useState } from 'react';
import {Text, View} from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { globalStyles } from './styles/global';
import Stack from './routes/homeStack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/home';

const getFonts = () => Font.loadAsync({
  'yellowtail': require('./assets/fonts/Yellowtail-Regular.ttf'),
  'oswaldLight': require('./assets/fonts/Oswald-Light.ttf'),
  'oswaldBold': require('./assets/fonts/Oswald-Regular.ttf'),
  'roboto': require('./assets/fonts/RobotoCondensed-Regular.ttf'),
});

export let setVisibleCallback = () => {};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <Stack/>
      // <NavigationContainer>
      //   <HomeStack/>
      // </NavigationContainer>
    );
  } else {
    return (
      <AppLoading 
        startAsync={getFonts} 
        onFinish={() => setFontsLoaded(true)} 
      />
    )
  }

}
