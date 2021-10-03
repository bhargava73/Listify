import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator >
        <RootStack.Screen options={{headerShown: false}} name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen options={{headerShown: false}} name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen options={{headerShown: false}} name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen options={{headerShown: false}} name="HomeScreen" component={HomeScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;