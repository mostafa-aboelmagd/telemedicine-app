import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SafeArea from '../components/safeArea';
import Footer from '../components/footer';
import CustomTitle from '../components/title';
import Custombutton from '../components/button';
import CustomScroll from '../components/scroll';
import Entypo from '@expo/vector-icons/Entypo';
import { NEXT_PUBLIC_SERVER_NAME } from '@env'
import { appointments } from '../test/data';

export default function Request ({ navigation }) {

  const apps = Object.entries(appointments)
  let state = []

  const details = () => {
    navigation.navigate('details')
  }

  const history = () => {
    navigation.navigate('history')
  }

  const [resquest, setRequest] = useState('')

  const response = (userToken, appointmentId, action) => {
    state.push([appointmentId, action])
    console.log(state)
    try {
        const response = fetch(`${NEXT_PUBLIC_SERVER_NAME}/doctor/AppointmentResponse/${appointmentId}/${action}/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userToken}`, // Set the token in the Authorization header
                'Content-Type': 'application/json',
            }
        });
        // Modification
        console.log(response.status);
        if (!response.ok) {
          if(response.status !== 200){
            throw new Error('Failed to sent request');}
        }
        //==============================
        const result = response.json();
        setRequest(result); // Save the fetched data to state
        console.log(result)
    } catch (err) {
        console.log(err.message)
    }

  }

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Replace with your actual token
  const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiZG9jdG9yMkB0ZXN0LmNvbSIsInJvbGUiOiJEb2N0b3IiLCJmaXJzdE5hbWUiOiJFdGhhbiIsImxhc3ROYW1lIjoiV2lsc29uIiwiaWF0IjoxNzI3MTEyMjg4LCJleHAiOjE3MjcxOTg2ODh9.gC5VMU-lu73MebWCs0MR1ByaYQLF3SWBqhC409HIcvk'; 

  useEffect(() => {
      // Function to fetch data
      const fetchData = async () => {
          try {
            // console.log(NEXT_PUBLIC_SERVER_NAME)
              const response = await fetch(`${NEXT_PUBLIC_SERVER_NAME}/Doctor/Profile/PendingRequests`, {
                  method: 'GET',
                  headers: {
                      'Authorization': `Bearer ${userToken}`, // Set the token in the Authorization header
                      'Content-Type': 'application/json',
                  }
              });
              
              if (!response.ok) {
                  throw new Error('Failed to fetch data');
              }
              const result = await response.json();
              setData(result); // Save the fetched data to state
              // console.log(result)
          } catch (err) {
              console.log(err)
          } finally {
              setLoading(false); // End the loading state
          }
      };
      fetchData();
  }, []);

return (
    <SafeArea>
      <CustomScroll>
      <View style={{alignItems: 'center'}}>      
        <CustomTitle titleStyle={{marginTop: '10%'}}>Requests</CustomTitle>

        {!loading ? (data ? data.map((item, id) => 
        <View key={id}>
          <View style={[styles.card]}>
            <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
              <Text style={styles.state}>{item.appointment_type}</Text>
              <View style={{justifyContent:'flex-end'}}>
                <TouchableOpacity onPress={history}>
                  <Entypo name="dots-three-horizontal" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
              <Text style={styles.name}>{item.patient_first_name} {item.patient_last_name}</Text>
              <View style={{alignItems: 'flex-end'}}>
                <Text>{item.doctor_availability_day_hour.slice(0,10)}</Text>
                <Text>{item.doctor_availability_day_hour.slice(11,19)}</Text>
              </View>
            </View>

            <Text>{item.appointment_complaint}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Custombutton 
            buttonStyle={[styles.button, {backgroundColor: 'green'}]}
            textStyle={{fontSize: 15}}
            onPress={() => response(userToken, item.appointment_availability_slot, 'accept')}>
              Accept
            </Custombutton>
            <Custombutton 
            buttonStyle={[styles.button, {backgroundColor: 'red'}]}
            textStyle={{fontSize: 15}}
            onPress={() => response(userToken, item.appointment_availability_slot, 'decline')}>
              Decline
            </Custombutton>
            <Custombutton
            buttonStyle={[styles.button, {width: '35%'}]}
            textStyle={{fontSize: 15}}
            onPress={details}>
              Ask for details
            </Custombutton>
          </View>
        </View>
        ) : (<Text>No appointments to show</Text>) ): <Text>Loading</Text>}
      
      </View>
      </CustomScroll>
      <Footer navigation={navigation}/>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    marginTop: '3%',
    // width: '100%',
    height: 120,
    padding: 10,
    backgroundColor: 'white'
  },
  state: {
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 10,
    color: 'white',
    width: 125,
    textAlign: 'center',
    marginBottom: '3%'
  },
  name:{
    marginBottom: '3%'
  },
  button: {
    width: '25%',
    marginRight: '0%'
  },
  
})
