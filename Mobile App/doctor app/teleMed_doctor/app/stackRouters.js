import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './screens/index';
import SignIn from './screens/signIn';
import AuthContainer from './screens/profile';

const Stack = createStackNavigator();

export default function StackRouters() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="index">
            <Stack.Screen name='index' component={Index} options={{ headerShown : false}} />
            <Stack.Screen name='sign in' component={SignIn} options={{ headerShown : false}} />
            <Stack.Screen name='AuthContainer' component={AuthContainer} options={{ headerShown : false}} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}