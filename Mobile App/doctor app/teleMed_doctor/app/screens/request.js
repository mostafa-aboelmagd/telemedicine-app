import React from 'react';
import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import SafeArea from '../components/safeArea';
import Footer from '../components/footer';
import CustomTitle from '../components/title';
import Custombutton from '../components/button';
import CustomScroll from '../components/scroll';
import Entypo from '@expo/vector-icons/Entypo';
import { patients } from '../test/data';

export default function Request ({ navigation }) {

  // for testing
  const patientList = Object.entries(patients)

  const details = () => {
    navigation.navigate('details')
  }

  const history = () => {
    navigation.navigate('history')
  }

return (
    <SafeArea>
      <CustomScroll>
      <View style={{alignItems: 'center'}}>      
        <CustomTitle titleStyle={{marginTop: '10%'}}>Requests</CustomTitle>
        {patientList.map(([id, name]) => 
        <View>
          <View style={[styles.card]}>
            <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
              <Text style={styles.state}>online / follow up</Text>
              <View style={{justifyContent:'flex-end'}}>
                <TouchableOpacity onPress={history}>
                  <Entypo name="dots-three-horizontal" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
              <Text key={id} style={styles.name}>{name}</Text>
              <Text>03:00 pm - 23/09</Text>
            </View>
            <Text>Stating complaints: I've been experiencing severe chest pain for the past two days.</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
          <Custombutton 
          buttonStyle={[styles.button, {backgroundColor: 'green'}]}
          textStyle={{fontSize: 15}}>
            Accept
          </Custombutton>
          <Custombutton buttonStyle={[styles.button, {backgroundColor: 'red'}]} textStyle={{fontSize: 15}}>
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
        )}
      
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
  },
  button: {
    width: '25%',
    marginRight: '0%'
  },
  
})
