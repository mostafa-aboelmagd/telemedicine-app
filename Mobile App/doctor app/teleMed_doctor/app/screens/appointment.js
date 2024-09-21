import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SafeArea from '../components/safeArea';
import Footer from '../components/footer';
import CustomScroll from '../components/scroll';
import CustomTitle from '../components/title';
import Custombutton from '../components/button';

export default function Appointment ({ navigation }) {

  const names = ['username1', 'username2', 'username3', 'username4']

return (
    <SafeArea safeStyle={{alignItems: 'center'}}>
      <CustomScroll>
        <View style={styles.container}>
          <CustomTitle titleStyle={{marginTop: '10%'}}>Appointments</CustomTitle>
        </View>
        {names.map((item) =>
        <View>
          <View style={[styles.card]}>
            {/* add history button (...) in a row with the state */}
            {/* add date and time*/}
            <Text style={styles.state}>online / follow up</Text>
            <Text style={styles.name}>{item}</Text>
            <Text>Stating complaints: I've been experiencing severe chest pain for the past two days.</Text>
          </View>
          <Custombutton textStyle={{fontSize: 15}} buttonStyle={{width: '35%'}}>
          Submit results
        </Custombutton>
        </View>)}
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
  name:{
    marginBottom: '3%'
  }
})
