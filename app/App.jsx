// File: App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import UserCampListScreen from './Screens/UserCampListScreen';
import CampDetailsScreen from './Screens/CampDetailsScreen';
import RegisterScreen from './Screens/RegisterScreen';
import SuccessScreen from './Screens/SuccessScreen';
import Toast from 'react-native-toast-message';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserCampListScreen">
        <Stack.Screen name="UserCampListScreen" component={UserCampListScreen} />
        <Stack.Screen name="CampDetailsScreen" component={CampDetailsScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
        <Toast />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
