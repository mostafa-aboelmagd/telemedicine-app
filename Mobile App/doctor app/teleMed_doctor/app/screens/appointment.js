import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SafeArea from '../components/safeArea';
import Footer from '../components/footer';
import CustomScroll from '../components/scroll';
import CustomTitle from '../components/title';
import Custombutton from '../components/button';
import Entypo from '@expo/vector-icons/Entypo';
import { patients } from '../test/data';

export default function Appointment({ navigation }) {

  const patientList = Object.entries(patients);

  const history = () => {
    navigation.navigate('history')
  }
  const submitResults = (patientName) => {
    navigation.navigate('submitResults', { patientName })
  }
  return (
    <SafeArea safeStyle={{ alignItems: 'center' }}>
      <CustomScroll>
        <View style={styles.container}>
          <CustomTitle titleStyle={{ marginTop: '10%' }}>Appointments</CustomTitle>
        </View>
        {patientList.map(([id, name]) =>
          <View>
            <View style={[styles.card]}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Text style={styles.state}>online / follow up</Text>
                <View style={{ justifyContent: 'flex-end' }}>
                  <TouchableOpacity onPress={history}>
                    <Entypo name="dots-three-horizontal" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Text key={id} style={styles.name}>{name}</Text>
                <Text>03:00 pm</Text>
              </View>
              <Text>Stating complaints: I've been experiencing severe chest pain for the past two days.</Text>
            </View>
            <Custombutton textStyle={{ fontSize: 15 }} buttonStyle={{ width: '35%' }} onPress={() => submitResults(name)}>
              Submit results
            </Custombutton>
          </View>)}
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
  name: {
    marginBottom: '3%'
  }
})
