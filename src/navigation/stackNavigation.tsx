import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyTabs from './tabNavigation';
import LoginScreen from '../screens/loginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootParamList } from './types';

const Stack = createNativeStackNavigator<RootParamList>();

export default function StackNavigator() {
   const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('auth_token');
      setInitialRoute(token ? 'Main' : 'Login');
    };

    checkLoginStatus();
  }, []);

  if (initialRoute === null) {
    return null;
  }

  return (
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Main" component={MyTabs} />
      </Stack.Navigator>
  );
}
