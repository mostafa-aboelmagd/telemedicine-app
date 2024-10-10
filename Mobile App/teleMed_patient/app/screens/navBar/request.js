import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SafeArea from '../../components/safeArea';
import Footer from '../../components/footer';
import CustomTitle from '../../components/title';
import Custombutton from '../../components/button';
import CustomScroll from '../../components/scroll';
import Entypo from '@expo/vector-icons/Entypo';
import { NEXT_PUBLIC_SERVER_NAME } from '@env'
import { getToken } from '../../components/getToken';


export default function Request ({ navigation }) {
  let state = []
  const [cancel, setCancel] = useState(false)
  const details = () => {
    navigation.navigate('details')
  }
  const history = () => {
    navigation.navigate('history')
  }

  const [resquest, setRequest] = useState('')

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      // Function to fetch data
      const fetchData = async () => {
          try {
            // console.log(NEXT_PUBLIC_SERVER_NAME)
              const response = await fetch(`${NEXT_PUBLIC_SERVER_NAME}/patient/profile/requests`, {
                  method: 'GET',
                  headers: {
                    'Authorization': `Bearer ${await getToken()}`,
                    'Content-Type': 'application/json',
                  }
              });
              // console.log(result);
              if (!response.ok) {
                  throw new Error('Failed to fetch data');
              }
              const result = await response.json();
              setData(result.appointments); // Save the fetched data to state
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
        <View style={{padding: '5%'}}>      
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
              <View>
              <Text style={styles.name}>Dr. {item.doctor_first_name} {item.doctor_last_name}</Text>
              <Text style={styles.name}>Duration: {item.appointment_duration}</Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text>{item.doctor_availability_day_hour.slice(0,10)}</Text>
                <Text>{item.doctor_availability_day_hour.slice(11,19)}</Text>
              </View>
            </View>

            <Text style={styles.name}>Complaint: {item.appointment_complaint}</Text>
          </View>

          {/* <Custombutton
                      buttonStyle={[styles.button, { backgroundColor: 'green' }]}
                      textStyle={{ fontSize: 15 }}
                      onPress={() => response(item.appointment_id, 'accept')}>
              Accept
            </Custombutton> */}
            <Custombutton
              buttonStyle={[styles.button, { backgroundColor: 'red' }]}
              textStyle={{ fontSize: 15 }}
              onPress>
              Cancel appointment
            </Custombutton>
            {/* <Custombutton
            buttonStyle={[styles.button, {width: '35%'}]}
            textStyle={{fontSize: 15}}
            onPress={details}>
              Ask for details
            </Custombutton> */}
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
    width: '50%'
  },
  
})
