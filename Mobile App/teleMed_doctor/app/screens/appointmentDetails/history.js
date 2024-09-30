import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import SafeArea from '../../components/safeArea';
import CustomTitle from '../../components/title';
import Entypo from '@expo/vector-icons/Entypo';
import { getToken } from '../../components/getToken';
import {NEXT_PUBLIC_SERVER_NAME} from '@env'; 

export default function History ({ navigation, route }) {

  const {id, fname, lname} = route.params;
  console.log(id)

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  const details = (appId) => {
    navigation.navigate('app details', {appId})
    console.log('app details',appId)
  }


  const patientData = async () => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_SERVER_NAME}/doctor/PatientSummary/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getToken()}`,

        },
      });
      // console.log(response);

      if (!response.ok) {
        // console.log(response);
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
    patientData();
  }, []);


return (
    <SafeArea>
      <View style={styles.container}>
        <CustomTitle titleStyle={{color: 'black'}}>
          {fname} {lname}
        </CustomTitle>

        <ScrollView>
        <CustomTitle titleStyle={{fontSize: 20, marginTop: 20}}>
          Appointments History
        </CustomTitle>
          {!loading ? (data ? data.map((item, id) =>
            <View key={id} style={[styles.card]}>
              <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                <Text style={styles.state}>{item.appointment_settings_type} / {item.appointment_type}</Text>
                <View style={{justifyContent:'flex-end'}}>
                  <TouchableOpacity onPress={() => details(item.appointment_id)}>
                    <Entypo name="dots-three-horizontal" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                <Text key={id} style={styles.name}>{item.doctor_first_name} {item.doctor_last_name}</Text>
                <View style={{alignItems: 'flex-end'}}>
                  <Text>{item.doctor_availability_day_hour.slice(0,10)}</Text>
                  <Text>{item.doctor_availability_day_hour.slice(11,19)}</Text>
                </View>
              </View>
              <Text>{item.appointment_complaint}</Text>
            </View>
          ): <Text>No previous appointments</Text> ): <Text>Loading</Text>}
        </ScrollView>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '5%',
    paddingTop: '10%',
    flex: 1,
    backgroundColor: '#f0f0f0', 
  },
  card: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    marginTop: '3%',
    width: '100%',
    height: 120,
    padding: 5,
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
})
