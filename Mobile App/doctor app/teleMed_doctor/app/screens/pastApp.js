import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SafeArea from '../components/safeArea';
import Footer from '../components/footer';
import CustomScroll from '../components/scroll';
import CustomTitle from '../components/title';
import Custombutton from '../components/button';
import Entypo from '@expo/vector-icons/Entypo';
import { getToken } from '../components/getToken';
import {NEXT_PUBLIC_SERVER_NAME} from '@env'; 
import Ionicons from '@expo/vector-icons/Ionicons';

export default function PastAppointment({ navigation }) {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const upcoming = () => {
    navigation.pop()
  }

  const history = (id, fname, lname) => {
    navigation.navigate('history', 
      {id: id,
      fname: fname,
      lname: lname
    })
  }

  const submitResults = (patientName) => {
    navigation.navigate('submitResults', { patientName })
  }

  const past = async () => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_SERVER_NAME}/doctor/appointmentHistory`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getToken()}`,

        },
      });
      // console.log(response);

      if (!response.ok) {
        console.log(response);
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      // console.log(result)

      setData(result.appointments);
    } catch (error) {
      console.error('Error fetching doctor info:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    past();
  }, []);


  return (
    <SafeArea>
      <CustomScroll>
      <View style={{margin: 10}}>   
        <View style={{marginTop: '5%', justifyContent:'space-between'}}>   
            <TouchableOpacity onPress={upcoming}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <CustomTitle>Past appointments</CustomTitle>
        </View>
          {!loading ? ( data ? data.map((item, id) =>
          <View key={id}>
            <View style={[styles.card]}>
              <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                <Text style={styles.state}>{item.appointment_settings_type} / {item.appointment_type}</Text>
                <View style={{justifyContent:'flex-end'}}>
                  <TouchableOpacity onPress={() => history(item.appointment_patient_id, item.patient_first_name, item.patient_last_name)}>
                    <Entypo name="dots-three-horizontal" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                <Text key={id} style={styles.name}>{item.patient_first_name} {item.patient_last_name}</Text>
                <View style={{alignItems:'flex-end'}}>
                  <Text>{item.doctor_availability_day_hour.slice(0,10)}</Text>
                  <Text>{item.doctor_availability_day_hour.slice(11,19)}</Text>
                </View>
              </View>

              <Text>Duration: {item.appointment_duration} mins</Text>
              <Text>{item.appointment_complaint}</Text>
            </View>
            
            <Custombutton textStyle={{fontSize: 15}} buttonStyle={{width: '35%'}}>
              Submit results
            </Custombutton>
          </View> ) 
          : (<Text>No past appointments</Text>) ) 
          : <Text>Loading</Text>}
        </View>

      </CustomScroll>
      <Footer navigation={navigation} />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    marginTop: '3%',
    width: '100%',
    height: 130,
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
})
