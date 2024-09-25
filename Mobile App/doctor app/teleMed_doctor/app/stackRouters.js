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
import Pending from './screens/pending';
import Details from './screens/moreDetails';
import History from './screens/history';
import Availability from './screens/availability';
import App_Detials from './screens/app_details';
import Documents from './screens/documents';
import Authorization from './screens/authintication';
import SubmitResults from './screens/submitResults';
import SubmitMedications from './screens/submitMedications';
import furtherDetails from './screens/furtherDetails';
import FurtherDetails from './screens/furtherDetails';

const Stack = createStackNavigator();

export default function StackRouters() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="sign in">
            <Stack.Screen name='index' component={Index} options={{ headerShown : false}} />
            <Stack.Screen name='sign in' component={SignIn} options={{ headerShown : false}} />
            <Stack.Screen name='authintication' component={Authorization} options={{ headerShown : false}} />
            <Stack.Screen name='register' component={Register} options={{ headerShown : false}} />
            <Stack.Screen name='pending' component={Pending} options={{ headerShown : false}} />
            <Stack.Screen name='visitor support' component={VSupport} options={{ headerShown : false}} />
            <Stack.Screen name='home page' component={HomePage} options={{ headerShown : false}} />
            <Stack.Screen name='appointment' component={Appointment} options={{ headerShown : false}} />
            <Stack.Screen name='profile' component={Profile} options={{ headerShown : false}} />
            <Stack.Screen name='request' component={Request} options={{ headerShown : false}} />
            <Stack.Screen name='support' component={Support} options={{ headerShown : false}} />
            <Stack.Screen name='details' component={Details} options={{ headerShown : false}} />
            <Stack.Screen name='history' component={History} options={{ headerShown : false}} />
            <Stack.Screen name='availability' component={Availability} options={{ headerShown : false}} />
            <Stack.Screen name='app details' component={App_Detials} options={{ headerShown : false}} />
            <Stack.Screen name='documents' component={Documents} options={{ headerShown : false}} />
            <Stack.Screen name='submitResults' component={SubmitResults} options={{ headerShown : false}} />
            <Stack.Screen name='submitMedications' component={SubmitMedications} options={{ headerShown : false}} />
            <Stack.Screen name='furtherDetails' component={FurtherDetails} options={{ headerShown : false}} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}