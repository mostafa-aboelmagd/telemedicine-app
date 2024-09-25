import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import SafeArea from '../components/safeArea';
import CustomTitle from '../components/title';
import { appointments } from '../test/data';
import Entypo from '@expo/vector-icons/Entypo';

export default function History ({ navigation }) {

  const apps = Object.entries(appointments)
  const details = () => {
    navigation.navigate('app details')
  }

return (
    <SafeArea>
      <View style={styles.container}>
        <CustomTitle titleStyle={{color: 'black'}}>
          Patient name
        </CustomTitle>

        <CustomTitle titleStyle={{fontSize: 20}}>
          Upcoming appointments
        </CustomTitle>

        <ScrollView>
          <View style={[styles.card]}>
            <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
              <Text style={styles.state}>on-site / first time</Text>
              <Text>24/09/2024</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
              <Text style={styles.name}>Dr. Wael / Cardiologist</Text>
            </View>
            <Text>Stating complaints: I've been experiencing severe chest pain for the past two days.</Text>
          </View>
        <CustomTitle titleStyle={{fontSize: 20, marginTop: 20}}>
          Appointments History
        </CustomTitle>
          {apps.map(([id, {state, dr, date, complain}]) =>
            <View style={[styles.card]}>
              <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                <Text style={styles.state}>{state}</Text>
                <View style={{justifyContent:'flex-end'}}>
                  <TouchableOpacity onPress={details}>
                    <Entypo name="dots-three-horizontal" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                <Text key={id} style={styles.name}>{dr}</Text>
                <Text>{date}</Text>
              </View>
              <Text>{complain}</Text>
            </View>
          )}
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
