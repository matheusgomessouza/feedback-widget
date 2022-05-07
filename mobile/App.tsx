import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import Widget from './src/components/Widget';
import { theme } from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium
  });

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{
          flex: 1,
          backgroundColor: theme.colors.background
        }}>
          <StatusBar 
            style="light" 
            backgroundColor='transparent'
            translucent
          />
          <Widget />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
