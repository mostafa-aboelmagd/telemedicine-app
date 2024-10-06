import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Index from './screens/welcomePage/index';
import SignIn from './screens/welcomePage/signIn';
import Register from './screens/welcomePage/register'
import Register1 from './screens/welcomePage/register1'
import Register2 from './screens/welcomePage/register2'

import VSupport from './screens/welcomePage/visitor_support';
import Pending from './screens/welcomePage/pending';

import HomePage from './screens/navBar/homepage';
import Profile from './screens/navBar/profile';
import Appointment from './screens/navBar/appointment';
import Request from './screens/navBar/request';
import Support from './screens/navBar/support';

import Details from './screens/appointmentDetails/moreDetails';
import History from './screens/appointmentDetails/history';
import App_Detials from './screens/appointmentDetails/app_details';
import Documents from './screens/appointmentDetails/documents';
import PastAppointment from './screens/appointmentDetails/pastApp';

import SubmitResults from './screens/appointmentDetails/submitDetails/submitResults';
import SubmitMedications from './screens/appointmentDetails/submitDetails/submitMedications';
import FurtherDetails from './screens/appointmentDetails/submitDetails/furtherDetails';

import Availability from './screens/profile/availability';
import follow_up from './screens/profile/follow_up';
import ChangePassword from './screens/profile/changePassword';
import EditInfo from './screens/profile/edit_info';

const Stack = createStackNavigator();

export default function StackRouters() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Index">
            {/* welcome page */}
            <Stack.Screen name='index' component={Index} options={{ headerShown : false}} />
            <Stack.Screen name='sign in' component={SignIn} options={{ headerShown : false}} />
            <Stack.Screen name='register' component={Register} options={{ headerShown : false}} />
            <Stack.Screen name='pending' component={Pending} options={{ headerShown : false}} />
            <Stack.Screen name='visitor support' component={VSupport} options={{ headerShown : false}} />
            {/* welcome page */}
            <Stack.Screen name='register1' component={Register1} options={{ headerShown : false}} />
            <Stack.Screen name='register2' component={Register2} options={{ headerShown : false}} />


            {/* navigation bar */}
            <Stack.Screen name='home page' component={HomePage} options={{ headerShown : false}} />
            <Stack.Screen name='appointment' component={Appointment} options={{ headerShown : false}} />
            <Stack.Screen name='profile' component={Profile} options={{ headerShown : false}} />
            <Stack.Screen name='request' component={Request} options={{ headerShown : false}} />
            <Stack.Screen name='support' component={Support} options={{ headerShown : false}} />
            
            {/* Appointment details */}
            <Stack.Screen name='details' component={Details} options={{ headerShown : false}} />
            <Stack.Screen name='history' component={History} options={{ headerShown : false}} />
            <Stack.Screen name='app details' component={App_Detials} options={{ headerShown : false}} />
            <Stack.Screen name='documents' component={Documents} options={{ headerShown : false}} />
            <Stack.Screen name='past appointments' component={PastAppointment} options={{ headerShown : false}} />
            
            {/* Submit results of appointment */}
            <Stack.Screen name='submitResults' component={SubmitResults} options={{ headerShown : false}} />
            <Stack.Screen name='submitMedications' component={SubmitMedications} options={{ headerShown : false}} />
            <Stack.Screen name='furtherDetails' component={FurtherDetails} options={{ headerShown : false}} />
            
            {/* Doctor profile */}
            <Stack.Screen name='availability' component={Availability} options={{ headerShown : false}} />
            <Stack.Screen name='follow_up' component={follow_up} options={{ headerShown : false}} />
            <Stack.Screen name='changePassword' component={ChangePassword} options={{ headerShown : false}} />
            <Stack.Screen name='edit info' component={EditInfo} options={{ headerShown : false}} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}