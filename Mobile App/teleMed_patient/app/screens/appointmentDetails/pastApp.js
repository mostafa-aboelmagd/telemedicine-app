import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SafeArea from '../../components/safeArea';
import Footer from '../../components/footer';
import CustomScroll from '../../components/scroll';
import CustomTitle from '../../components/title';
import Custombutton from '../../components/button';
import Entypo from '@expo/vector-icons/Entypo';
import { getToken } from '../../components/getToken';
import {NEXT_PUBLIC_SERVER_NAME} from '@env'; 
import Ionicons from '@expo/vector-icons/Ionicons';

export default function PastAppointment({ navigation }) {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const upcoming = () => {
    navigation.pop()
  }

  const history = (appointment_id) => {
    navigation.navigate('app details', 
      {appointment_id: appointment_id
    })
  }

  const rate = () => {
    navigation.navigate('rating')
  }

  const past = async () => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_SERVER_NAME}/patient/appointment/appointmentsHistory`, {
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
      console.log(result)

      setData(result.appointments);
    } catch (error) {
      console.error('Error fetching doctor info:', error);
    } finally {
      setLoading(false);
      console.log("data",data);
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
        {/* <TouchableOpacity onPress={rate}>
          <Text style={styles.button}>Rate appointment</Text>
        </TouchableOpacity> */}
            {!loading ? ( data ? data.map((item, id) =>
            <View key={id}>
                <View style={[styles.card]}>
                <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                    <Text style={styles.state}>{item.appointment_settings_type} / {item.appointment_type}</Text>
                    <View style={{justifyContent:'flex-end', alignItems: 'flex-start'}}>
                        <Text>{item.doctor_availability_day_hour.slice(0,10)}</Text>
                        <Text>{item.doctor_availability_day_hour.slice(11,19)}</Text>
                    </View>
                </View>

                <Text key={id} style={styles.name}>{item.patient_first_name} {item.patient_last_name}</Text>

                <Text>Duration: {item.appointment_duration} mins</Text>
                <Text>{item.appointment_complaint}</Text>
            </View>
            
            <Custombutton textStyle={{fontSize: 15}} buttonStyle={{width: '35%'}}
            onPress={() => history(item.appointment_id)}>
              View results
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
  button: {
    margin: 10,
    padding: 5,
    borderRadius: 15,
    borderWidth: 2,
    fontSize: 15,
    width: 150,
    textAlign: 'center',
    color: '#1565c0',
    borderColor: '#1565c0'
  },
  
})
