import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './screens/index';
import SignIn from './screens/signIn';
import HomePage from './screens/homepage';
import Register from './screens/register'
import Appointment from './screens/appointment';
import Profile from './screens/profile';
import Request from './screens/request';
import Support from './screens/support';
import VSupport from './screens/visitor_support';

const Stack = createStackNavigator();

export default function StackRouters() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="request">
            <Stack.Screen name='index' component={Index} options={{ headerShown : false}} />
            <Stack.Screen name='sign in' component={SignIn} options={{ headerShown : false}} />
            <Stack.Screen name='register' component={Register} options={{ headerShown : false}} />
            <Stack.Screen name='visitor support' component={VSupport} options={{ headerShown : false}} />
            <Stack.Screen name='home page' component={HomePage} options={{ headerShown : false}} />
            <Stack.Screen name='appointment' component={Appointment} options={{ headerShown : false}} />
            <Stack.Screen name='profile' component={Profile} options={{ headerShown : false}} />
            <Stack.Screen name='request' component={Request} options={{ headerShown : false}} />
            <Stack.Screen name='support' component={Support} options={{ headerShown : false}} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}