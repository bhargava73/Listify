import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { UserContext, UserProvider } from './app/UserContext';
import RootStackScreen from './app/screens/RootStackScreen';
import HomeScreen from './app/screens/HomeScreen';
export default function App() {
  return <UserProvider>
    <NavigationContainer>
      <RootStackScreen/>
    </NavigationContainer>
    </UserProvider>
}