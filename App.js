import React, { useState } from 'react';
import {Text, View} from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { globalStyles } from './styles/global';
import Navigator from './routes/homeStack';

const getFonts = () => Font.loadAsync({
  'yellowtail': require('./assets/fonts/Yellowtail-Regular.ttf'),
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <Navigator/>
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
